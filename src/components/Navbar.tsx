
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, ShoppingCart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("home");

  const isHomePage = location.pathname === '/';

  const scrollToSection = (id: string) => {
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({behavior: 'smooth'});
        setActiveSection(id);
        setIsOpen(false);
      }
    } else {
      // If not on home page, navigate to home page with section hash
      window.location.href = `/#${id}`;
    }
  };

  // Track scroll position to update active link on home page
  useEffect(() => {
    if (!isHomePage) return;
    
    const handleScroll = () => {
      const sections = ["home", "products", "contact"];
      const currentPos = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          
          if (currentPos >= top && currentPos <= top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Helper function to determine if a section is active
  const isActive = (section: string) => {
    if (isHomePage) {
      return activeSection === section;
    }
    // For non-home pages, match the path
    return location.pathname === `/${section === 'home' ? '' : section}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/tran-golden-logo.png" 
            alt="Al Arabia Qarpets Logo" 
            className="h-12 w-12 object-contain"
          />
          <span className="font-playfair text-xl font-bold sm:inline-block">Al Arabia Carpets</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 ml-auto">
          {isHomePage ? (
            <button 
              onClick={() => scrollToSection('home')} 
              className={`flex items-center space-x-1 font-poppins transition-colors ${
                isActive('home') ? 'text-accent-DEFAULT font-extrabold' : 'hover:text-green-400'
              }`}
            >
              <Home size={16} />
              <span>Home</span>
            </button>
          ) : (
            <Link
              to="/"
              className={`flex items-center gap-2 font-poppins transition-colors duration-200 px-3 py-2 rounded-md ${
                isActive('home') ? 'text-accent-DEFAULT font-extrabold bg-white/10' : 'hover:text-green-400 hover:bg-white/5'
              }`}
            >
              <Home size={16} />
              <span>Home</span>
            </Link>
          )}

          <Link 
            to="/products" 
            className={`flex items-center gap-2 font-poppins transition-colors duration-200 px-3 py-2 rounded-md ${
              isActive('products') ? 'text-accent-DEFAULT font-extrabold bg-white/10' : 'hover:text-green-400 hover:bg-white/5'
            }`}
          >
            <ShoppingCart size={16} />
            <span>Products</span>
          </Link>

          <Link
            to="/about"
            className={`flex items-center gap-2 font-poppins transition-colors duration-200 px-3 py-2 rounded-md ${
              isActive('about') ? 'text-accent-DEFAULT font-extrabold bg-white/10' : 'hover:text-green-400 hover:bg-white/5'
            }`}
          >
            <Info size={16} />
            <span>About</span>
          </Link>

          <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
            <a 
              href="https://wa.me/+97455512858" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <span>Contact Us</span>
            </a>
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex-shrink-0">
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-[280px] bg-primary/95 backdrop-blur-sm shadow-xl z-50 py-6 md:hidden">
            <div className="flex flex-col h-full">
              <div className="px-6 mb-8 flex items-center justify-between">
                <img 
                  src="/lovable-uploads/tran-golden-logo.png" 
                  alt="Al Arabia Qarpets Logo" 
                  className="h-10 w-10 object-contain"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/10"
                >
                  <X size={20} />
                </Button>
              </div>
              
              <div className="flex-1 flex flex-col gap-2 px-4">
                {isHomePage ? (
                  <button 
                    onClick={() => scrollToSection('home')}
                    className={`flex items-center gap-2 font-poppins px-4 py-3 rounded-lg ${
                      isActive('home') ? 'text-accent-DEFAULT font-semibold bg-white/10' : 'hover:text-green-400 hover:bg-white/5'
                    }`}
                  >
                    <Home size={18} />
                    <span>Home</span>
                  </button>
                ) : (
                  <Link 
                    to="/"
                    className={`flex items-center gap-2 font-poppins px-4 py-3 rounded-lg ${
                      isActive('home') ? 'text-accent-DEFAULT font-semibold bg-white/10' : 'hover:text-green-400 hover:bg-white/5'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Home size={18} />
                    <span>Home</span>
                  </Link>
                )}

                <Link 
                  to="/products"
                  className={`flex items-center gap-2 font-poppins px-4 py-3 rounded-lg ${
                    isActive('products') ? 'text-accent-DEFAULT font-semibold bg-white/10' : 'hover:text-green-400 hover:bg-white/5'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingCart size={18} />
                  <span>Products</span>
                </Link>

                <Link
                  to="/about"
                  className={`flex items-center gap-2 font-poppins px-4 py-3 rounded-lg ${
                    isActive('about') ? 'text-accent-DEFAULT font-semibold bg-white/10' : 'hover:text-green-400 hover:bg-white/5'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Info size={18} />
                  <span>About</span>
                </Link>

                <div className="mt-4">
                  <Button 
                    asChild 
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <a 
                      href="https://wa.me/+97455512858" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <span>Contact Us</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
