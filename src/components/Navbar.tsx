
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, ShoppingCart, Phone, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/public/lovable-uploads/a0ec216d-dd84-4858-84bf-633bfd31d33c.png" 
            alt="Al Arabia Qarpets Logo" 
            className="h-10 w-10"
          />
          <span className="font-playfair text-xl font-bold hidden sm:inline-block">Al Arabia Qarpets</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a 
            href="#" 
            onClick={(e) => {e.preventDefault(); scrollToSection('home')}} 
            className="flex items-center space-x-1 font-poppins hover:text-accent-DEFAULT transition-colors"
          >
            <Home size={16} />
            <span>Home</span>
          </a>
          <a 
            href="#products" 
            onClick={(e) => {e.preventDefault(); scrollToSection('products')}} 
            className="flex items-center space-x-1 font-poppins hover:text-accent-DEFAULT transition-colors"
          >
            <ShoppingCart size={16} />
            <span>Products</span>
          </a>
          <a 
            href="#services" 
            onClick={(e) => {e.preventDefault(); scrollToSection('services')}} 
            className="flex items-center space-x-1 font-poppins hover:text-accent-DEFAULT transition-colors"
          >
            <Info size={16} />
            <span>Services</span>
          </a>
          <a 
            href="#contact" 
            onClick={(e) => {e.preventDefault(); scrollToSection('contact')}} 
            className="flex items-center space-x-1 font-poppins hover:text-accent-DEFAULT transition-colors"
          >
            <Phone size={16} />
            <span>Contact</span>
          </a>
          <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
            <a 
              href="https://wa.me/+97455512858" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <Phone size={16} />
              <span>Contact Us</span>
            </a>
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-white/10 py-4">
          <div className="flex flex-col space-y-4 px-6">
            <a 
              href="#home" 
              onClick={(e) => {e.preventDefault(); scrollToSection('home'); setIsOpen(false);}} 
              className="flex items-center space-x-2 font-poppins py-2"
            >
              <Home size={16} />
              <span>Home</span>
            </a>
            <a 
              href="#products" 
              onClick={(e) => {e.preventDefault(); scrollToSection('products'); setIsOpen(false);}} 
              className="flex items-center space-x-2 font-poppins py-2"
            >
              <ShoppingCart size={16} />
              <span>Products</span>
            </a>
            <a 
              href="#services" 
              onClick={(e) => {e.preventDefault(); scrollToSection('services'); setIsOpen(false);}} 
              className="flex items-center space-x-2 font-poppins py-2"
            >
              <Info size={16} />
              <span>Services</span>
            </a>
            <a 
              href="#contact" 
              onClick={(e) => {e.preventDefault(); scrollToSection('contact'); setIsOpen(false);}} 
              className="flex items-center space-x-2 font-poppins py-2"
            >
              <Phone size={16} />
              <span>Contact</span>
            </a>
            <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
              <a 
                href="https://wa.me/+97455512858" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2"
              >
                <Phone size={16} />
                <span>Contact Us</span>
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
