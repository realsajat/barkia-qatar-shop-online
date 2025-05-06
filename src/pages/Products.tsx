
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  // Categories with their products
  const categories = {
    all: { label: "All Products" },
    barkia: { label: "Barkia & PVC" },
    carpet: { label: "Carpets" },
    furniture: { label: "Furniture" },
    curtains: { label: "Curtains" }
  };
  
  // Sample products with their categories
  const allProducts = [
    {
      name: "Premium Barkia",
      description: "High-quality Barkia panels for elegant room separation and decoration.",
      imageSrc: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=800&auto=format&fit=crop",
      category: "barkia",
      whatsappLink: "https://wa.me/+97400000000?text=I'm%20interested%20in%20Premium%20Barkia"
    },
    {
      name: "PVC Barkia",
      description: "Durable and water-resistant PVC Barkia perfect for high-moisture areas.",
      imageSrc: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=800&auto=format&fit=crop",
      category: "barkia",
      whatsappLink: "https://wa.me/+97400000000?text=I'm%20interested%20in%20PVC%20Barkia"
    },
    {
      name: "Luxury Carpets",
      description: "Soft, durable carpets that add comfort and style to any room.",
      imageSrc: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=800&auto=format&fit=crop",
      category: "carpet",
      whatsappLink: "https://wa.me/+97400000000?text=I'm%20interested%20in%20Luxury%20Carpets"
    },
    {
      name: "Grass Carpet",
      description: "Natural-looking grass carpets ideal for outdoor areas and balconies.",
      imageSrc: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=800&auto=format&fit=crop",
      category: "carpet",
      whatsappLink: "https://wa.me/+97400000000?text=I'm%20interested%20in%20Grass%20Carpet"
    },
    {
      name: "Roller Blinds",
      description: "Modern roller blinds providing privacy and light control.",
      imageSrc: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=800&auto=format&fit=crop",
      category: "curtains",
      whatsappLink: "https://wa.me/+97400000000?text=I'm%20interested%20in%20Roller%20Blinds"
    },
    {
      name: "Elegant Curtains",
      description: "Beautiful curtains to enhance the ambiance of your living spaces.",
      imageSrc: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=800&auto=format&fit=crop",
      category: "curtains",
      whatsappLink: "https://wa.me/+97400000000?text=I'm%20interested%20in%20Elegant%20Curtains"
    },
    {
      name: "Modern Sofas",
      description: "Contemporary sofas designed for comfort and style.",
      imageSrc: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=800&auto=format&fit=crop",
      category: "furniture",
      whatsappLink: "https://wa.me/+97400000000?text=I'm%20interested%20in%20Modern%20Sofas"
    },
    {
      name: "Majlis Sets",
      description: "Traditional yet modern majlis sets perfect for Qatari homes.",
      imageSrc: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=800&auto=format&fit=crop",
      category: "furniture",
      whatsappLink: "https://wa.me/+97400000000?text=I'm%20interested%20in%20Majlis%20Sets"
    },
  ];

  // Filter products based on active category
  const filteredProducts = activeCategory === "all" 
    ? allProducts 
    : allProducts.filter(product => product.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="bg-primary text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Our Products</h1>
            <p className="font-poppins max-w-2xl mx-auto">
              Browse our complete collection of premium home furnishings and décor products.
              All products come with free installation and delivery in Qatar.
            </p>
          </div>
        </div>

        {/* Products Section */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            {/* Category Tabs */}
            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
              <div className="flex justify-center">
                <TabsList className="bg-white p-1">
                  {Object.entries(categories).map(([key, { label }]) => (
                    <TabsTrigger 
                      key={key} 
                      value={key}
                      className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Tabs>
            
            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={index}
                    name={product.name}
                    description={product.description}
                    imageSrc={product.imageSrc}
                    whatsappLink={product.whatsappLink}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="font-poppins text-lg">No products found in this category.</p>
                <Button 
                  onClick={() => setActiveCategory("all")}
                  className="mt-4 bg-primary hover:bg-accent text-white"
                >
                  View All Products
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* Contact CTA */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="font-poppins max-w-2xl mx-auto mb-8">
              Contact us directly through WhatsApp and our team will help you find the perfect solution for your home.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <a 
                href="https://wa.me/+97400000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <Phone size={16} />
                <span>Contact Us on WhatsApp</span>
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  );
};

export default Products;
