
import { useState, useEffect, memo, useCallback, useMemo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, ShoppingCart, Info, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Throttle function for scroll events
const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  return (...args: any[]) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

const Navbar = memo(function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("home");
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isHomePage = location.pathname === '/';

  const scrollToSection = useCallback((id: string) => {
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
  }, [isHomePage]);

  // Memoized navigation items
  const navigationItems = useMemo(() => [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'products', label: 'Products', icon: ShoppingCart },
    { id: 'contact', label: 'Contact', icon: Info }
  ], []);

  // Track scroll position to update active link on home page with throttling
  useEffect(() => {
    if (!isHomePage) return;
    
    const handleScroll = throttle(() => {
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
    }, 100); // Throttle to 100ms

    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isHomePage]);

  // Helper function to determine if a section is active
  const isActive = useCallback((section: string) => {
    if (isHomePage) {
      return activeSection === section;
    }
    // For non-home pages, match the path
    return location.pathname === `/${section === 'home' ? '' : section}`;
  }, [isHomePage, activeSection, location.pathname]);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/tran-golden-logo.png" 
            alt="Al Arabia Qarpets Logo" 
            className="h-12 w-12 object-contain"
            loading="eager"
            decoding="async"
          />
          <span className="font-playfair text-xl font-bold sm:inline-block">Al Arabia Carpets</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-2 rounded-lg font-poppins font-medium transition-all duration-300 hover:bg-white/10 ${
                isActive(item.id) 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          {/* External Links */}
          <Link 
            to="/products" 
            className={`px-4 py-2 rounded-lg font-poppins font-medium transition-all duration-300 hover:bg-white/10 ${
              location.pathname === '/products' 
                ? 'bg-white/20 text-white' 
                : 'text-white/80 hover:text-white'
            }`}
          >
            All Products
          </Link>
          
          <Link 
            to="/about" 
            className={`px-4 py-2 rounded-lg font-poppins font-medium transition-all duration-300 hover:bg-white/10 ${
              location.pathname === '/about' 
                ? 'bg-white/20 text-white' 
                : 'text-white/80 hover:text-white'
            }`}
          >
            About
          </Link>

          <Link 
            to="/contact" 
            className={`px-4 py-2 rounded-lg font-poppins font-medium transition-all duration-300 hover:bg-white/10 ${
              location.pathname === '/contact' 
                ? 'bg-white/20 text-white' 
                : 'text-white/80 hover:text-white'
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-white/10"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-primary/95 backdrop-blur-sm border-t border-white/10">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-poppins font-medium transition-all duration-300 ${
                    isActive(item.id) 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <IconComponent size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
            
            {/* External Links */}
            <Link 
              to="/products" 
              onClick={closeMenu}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-poppins font-medium transition-all duration-300 ${
                location.pathname === '/products' 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <ShoppingCart size={20} />
              <span>All Products</span>
            </Link>
            
            <Link 
              to="/about" 
              onClick={closeMenu}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-poppins font-medium transition-all duration-300 ${
                location.pathname === '/about' 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Info size={20} />
              <span>About</span>
            </Link>

            <Link 
              to="/contact" 
              onClick={closeMenu}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-poppins font-medium transition-all duration-300 ${
                location.pathname === '/contact' 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <MessageCircle size={20} />
              <span>Contact</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
});

export default Navbar;
