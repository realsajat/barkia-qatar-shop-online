
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
          <p className="font-poppins max-w-2xl mx-auto">
            Have questions or ready to transform your space? Reach out to us on WhatsApp for quick responses.
          </p>
        </div>
        
        <Card className="bg-white text-primary max-w-xl mx-auto">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="font-playfair text-2xl font-semibold mb-2">Get in Touch</h3>
              <p className="font-poppins text-muted-foreground">
                Our team is ready to assist you with any questions about our products and services.
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Phone size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-poppins font-medium">WhatsApp</p>
                  <p className="font-poppins text-sm text-muted-foreground">+974 0000 0000</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-poppins font-medium">Location</p>
                  <p className="font-poppins text-sm text-muted-foreground">Doha, Qatar</p>
                </div>
              </div>
            </div>
            
            <Button 
              asChild 
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <a 
                href="https://wa.me/+97400000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2"
              >
                <span>Contact via WhatsApp</span>
                <ExternalLink size={16} />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
