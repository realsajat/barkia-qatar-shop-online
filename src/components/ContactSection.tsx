
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Phone, MapPin, Facebook, Instagram } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newsletterSignup, setNewsletterSignup] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real implementation, you would send the form data to your backend
    // Here we're simulating a successful submission
    setTimeout(() => {
      toast({
        title: "Form submitted!",
        description: `Thank you ${name}, we will contact you soon.`,
      });
      setName("");
      setEmail("");
      setMessage("");
      setNewsletterSignup(false);
      setIsSubmitting(false);
    }, 1000);

    // Log the submission (this would be replaced with actual API call)
    console.log({
      name,
      email,
      message,
      newsletterSignup,
      to: "info@alarabiacarpets.com",
    });
  };

  return (
    <section id="contact" className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
          <p className="font-poppins max-w-2xl mx-auto">
            Have questions or ready to transform your space? Reach out to us.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="bg-white text-primary">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="font-playfair text-2xl font-semibold mb-2">Get in Touch</h3>
                <p className="font-poppins text-muted-foreground">
                  Our team is ready to assist you with any questions about our products and services.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-poppins font-medium">WhatsApp</p>
                    <p className="font-poppins text-sm text-muted-foreground">+974 5551 2858</p>
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

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Facebook size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-poppins font-medium">Facebook</p>
                    <a 
                      href="https://facebook.com/alarabiacarpet" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-poppins text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      facebook.com/alarabiacarpet
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Instagram size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-poppins font-medium">Instagram</p>
                    <a 
                      href="https://instagram.com/alarabiacarpet" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-poppins text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      instagram.com/alarabiacarpet
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  asChild 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <a 
                    href="https://wa.me/+97455512858" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2"
                  >
                    <span>Contact via WhatsApp</span>
                    <ExternalLink size={16} />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white text-primary overflow-hidden border-0 shadow-lg">
            <div className="bg-accent/5 py-5 px-8 border-b border-accent/10">
              <h3 className="font-playfair text-2xl font-semibold text-center">Sign Up</h3>
            </div>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1 font-poppins">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-secondary/20 border-accent/20 focus-visible:ring-accent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 font-poppins">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-secondary/20 border-accent/20 focus-visible:ring-accent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1 font-poppins">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="min-h-[120px] bg-secondary/20 border-accent/20 focus-visible:ring-accent"
                  />
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="newsletter"
                    checked={newsletterSignup}
                    onCheckedChange={(checked) => 
                      setNewsletterSignup(checked as boolean)
                    }
                    className="mt-1 data-[state=checked]:bg-accent border-accent/50"
                  />
                  <label
                    htmlFor="newsletter"
                    className="text-sm font-poppins text-muted-foreground cursor-pointer"
                  >
                    Subscribe to our newsletter for exclusive offers and updates
                  </label>
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-white transition-all duration-300 mt-2"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground font-poppins pt-2">
                  Messages will be sent to <span className="font-medium">info@alarabiacarpets.com</span>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
