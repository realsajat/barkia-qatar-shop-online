
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ExternalLink, ImageIcon } from "lucide-react";
import { memo, useCallback, useState } from "react";

interface ProductCardProps {
  name: string;
  description: string;
  imageSrc: string;
  whatsappLink: string;
  onClick?: () => void;
  priority?: boolean; // For above-the-fold images
}

const ProductCard = memo(function ProductCard({ 
  name, 
  description, 
  imageSrc, 
  whatsappLink, 
  onClick,
  priority = false
}: ProductCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleCardClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  const handleWhatsAppClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 h-full flex flex-col">
      <div 
        className="aspect-square overflow-hidden bg-secondary cursor-pointer relative"
        onClick={handleCardClick}
      >
        {/* Loading state */}
        {(!isLoaded && !hasError) && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Error state with better fallback */}
        {hasError && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-gray-500 text-center p-4">
              <ImageIcon size={48} className="mx-auto mb-3 text-gray-400" />
              <div className="text-sm font-medium mb-1">Image not available</div>
              <div className="text-xs text-gray-400">{name}</div>
            </div>
          </div>
        )}
        
        <img 
          src={imageSrc} 
          alt={name}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`h-full w-full object-cover transition-all duration-500 hover:scale-105 ${
            isLoaded && !hasError ? 'opacity-100' : 'opacity-0'
          }`}
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
