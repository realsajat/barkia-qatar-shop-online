
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

export default function ProductsSection() {
  // Sample products
  const featuredProducts = [
    {
      name: "Premium Barkia",
      description: "High-quality Barkia panels for elegant room separation and decoration.",
      imageSrc: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=800&auto=format&fit=crop",
      whatsappLink: "https://wa.me/+97400000000?text=I'm%20interested%20in%20Premium%20Barkia"
    },
    {
      name: "Luxury Carpets",
      description: "Soft, durable carpets that add comfort and style to any room.",
      imageSrc: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=800&auto=format&fit=crop",
      whatsappLink: "https://wa.me/+97400000000?text=I'm%20interested%20in%20Luxury%20Carpets"
    },
    {
      name: "Modern Majlis Sofas",
      description: "Contemporary majlis sofas that blend tradition and modern comfort.",
      imageSrc: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=800&auto=format&fit=crop",
      whatsappLink: "https://wa.me/+97400000000?text=I'm%20interested%20in%20Modern%20Majlis%20Sofas"
    },
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Our Featured Products</h2>
          <p className="font-poppins text-muted-foreground max-w-2xl mx-auto">
            Explore our premium selection of home furnishings designed to transform your space.
            All products come with free installation and delivery in Qatar.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              description={product.description}
              imageSrc={product.imageSrc}
              whatsappLink={product.whatsappLink}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            asChild 
            size="lg" 
            className="bg-primary hover:bg-accent text-white"
          >
            <Link to="/products" className="flex items-center gap-2">
              View All Products <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
