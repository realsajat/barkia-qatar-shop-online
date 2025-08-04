import { useState, useEffect, useRef } from 'react';

interface UseLazyImageOptions {
  src: string;
  rootMargin?: string;
  threshold?: number;
}

export const useLazyImage = ({ src, rootMargin = '50px', threshold = 0.1 }: UseLazyImageOptions) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
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
  }, [rootMargin, threshold]);

  useEffect(() => {
    if (isInView && src && !imageSrc) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      img.onerror = () => {
        setIsLoaded(true);
      };
      img.src = src;
    }
  }, [isInView, src, imageSrc]);

  return {
    imgRef,
    imageSrc,
    isLoaded,
    isInView,
  };
};