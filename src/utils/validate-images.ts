/**
 * Script to validate all product images
 */

import { checkImageExists, normalizeImagePath } from '@/lib/image-utils';

// Product data from the application
const allProducts = [
  {
    id: "premium-barkia",
    name: "Premium Barkia",
    imageSrc: "/barkia.webp",
  },
  {
    id: "pvc-barkia",
    name: "PVC Barkia",
    imageSrc: "/pvc-barkia.webp",
  },
  {
    id: "luxury-carpets",
    name: "Luxury Carpets",
    imageSrc: "/carpet.webp",
  },
  {
    id: "grass-carpet",
    name: "Grass Carpet",
    imageSrc: "/grass-carpet.webp",
  },
  {
    id: "roller-blinds",
    name: "Roller Blinds",
    imageSrc: "/roller.webp",
  },
  {
    id: "elegant-curtains",
    name: "Elegant Curtains",
    imageSrc: "/curtain.webp",
  },
  {
    id: "modern-sofas",
    name: "Modern Sofas",
    imageSrc: "/sofa.webp",
  },
  {
    id: "majlis-sets",
    name: "Majlis Sets",
    imageSrc: "/majlis-sofa.webp",
  },
  {
    id: "luxury-interior-design",
    name: "Luxury Interior Design",
    imageSrc: "/interior.webp",
  }
];

/**
 * Validate all product images
 */
export const validateAllImages = async (): Promise<{
  valid: Array<{ id: string; name: string; imageSrc: string }>;
  invalid: Array<{ id: string; name: string; imageSrc: string; error: string }>;
}> => {
  const results = {
    valid: [] as Array<{ id: string; name: string; imageSrc: string }>,
    invalid: [] as Array<{ id: string; name: string; imageSrc: string; error: string }>
  };

  console.log('🔍 Validating product images...');

  for (const product of allProducts) {
    const normalizedPath = normalizeImagePath(product.imageSrc);
    console.log(`Checking: ${product.name} -> ${normalizedPath}`);
    
    try {
      const exists = await checkImageExists(normalizedPath);
      
      if (exists) {
        results.valid.push(product);
        console.log(`✅ ${product.name}: Image loaded successfully`);
      } else {
        results.invalid.push({
          ...product,
          error: 'Image failed to load or does not exist'
        });
        console.log(`❌ ${product.name}: Image failed to load`);
      }
    } catch (error) {
      results.invalid.push({
        ...product,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      console.log(`❌ ${product.name}: Error - ${error}`);
    }
  }

  console.log('\n📊 Validation Summary:');
  console.log(`✅ Valid images: ${results.valid.length}`);
  console.log(`❌ Invalid images: ${results.invalid.length}`);

  if (results.invalid.length > 0) {
    console.log('\n🚨 Issues found:');
    results.invalid.forEach(item => {
      console.log(`- ${item.name} (${item.imageSrc}): ${item.error}`);
    });
  }

  return results;
};

/**
 * Run validation if this file is executed directly
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Only run in browser development environment
  validateAllImages().then(results => {
    if (results.invalid.length === 0) {
      console.log('🎉 All product images are valid!');
    } else {
      console.log('⚠️ Some product images have issues. Check the console for details.');
    }
  });
}