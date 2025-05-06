
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  name: string;
  description: string;
  imageSrc: string;
  whatsappLink: string;
}

export default function ProductCard({ name, description, imageSrc, whatsappLink }: ProductCardProps) {
  return (
    <Card className="overflow-hidden border border-border/50 transition-all duration-200 hover:shadow-md">
      <Link to="/products" className="block">
        <div className="aspect-square overflow-hidden bg-secondary">
          <img 
            src={imageSrc} 
            alt={name} 
            className="h-full w-full object-cover transition-transform duration-200 hover:scale-105" 
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to="/products" className="block">
          <h3 className="font-playfair text-lg font-semibold mb-2 hover:text-primary transition-colors">{name}</h3>
        </Link>
        <p className="font-poppins text-sm text-muted-foreground mb-4">{description}</p>
        <Button 
          asChild 
          className="w-full bg-primary hover:bg-accent text-white"
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
