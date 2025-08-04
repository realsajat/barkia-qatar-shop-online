
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Phone, MapPin, Facebook, Instagram, Mail, MessageCircle } from "lucide-react";
import { useState, memo, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const ContactSection = memo(function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [newsletterSignup, setNewsletterSignup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = useCallback((e: React.FormEvent) => {
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
  }, [name, email, toast]);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }, []);

  const handleNewsletterChange = useCallback((checked: boolean) => {
    setNewsletterSignup(checked);
  }, []);

  const contactInfo = useMemo(() => [
    {
      href: "https://wa.me/+97455512858",
      icon: MessageCircle,
      bgColor: "bg-green-500",
      title: "WhatsApp",
      subtitle: "+974 5551 2858",
      external: true
    },
    {
      href: "mailto:info@alarabiacarpets.com",
      icon: Mail,
      bgColor: "bg-blue-500",
      title: "Email",
      subtitle: "info@alarabiacarpets.com",
      external: false
    },
    {
      href: "https://maps.google.com/?q=Al+Mansoura+St,+Doha,+Qatar",
      icon: MapPin,
      bgColor: "bg-red-500",
      title: "Location",
      subtitle: "Al Mansoura St, Doha",
      external: true
    }
  ], []);

  const socialLinks = useMemo(() => [
    {
      href: "https://facebook.com/alarabiacarpets",
      icon: Facebook,
      label: "Facebook"
    },
    {
      href: "https://instagram.com/alarabiacarpet",
      icon: Instagram,
      label: "Instagram"
    }
  ], []);

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
                {contactInfo.map((contact, index) => {
                  const IconComponent = contact.icon;
                  return (
                    <a
                      key={index}
                      href={contact.href}
                      {...(contact.external && { target: "_blank", rel: "noopener noreferrer" })}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors group"
                    >
                      <div className={`${contact.bgColor} p-2 rounded-full group-hover:scale-110 transition-transform`}>
                        <IconComponent size={18} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-poppins font-medium text-white">{contact.title}</p>
                        <p className="font-poppins text-sm text-white/70">{contact.subtitle}</p>
                      </div>
                      {contact.external && <ExternalLink size={16} className="text-white/50" />}
                    </a>
                  );
                })}
              </div>

              {/* Social Media Links */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="font-poppins text-sm text-white/70 mb-3">Follow us on social media:</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors group"
                        aria-label={social.label}
                      >
                        <IconComponent size={20} className="text-white group-hover:scale-110 transition-transform" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form Card */}
          <Card className="shadow-xl">
            <CardContent className="p-6">
              <h3 className="font-playfair text-xl font-semibold text-white mb-4">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} name="contact" method="POST" data-netlify="true" className="space-y-4">
                <input type="hidden" name="form-name" value="contact" />
                
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={name}
                    onChange={handleNameChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                  />
                </div>
                
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                  />
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={message}
                    onChange={handleMessageChange}
                    required
                    rows={4}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 resize-none"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    name="newsletter"
                    checked={newsletterSignup}
                    onCheckedChange={handleNewsletterChange}
                    className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-primary"
                  />
                  <label htmlFor="newsletter" className="font-poppins text-sm text-white/80 cursor-pointer">
                    Subscribe to our newsletter for updates and offers
                  </label>
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-primary hover:bg-white/90 font-poppins font-medium py-3 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
              
              {submitted && (
                <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <p className="font-poppins text-sm text-white text-center">
                    Thank you! We'll get back to you soon.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="text-center mt-12">
          <p className="font-poppins text-white/80 mb-4">Need immediate assistance?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="bg-white text-primary hover:bg-white/90 font-poppins font-medium">
              <a href="https://wa.me/+97455512858" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <MessageCircle size={18} />
                Chat on WhatsApp
                <ExternalLink size={14} />
              </a>
            </Button>
            <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 font-poppins font-medium">
              <a href="tel:+97455512858" className="flex items-center gap-2">
                <Phone size={18} />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ContactSection;
