
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ExternalLink } from "lucide-react";
import { memo, useCallback } from "react";
import { useLazyImage } from "@/hooks/use-lazy-image";

interface ProductCardProps {
  name: string;
  description: string;
  imageSrc: string;
  whatsappLink: string;
  onClick?: () => void;
}

const ProductCard = memo(function ProductCard({ 
  name, 
  description, 
  imageSrc, 
  whatsappLink, 
  onClick 
}: ProductCardProps) {
  const { imgRef, imageSrc: lazyImageSrc, isLoaded, isInView } = useLazyImage({
    src: imageSrc,
    rootMargin: '100px'
  });

  const handleCardClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  const handleWhatsAppClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 h-full flex flex-col">
      <div 
        className="aspect-square overflow-hidden bg-secondary cursor-pointer relative"
        onClick={handleCardClick}
      >
        {/* Placeholder while loading */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          </div>
        )}
        
        <img 
          ref={imgRef}
          src={lazyImageSrc || ''} 
          alt={name}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover transition-all duration-300 hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ display: lazyImageSrc ? 'block' : 'none' }}
        />
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 
          className="font-playfair text-lg font-semibold mb-2 hover:text-primary transition-colors cursor-pointer"
          onClick={handleCardClick}
        >
          {name}
        </h3>
        <p className="font-poppins text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
          {description}
        </p>
        <Button 
          asChild 
          className="w-full bg-primary hover:bg-accent text-white mt-auto"
        >
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2"
            onClick={handleWhatsAppClick}
          >
            <ShoppingCart size={16} />
            <span>Inquire on WhatsApp</span>
            <ExternalLink size={14} />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
});

export default ProductCard;
