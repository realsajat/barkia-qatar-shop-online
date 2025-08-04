import { useState, useEffect, useRef } from 'react';

interface UseLazyImageOptions {
  src: string;
  rootMargin?: string;
  threshold?: number;
  priority?: boolean; // For above-the-fold images
}

export const useLazyImage = ({ src, rootMargin = '50px', threshold = 0.1, priority = false }: UseLazyImageOptions) => {
  const [imageSrc, setImageSrc] = useState<string>(priority ? src : '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

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

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [rootMargin, threshold, priority]);

  useEffect(() => {
    if (isInView && src && !imageSrc) {
      // Load image directly without preloading for faster display
      setImageSrc(src);
    }
  }, [isInView, src, imageSrc]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return {
    imgRef,
    imageSrc,
    isLoaded,
    isInView,
    hasError,
    handleImageLoad,
    handleImageError,
  };
};