
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

export default function ProductsSection() {
  // Sample products
  const featuredProducts = [
    {
      id: "premium-barkia",
      name: "Premium Barkia",
      description: "High-quality Barkia panels for elegant room separation and decoration.",
      imageSrc: "/barkia.webp",
      whatsappLink: "https://wa.me/+97455512858?text=I'm%20interested%20in%20Premium%20Barkia"
    },
    {
      id: "luxury-carpets",
      name: "Luxury Carpets",
      description: "Soft, durable carpets that add comfort and style to any room.",
      imageSrc: "/carpet.webp",
      whatsappLink: "https://wa.me/+97455512858?text=I'm%20interested%20in%20Luxury%20Carpets"
    },
    {
      id: "majlis-sets",
      name: "Modern Majlis Sofas",
      description: "Contemporary majlis sofas that blend tradition and modern comfort.",
      imageSrc: "/majlis-sofa.webp",
      whatsappLink: "https://wa.me/+97455512858?text=I'm%20interested%20in%20Modern%20Majlis%20Sofas"
    },
  ];

  return (
    <section className="py-20 bg-secondary">
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
              onClick={() => window.location.href = `/products/${product.id}`}
              priority={true} // All featured products load immediately
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
