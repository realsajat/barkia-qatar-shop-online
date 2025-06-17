
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Phone, MapPin, Facebook, Instagram, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [newsletterSignup, setNewsletterSignup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => {
        setSubmitted(true);
        toast({
          title: "Message sent successfully!",
          description: `Thank you ${name}, we'll contact you soon at ${email}.`,
        });
        setName("");
        setEmail("");
        setMessage("");
        setNewsletterSignup(false);
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        toast({
          title: "Something went wrong!",
          description: "Please try again later or contact us directly.",
          variant: "destructive",
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-primary to-primary/90 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
          <p className="font-poppins text-lg max-w-3xl mx-auto text-white/90 leading-relaxed">
            Ready to transform your space with premium home furnishings? We're here to help bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Contact Information Card */}
          <Card className="shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary p-2 rounded-full">
                  <Phone size={18} className="text-white" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-white">Get In Touch</h3>
              </div>
              
              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/+97455512858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors group"
                >
                  <div className="bg-green-500 p-2 rounded-full group-hover:scale-110 transition-transform">
                    <MessageCircle size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-poppins font-medium text-white">WhatsApp</p>
                    <p className="font-poppins text-sm text-white/70">+974 5551 2858</p>
                  </div>
                  <ExternalLink size={16} className="text-white/50" />
                </a>

                {/* Email */}
                <a
                  href="mailto:info@alarabiacarpets.com"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors group"
                >
                  <div className="bg-blue-500 p-2 rounded-full group-hover:scale-110 transition-transform">
                    <Mail size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-poppins font-medium text-white">Email</p>
                    <p className="font-poppins text-sm text-white/70">info@alarabiacarpets.com</p>
                  </div>
                  <ExternalLink size={16} className="text-white/50" />
                </a>

                {/* Location with Google Maps link */}
                <a
                  href="https://maps.app.goo.gl/fmsyA8xgwo5qgu2H7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors group"
                >
                  <div className="bg-accent p-2 rounded-full group-hover:scale-110 transition-transform">
                    <MapPin size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-poppins font-medium text-white">Location</p>
                    <p className="font-poppins text-sm text-white/70">Al Mansoura St, Doha, Qatar</p>
                  </div>
                  <ExternalLink size={16} className="text-white/50" />
                </a>

                {/* Social Media */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href="https://facebook.com/alarabiacarpets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors group"
                  >
                    <div className="bg-blue-600 p-1.5 rounded-full group-hover:scale-110 transition-transform">
                      <Facebook size={16} className="text-white" />
                    </div>
                    <span className="font-poppins text-sm font-medium text-white">Facebook</span>
                    <ExternalLink size={12} className="text-white/50 ml-auto" />
                  </a>
                  
                  <a
                    href="https://instagram.com/alarabiacarpet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors group"
                  >
                    <div className="bg-pink-600 p-1.5 rounded-full group-hover:scale-110 transition-transform">
                      <Instagram size={16} className="text-white" />
                    </div>
                    <span className="font-poppins text-sm font-medium text-white">Instagram</span>
                    <ExternalLink size={12} className="text-white/50 ml-auto" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form Card */}
          <Card className="shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary p-2 rounded-full">
                  <Mail size={18} className="text-white" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-white">Send us a Message</h3>
              </div>

              {!submitted ? (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  
                  <div className="space-y-1">
                    <label htmlFor="name" className="block text-sm font-medium text-white font-poppins">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/50 focus:border-accent focus:ring-0 font-poppins"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-sm font-medium text-white font-poppins">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/50 focus:border-accent focus:ring-0 font-poppins"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="block text-sm font-medium text-white font-poppins">
                      Your Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={4}
                      className="w-full px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/50 focus:border-accent focus:ring-0 font-poppins resize-none"
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="newsletter"
                      name="newsletter"
                      checked={newsletterSignup}
                      onCheckedChange={(checked) => setNewsletterSignup(checked as boolean)}
                      className="mt-0.5 data-[state=checked]:bg-accent border-white/30"
                    />
                    <label
                      htmlFor="newsletter"
                      className="text-sm font-poppins text-white/80 cursor-pointer"
                    >
                      Subscribe to our newsletter for exclusive offers and updates
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent/90 text-white font-poppins font-medium py-2 rounded-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Mail size={18} />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Mail size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-playfair mb-2">Message Sent!</h3>
                  <p className="text-white/80 font-poppins text-sm mb-4">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="font-poppins text-sm border-white/30 text-white hover:bg-white hover:text-primary"
                  >
                    Send Another Message
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
