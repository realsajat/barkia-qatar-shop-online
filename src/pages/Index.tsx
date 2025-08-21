
import HeroSection from "@/components/HeroSection";
import TrustedBy from "@/components/TrustedBy";
import ProductsSection from "@/components/ProductsSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section id="home">
          <HeroSection />
          <TrustedBy />
        </section>
        <section id="products">
          <ProductsSection />
        </section>
        <ServicesSection />
        <ContactSection />
      </main>
  <Footer />
    </div>
  );
};

export default Index;
