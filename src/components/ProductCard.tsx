
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ExternalLink } from "lucide-react";

interface ProductCardProps {
  name: string;
  description: string;
  imageSrc: string;
  whatsappLink: string;
  onClick?: () => void;
}

export default function ProductCard({ name, description, imageSrc, whatsappLink, onClick }: ProductCardProps) {
  return (
    <Card className="overflow-hidden bg-white/20 backdrop-blur-md border border-white/30 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 h-full flex flex-col">
      <div 
        className="aspect-square overflow-hidden bg-secondary cursor-pointer"
        onClick={onClick}
      >
        <img 
          src={imageSrc} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-200 hover:scale-105" 
        />
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 
          className="font-playfair text-lg font-semibold mb-2 hover:text-primary transition-colors cursor-pointer"
          onClick={onClick}
        >
          {name}
        </h3>
        <p className="font-poppins text-sm text-muted-foreground mb-4 flex-grow">{description}</p>
        <Button 
          asChild 
          className="w-full bg-primary hover:bg-accent text-white mt-auto"
        >
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2"
          >
            <ShoppingCart size={16} />
            <span>Inquire on WhatsApp</span>
            <ExternalLink size={14} />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
