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
          title: "Form submitted!",
          description: `Thank you ${name}, we will contact you soon.`,
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
          description: "Please try again later.",
        });
      })
      .finally(() => setIsSubmitting(false));
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
          {/* Left Contact Card */}
          <Card className="bg-white text-primary">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="font-playfair text-2xl font-semibold mb-2">Get in Touch</h3>
                <p className="font-poppins text-muted-foreground">
                  Our team is ready to assist you with any questions about our products and services.
                </p>
              </div>
              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-poppins font-medium">WhatsApp</p>
                    <p className="font-poppins text-sm text-muted-foreground">+974 5551 2858</p>
                  </div>
                </div>
                {/* Location */}
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-poppins font-medium">Location</p>
                    <p className="font-poppins text-sm text-muted-foreground">Al Mansoura St, Doha, Qatar</p>
                  </div>
                </div>
                {/* Facebook */}
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Facebook size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-poppins font-medium">Facebook</p>
                    <a
                      href="https://facebook.com/alarabiacarpets"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-poppins text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      facebook.com/alarabiacarpets
                    </a>
                  </div>
                </div>
                {/* Instagram */}
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

          {/* Right Form */}
          <Card className="bg-white text-primary overflow-hidden border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="bg-accent/5 py-5 px-8 border-b border-accent/10 text-center">
                <h3 className="font-playfair text-2xl font-semibold">Helpdesk</h3>
              </div>
              {!submitted ? (
                <form
                  name="helpdesk"
                  method="POST"
                  data-netlify="true"
                  onSubmit={handleSubmit}
                  className="space-y-4 pt-6"
                >
                  <input type="hidden" name="form-name" value="helpdesk" />
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1 font-poppins">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
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
                      name="email"
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
                      name="message"
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
                      name="newsletter"
                      checked={newsletterSignup}
                      onCheckedChange={(checked) => setNewsletterSignup(checked as boolean)}
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
                </form>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-bold text-accent">Thank you!</h3>
                  <p className="text-muted-foreground mt-2">
                    Your message has been sent. We'll be in touch soon.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
