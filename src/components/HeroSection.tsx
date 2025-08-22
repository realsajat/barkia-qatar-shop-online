
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Award, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// framer-motion will be dynamically imported on non-mobile to avoid adding
// its runtime cost to mobile users. On mobile we render a simpler static hero.

export default function HeroSection() {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const isMobile = useIsMobile();
  const [Motion, setMotion] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;
    // Only load framer-motion on non-mobile devices. Instead of storing the
    // raw `motion` proxy we map only the primitives we use to a plain object
    // (div, p, img). This avoids accidental invocation of the proxy as a
    // function which can lead to `Component` being null and the
    // `displayName` read error.
    if (!isMobile) {
      import('framer-motion')
        .then(mod => {
          if (!mounted) return;
          setMotion({
            div: mod.motion.div,
            p: mod.motion.p,
            img: mod.motion.img,
          });
        })
        .catch(() => {
          // ignore
        });
    }
    return () => {
      mounted = false;
    };
  }, [isMobile]);

  const handleLogoMouseEnter = () => {
    setIsLogoHovered(true);
  };

  const handleLogoMouseLeave = () => {
    setIsLogoHovered(false);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white overflow-hidden min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

  <div className="container mx-auto px-4 relative">
        <div className="flex items-center min-h-screen py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            
            {/* Left Content: animated on desktop, static on mobile */}
            <div className="text-center lg:text-left space-y-8">
              {Motion && !isMobile ? (
                <>
                  <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 text-sm font-medium shadow-lg">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    Premium Home Furnishings
                  </Motion.div>

                  <Motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                    <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                      Transform Your
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">Living Space</span>
                    </h1>
                  </Motion.div>

                  <Motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="font-poppins text-xl text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    Discover premium carpets, elegant sofas, and quality Barkia with free installation and delivery throughout Qatar.
                  </Motion.p>

                  <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-wrap gap-8 justify-center lg:justify-start">
                    <div className="flex items-center gap-2"><Award className="w-5 h-5 text-accent" /><span className="text-sm font-medium">Premium Quality</span></div>
                    <div className="flex items-center gap-2"><Users className="w-5 h-5 text-accent" /><span className="text-sm font-medium">1000+ Happy Customers</span></div>
                    <div className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-400 fill-current" /><span className="text-sm font-medium">Free Installation</span></div>
                  </Motion.div>

                  <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                    <Button onClick={() => scrollToSection('products')} size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg rounded-xl font-poppins font-semibold group transition-all duration-300 hover:scale-105 hover:shadow-2xl">Explore Products <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" /></Button>
                    <Button onClick={() => scrollToSection('contact')} size="lg" variant="outline" className="border-2 border-white/40 text-white bg-white/10 backdrop-blur-md hover:bg-white hover:text-primary px-8 py-6 text-lg rounded-xl font-poppins font-semibold transition-all duration-300 hover:scale-105">Get Quote</Button>
                  </Motion.div>
                </>
              ) : (
                // Mobile / fallback static version (no heavy animations)
                <>
                  <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-sm font-medium">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" /> Premium Home Furnishings
                  </div>
                  <h1 className="font-playfair text-4xl md:text-5xl font-bold leading-tight">Transform Your <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">Living Space</span></h1>
                  <p className="font-poppins text-base text-white/90 max-w-lg mx-auto lg:mx-0">Discover premium carpets, elegant sofas, and quality Barkia with free installation and delivery throughout Qatar.</p>
                  <div className="flex gap-3 justify-center pt-4">
                    <Button onClick={() => scrollToSection('products')} size="lg" className="bg-accent text-white px-6 py-3">Explore</Button>
                    <Button onClick={() => scrollToSection('contact')} size="lg" variant="outline" className="border text-white px-6 py-3">Get Quote</Button>
                  </div>
                </>
              )}
            </div>

            {/* Right Content - Logo */}
            <div className="flex justify-center lg:justify-end">
              {Motion && !isMobile ? (
                <Motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4 }} className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]" onMouseEnter={handleLogoMouseEnter} onMouseLeave={handleLogoMouseLeave} onClick={() => scrollToSection('products')} whileHover={{ scale: 1.05 }} style={{ cursor: 'pointer' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-accent/20 rounded-full blur-2xl"></div>
                  <div className="relative w-full h-full flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl">
                    <Motion.img src="/lovable-uploads/tran-golden-logo.webp" alt="Al Arabia Carpets Logo" className="w-3/4 h-3/4 object-contain drop-shadow-2xl" animate={{ rotateY: isLogoHovered ? 0 : [0, 10, 0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }} />
                    <Motion.div className="absolute inset-0 border-2 border-accent/40 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
                  </div>
                </Motion.div>
              ) : (
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem]" onClick={() => scrollToSection('products')}>
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-accent/20 rounded-full blur-2xl"></div>
                  <div className="relative w-full h-full flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl">
                    <img src="/lovable-uploads/tran-golden-logo.webp" alt="Al Arabia Carpets Logo" className="w-3/4 h-3/4 object-contain drop-shadow-2xl" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
