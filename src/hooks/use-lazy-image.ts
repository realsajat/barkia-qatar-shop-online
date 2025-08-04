import { useState, useEffect, useRef, useCallback } from 'react';
import { normalizeImagePath, logImageError } from '@/lib/image-utils';

interface UseLazyImageOptions {
  src: string;
  rootMargin?: string;
  threshold?: number;
  priority?: boolean; // For above-the-fold images
}

export const useLazyImage = ({ src, rootMargin = '50px', threshold = 0.1, priority = false }: UseLazyImageOptions) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Normalize the source path
  const normalizedSrc = normalizeImagePath(src);

  // Preload image function
  const preloadImage = useCallback((imageUrl: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = (error) => {
        logImageError(imageUrl, error instanceof Error ? error : new Error('Image load failed'));
        reject(new Error(`Failed to load image: ${imageUrl}`));
      };
      img.src = imageUrl;
    });
  }, []);

  // Handle image loading
  useEffect(() => {
    if (!normalizedSrc) {
      setHasError(true);
      return;
    }

    // For priority images, load immediately
    if (priority) {
      setIsLoading(true);
      preloadImage(normalizedSrc)
        .then(() => {
          setImageSrc(normalizedSrc);
          setIsLoaded(true);
          setHasError(false);
        })
        .catch(() => {
          setHasError(true);
          setIsLoaded(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
      return;
    }

    // For non-priority images, wait for intersection
    if (isInView && !imageSrc && !isLoading) {
      setIsLoading(true);
      preloadImage(normalizedSrc)
        .then(() => {
          setImageSrc(normalizedSrc);
          setIsLoaded(true);
          setHasError(false);
        })
        .catch(() => {
          setHasError(true);
          setIsLoaded(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [normalizedSrc, priority, isInView, imageSrc, isLoading, preloadImage]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    // Skip intersection observer for priority images
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observerRef.current = observer;
    const currentRef = imgRef.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef && observerRef.current) {
        observerRef.current.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [rootMargin, threshold, priority]);

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
  }, []);

  const handleImageError = useCallback(() => {
    logImageError(normalizedSrc);
    setHasError(true);
    setIsLoaded(true);
  }, [normalizedSrc]);

  return {
    imgRef,
    imageSrc,
    isLoaded,
    isInView,
    hasError,
    isLoading,
    handleImageLoad,
    handleImageError,
  };
};