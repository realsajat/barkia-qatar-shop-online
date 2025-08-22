/**
 * Image utility functions for handling product images
 */

/**
 * Normalize image path to ensure it starts with /
 * @param imagePath - The image path to normalize
 * @returns Normalized image path
 */
export const normalizeImagePath = (imagePath: string): string => {
  if (!imagePath) return '';
  
  // Ensure path starts with /
  if (!imagePath.startsWith('/')) {
    return `/${imagePath}`;
  }
  
  return imagePath;
};

/**
 * Check if an image exists by attempting to load it
 * @param imagePath - The image path to check
 * @returns Promise that resolves to true if image exists, false otherwise
 */
export const checkImageExists = (imagePath: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    
    // Set a timeout to avoid hanging
    const timeout = setTimeout(() => {
      resolve(false);
    }, 5000);
    
    img.onload = () => {
      clearTimeout(timeout);
      resolve(true);
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      resolve(false);
    };
    
    img.src = normalizeImagePath(imagePath);
  });
};

/**
 * Get fallback image path
 * @returns Path to placeholder image
 */
export const getFallbackImage = (): string => {
  return '/placeholder.webp';
};

/**
 * Preload multiple images
 * @param imagePaths - Array of image paths to preload
 * @returns Promise that resolves when all images are loaded or failed
 */
export const preloadImages = (imagePaths: string[]): Promise<void[]> => {
  const promises = imagePaths.map((p) =>
    new Promise<void>((resolve) => {
      const path = normalizeImagePath(p);
      try {
        const img = new Image();
        let settled = false;

        const finish = () => {
          if (settled) return;
          settled = true;
          resolve();
        };

        img.onload = () => {
          // Use decode() for modern browsers to ensure image is ready to paint
          if ((img as any).decode) {
            (img as any).decode().then(finish).catch(finish);
          } else {
            finish();
          }
        };

        img.onerror = () => finish(); // Resolve even on error to not block

        // Safety timeout in case onload/onerror never fire
        setTimeout(finish, 5000);

        img.src = path;
      } catch (e) {
        resolve();
      }
    })
  );

  return Promise.all(promises);
};

/**
 * Debug function to log image loading issues
 * @param imagePath - The image path that failed
 * @param error - The error that occurred
 */
export const logImageError = (imagePath: string, error?: Error): void => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`Image loading failed for: ${imagePath}`, error);
  }
};