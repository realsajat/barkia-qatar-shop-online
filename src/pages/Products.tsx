import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose
} from "@/components/ui/drawer";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const categories = {
    all: { label: "All Products" },
    barkia: { label: "Barkia & PVC" },
    carpet: { label: "Carpets" },
    furniture: { label: "Furniture" },
    curtains: { label: "Curtains" },
    interior: { label: "Interior Design" }
  };

  const allProducts = [
    {
      id: "premium-barkia",
      name: "Premium Barkia",
      description: "High-quality Barkia panels for elegant room separation and decoration.",
      imageSrc: "barkia.png",
      category: "barkia",
      price: "Starting from 350 QAR/sqm",
      whatsappLink: "https://wa.me/+97455512858?text=I'm%20interested%20in%20Premium%20Barkia"
    },
    {
      id: "pvc-barkia",
      name: "PVC Barkia",
      description: "Durable and water-resistant PVC Barkia perfect for high-moisture areas.",
      imageSrc: "pvc-barkia.png",
      category: "barkia",
      price: "Starting from 250 QAR/sqm",
      whatsappLink: "https://wa.me/+97455512858?text=I'm%20interested%20in%20PVC%20Barkia"
    },
    {
      id: "luxury-carpets",
      name: "Luxury Carpets",
      description: "Soft, durable carpets that add comfort and style to any room.",
      imageSrc: "carpet.png",
      category: "carpet",
      price: "Starting from 120 QAR/sqm",
      whatsappLink: "https://wa.me/+97455512858?text=I'm%20interested%20in%20Luxury%20Carpets"
    },
    {
      id: "grass-carpet",
      name: "Grass Carpet",
      description: "Natural-looking grass carpets ideal for outdoor areas and balconies.",
      imageSrc: "grass-carpet.png",
      category: "carpet",
      price: "Starting from 80 QAR/sqm",
      whatsappLink: "https://wa.me/+97455512858?text=I'm%20interested%20in%20Grass%20Carpet"
    },
    {
      id: "roller-blinds",
      name: "Roller Blinds",
      description: "Modern roller blinds providing privacy and light control.",
      imageSrc: "roller.png",
      category: "curtains",
      price: "Starting from 180 QAR/sqm",
      whatsappLink: "https://wa.me/+97455512858?text=I'm%20interested%20in%20Roller%20Blinds"
    },
    {
      id: "elegant-curtains",
      name: "Elegant Curtains",
      description: "Beautiful curtains to enhance the ambiance of your living spaces.",
      imageSrc: "curtain.png",
      category: "curtains",
      price: "Starting from 150 QAR/sqm",
      whatsappLink: "https://wa.me/+97455512858?text=I'm%20interested%20in%20Elegant%20Curtains"
    },
    {
      id: "modern-sofas",
      name: "Modern Sofas",
      description: "Contemporary sofas designed for comfort and style.",
      imageSrc: "sofa.png",
      category: "furniture",
      price: "Starting from 1,800 QAR",
      whatsappLink: "https://wa.me/+97455512858?text=I'm%20interested%20in%20Modern%20Sofas"
    },
    {
      id: "majlis-sets",
      name: "Majlis Sets",
      description: "Traditional yet modern majlis sets perfect for Qatari homes.",
      imageSrc: "majlis-sofa.png",
      category: "furniture",
      price: "Starting from 4,500 QAR",
      whatsappLink: "https://wa.me/+97455512858?text=I'm%20interested%20in%20Majlis%20Sets"
    },
    {
      id: "luxury-interior-design",
      name: "Luxury Interior Design",
      description: "Complete interior design service tailored to your preferences and lifestyle.",
      imageSrc: "interior.png",
      category: "interior",
      price: "Starting from 10,000 QAR",
      whatsappLink: "https://wa.me/+97455512858?text=I'm%20interested%20in%20Luxury%20Interior%20Design%20Services"
    }
  ];

  const filteredProducts =
    activeCategory === "all"
      ? allProducts
      : allProducts.filter(product => product.category === activeCategory);

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const renderCategoryTabs = () => (
    <TabsList className="bg-white p-1 w-full justify-center">
      {Object.entries(categories).map(([key, { label }]) => (
        <TabsTrigger
          key={key}
          value={key}
          className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-bold whitespace-nowrap"
        >
          {label}
        </TabsTrigger>
      ))}
    </TabsList>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Our Products</h1>
            <p className="font-poppins max-w-2xl mx-auto">
              Browse our complete collection of premium home furnishings and décor products.
              All products come with free installation and delivery in Qatar.
            </p>
          </div>
        </div>

        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            {isMobile ? (
              <div className="mb-8 flex justify-center">
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 border border-primary/50 shadow-md bg-white py-3 px-4"
                    >
                      <Filter size={18} className="text-primary" />
                      <span className="font-medium text-base">{categories[activeCategory].label}</span>
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="bg-[#F1F0FB] px-4 max-w-full overflow-x-hidden max-h-[90vh]">
                    <DrawerHeader className="pb-2">
                      <DrawerTitle className="text-center text-xl font-bold text-[#403E43]">
                        Select Category
                      </DrawerTitle>
                    </DrawerHeader>
                    <div className="px-2 pb-4 max-h-[65vh] overflow-y-auto">
                      <Tabs
                        defaultValue="all"
                        value={activeCategory}
                        onValueChange={setActiveCategory}
                        className="w-full"
                      >
                        <TabsList className="flex flex-col gap-3 w-full bg-transparent">
                          {Object.entries(categories).map(([key, { label }]) => (
                            <TabsTrigger
                              key={key}
                              value={key}
                              className="w-full justify-center py-3.5 text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:shadow-md transition-all duration-200 border border-transparent data-[state=active]:border-primary/30 rounded-md"
                            >
                              {label}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </Tabs>
                    </div>
                    <DrawerFooter className="pt-0">
                      <DrawerClose asChild>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6">Apply Filter</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            ) : (
              <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
                <div className="flex justify-center">
                  {renderCategoryTabs()}
                </div>
              </Tabs>
            )}

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={index}
                    name={product.name}
                    description={product.description}
                    imageSrc={product.imageSrc}
                    whatsappLink={product.whatsappLink}
                    onClick={() => handleProductClick(product.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="font-poppins text-lg">No products found in this category.</p>
                <Button onClick={() => setActiveCategory("all")} className="mt-4 bg-primary hover:bg-accent text-white">
                  View All Products
                </Button>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="font-poppins max-w-2xl mx-auto mb-8">
              Contact us directly through WhatsApp and our team will help you find the perfect solution for your home.
            </p>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <a href="https://wa.me/+97455512858" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
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
