
import { MessageCircle, Mail, MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If we're on the homepage, scroll to the contact section
    if (location.pathname === "/") {
      document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});
    } else {
      // If we're on another page, navigate to homepage and then scroll to contact
      window.location.href = '/#contact';
    }
  };
  
  return (
    <footer className="bg-primary text-white pt-12 pb-6" id="footer">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/green-white-logo.png" 
                alt="Al Arabia Carpets Logo" 
                className="h-12 w-12 mr-3" 
              />
              <h3 className="font-playfair text-xl font-bold">Al Arabia Carpets</h3>
            </div>
            <p className="font-poppins text-sm mb-4">
              Premium home furnishing solutions in Qatar. We offer Barkia, PVC barkia, carpets, 
              rollers, sofas, majlis sofas, curtains, and grass carpets.
            </p>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="font-poppins text-sm hover:text-accent-DEFAULT transition-colors">Home</Link>
              <Link to="/products" className="font-poppins text-sm hover:text-accent-DEFAULT transition-colors">Products</Link>
              <Link to="/about" className="font-poppins text-sm hover:text-accent-DEFAULT transition-colors">About Us</Link>
              <a 
                href="/#contact" 
                onClick={scrollToContact} 
                className="font-poppins text-sm hover:text-accent-DEFAULT transition-colors"
              >
                Contact Us
              </a>
            </nav>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Contact Us</h4>
            <div className="flex flex-col space-y-3">
              <a 
                href="https://wa.me/+97455512858" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 font-poppins text-sm hover:text-accent-DEFAULT transition-colors"
              >
                <MessageCircle size={16} />
                <span>WhatsApp: +974 5551 2858</span>
                <ExternalLink size={14} />
              </a>
              
              <div className="flex items-start space-x-2 font-poppins text-sm">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Al Mansoura St, Doha, Qatar</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="font-poppins text-sm">&copy; {currentYear} Al Arabia Carpets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
