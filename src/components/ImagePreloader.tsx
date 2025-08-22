import { useEffect } from 'react';
import { preloadImages } from '@/lib/image-utils';

interface ImagePreloaderProps {
  images?: string[];
}

/**
 * Component to preload critical images
 */
const ImagePreloader = ({ images = [] }: ImagePreloaderProps) => {
  useEffect(() => {
    // Only preload the truly critical (logo / hero) images eagerly.
    // Defer the rest to idle time so we don't block navigation or main thread.
    const eager = ['/lovable-uploads/green-white-logo.webp', '/interior.webp', ...images];
    const uniqueEager = [...new Set(eager)];

    // Start small, non-blocking preload for very small set
    preloadImages(uniqueEager).catch(() => {});

    // Defer background preloads for other images so they don't affect first navigation
    const deferred = [
      '/barkia.webp',
      '/carpet.webp',
      '/majlis-sofa.webp',
      '/sofa.webp',
      '/curtain.webp',
      '/roller.webp',
      '/pvc-barkia.webp',
      '/grass-carpet.webp'
    ].filter(p => !uniqueEager.includes(p));

  let idleId: number | null = null;
    const runDeferred = () => {
      preloadImages(deferred).catch(() => {});
    };

    if ('requestIdleCallback' in window) {
      // @ts-ignore - requestIdleCallback types vary by environment
      idleId = (window as any).requestIdleCallback(runDeferred, { timeout: 3000 });
    } else {
      // Fallback to timeout - cast to number for TypeScript
      idleId = (window as unknown as any).setTimeout(runDeferred, 3000) as number;
    }

    return () => {
      if (idleId) {
        if ('cancelIdleCallback' in window) {
          // @ts-ignore
          (window as any).cancelIdleCallback(idleId);
        } else {
          clearTimeout(idleId as number);
        }
      }
    };
  }, [images]);

  // This component doesn't render anything
  return null;
};

export default ImagePreloader;