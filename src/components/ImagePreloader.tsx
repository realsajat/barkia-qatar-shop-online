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
    // Default critical images to preload
    const criticalImages = [
      '/barkia.png',
      '/carpet.png',
      '/majlis-sofa.png',
      '/sofa.png',
      '/curtain.png',
      '/roller.png',
      '/pvc-barkia.png',
      '/grass-carpet.png',
      '/interior.png',
      ...images
    ];

    // Remove duplicates
    const uniqueImages = [...new Set(criticalImages)];

    // Preload images in the background
    preloadImages(uniqueImages).catch(error => {
      console.warn('Some images failed to preload:', error);
    });
  }, [images]);

  // This component doesn't render anything
  return null;
};

export default ImagePreloader;