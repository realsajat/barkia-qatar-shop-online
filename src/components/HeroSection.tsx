
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative bg-primary text-white pb-16 pt-20 lg:pt-24 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transform Your Living Space with Barkia Qatar
            </h1>
            <p className="font-poppins text-lg mb-8 text-white/80 max-w-xl mx-auto lg:mx-0">
              Premium home furnishings with free installation and delivery throughout Qatar. 
              Enhance your space with our quality Barkia, carpets, sofas, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
              >
                <Link to="/products" className="flex items-center gap-2">
                  Explore Products <ArrowRight size={16} />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
              >
                <a 
                  href="https://wa.me/+97400000000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Contact Us
                </a>
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/public/lovable-uploads/a0ec216d-dd84-4858-84bf-633bfd31d33c.png" 
                  alt="Barkia Qatar Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
