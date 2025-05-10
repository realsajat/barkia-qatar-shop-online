
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

  const handleLogoMouseEnter = () => {
    setIsLogoHovered(true);
  };

  const handleLogoMouseLeave = () => {
    setIsLogoHovered(false);
    setRotation({ x: 0, y: 0, z: 0 });
  };

  const handleLogoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isLogoHovered) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Enhanced rotation with z-axis
    setRotation({ 
      x: -(y / 20), 
      y: x / 20,
      z: (x + y) / 100
    });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({behavior: 'smooth'});
  };

  // Pulse animation effect
  const [isPulsing, setIsPulsing] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(prev => !prev);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative bg-primary text-white pb-16 pt-20 lg:pt-24 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transform Your Living Space with Al Arabia Qarpets
            </h1>
            <p className="font-poppins text-lg mb-8 text-white/80 max-w-xl mx-auto lg:mx-0">
              Premium home furnishings with free installation and delivery throughout Qatar. 
              Enhance your space with our quality Barkia, carpets, sofas, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={() => scrollToSection('products')}
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2"
                >
                  Explore Products <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </motion.div>
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2"
                >
                  Contact Us
                </motion.div>
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <motion.div 
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 perspective-800"
              onMouseEnter={handleLogoMouseEnter}
              onMouseLeave={handleLogoMouseLeave}
              onMouseMove={handleLogoMouseMove}
              onClick={() => scrollToSection('products')}
              whileHover={{ scale: 1.05 }}
              animate={{ 
                rotateY: isLogoHovered ? 0 : [0, 5, 0, -5, 0],
                rotateX: isLogoHovered ? 0 : [0, 3, 0, -3, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                repeatType: "loop",
                ease: "easeInOut"
              }}
              style={{ 
                cursor: 'pointer',
                perspective: '1000px'
              }}
            >
              <motion.div 
                className="absolute inset-0 flex items-center justify-center rounded-full p-4 transition-all duration-300"
                style={{ 
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
                  transition: isLogoHovered ? 'none' : 'transform 0.5s ease-out'
                }}
              >
                <div className="relative w-full h-full">
                  {/* Removed amber shadow effects */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-white/5 blur-md transform -translate-z-10"></div>
                  
                  {/* Main logo with pulsing effect */}
                  <div className={`absolute inset-0 rounded-full ${isPulsing ? 'animate-pulse' : ''}`}>
                    <div className="w-full h-full relative">
                      {/* Removed outer amber glow */}
                      
                      {/* Main logo */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <img 
                          src="/public/lovable-uploads/27cc3b08-4889-48d9-8c94-37e93eda66bc.png" 
                          alt="Al Arabia Qarpets Logo" 
                          className="w-full h-full object-contain drop-shadow-xl transition-all duration-300"
                        />
                      </motion.div>
                      
                      {/* Shine effect */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent rounded-full"
                        animate={{ 
                          opacity: [0, 0.5, 0],
                          rotateZ: [0, 360] 
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
