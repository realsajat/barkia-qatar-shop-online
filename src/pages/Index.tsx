
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ProductsSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  );
};

export default Index;
