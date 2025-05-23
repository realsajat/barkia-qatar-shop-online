
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information Card */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-accent to-accent/80 px-8 py-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Phone size={24} className="text-white" />
                  </div>
                  <h3 className="font-playfair text-2xl font-semibold text-white">Contact Information</h3>
                </div>
                <p className="font-poppins text-white/90">
                  Connect with us through any of these channels
                </p>
              </div>
              
              <div className="p-8 space-y-6">
                {/* WhatsApp */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors group">
                  <div className="bg-green-500 p-3 rounded-full group-hover:scale-110 transition-transform">
                    <MessageCircle size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-poppins font-semibold text-gray-800">WhatsApp</p>
                    <p className="font-poppins text-sm text-gray-600">+974 5551 2858</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group">
                  <div className="bg-blue-500 p-3 rounded-full group-hover:scale-110 transition-transform">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-poppins font-semibold text-gray-800">Email</p>
                    <p className="font-poppins text-sm text-gray-600">info@alarabiacarpets.com</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                  <div className="bg-gray-500 p-3 rounded-full group-hover:scale-110 transition-transform">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-poppins font-semibold text-gray-800">Location</p>
                    <p className="font-poppins text-sm text-gray-600">Al Mansoura St, Doha, Qatar</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <a
                    href="https://facebook.com/alarabiacarpets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group"
                  >
                    <div className="bg-blue-600 p-2 rounded-full group-hover:scale-110 transition-transform">
                      <Facebook size={16} className="text-white" />
                    </div>
                    <span className="font-poppins text-sm font-medium text-gray-700">Facebook</span>
                  </a>
                  
                  <a
                    href="https://instagram.com/alarabiacarpet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-pink-50 hover:bg-pink-100 transition-colors group"
                  >
                    <div className="bg-pink-600 p-2 rounded-full group-hover:scale-110 transition-transform">
                      <Instagram size={16} className="text-white" />
                    </div>
                    <span className="font-poppins text-sm font-medium text-gray-700">Instagram</span>
                  </a>
                </div>

                <div className="pt-4">
                  <Button
                    asChild
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-poppins font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <a
                      href="https://wa.me/+97455512858"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2"
                    >
                      <MessageCircle size={20} />
                      <span>Chat on WhatsApp</span>
                      <ExternalLink size={16} />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form Card */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-accent to-accent/80 px-8 py-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Mail size={24} className="text-white" />
                  </div>
                  <h3 className="font-playfair text-2xl font-semibold text-white">Send us a Message</h3>
                </div>
                <p className="font-poppins text-white/90">
                  Get a quick response from our team
                </p>
              </div>

              <div className="p-8">
                {!submitted ? (
                  <form
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 font-poppins">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent focus:ring-0 font-poppins transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 font-poppins">
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
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent focus:ring-0 font-poppins transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 font-poppins">
                        Your Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your project or ask any questions..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent focus:ring-0 font-poppins resize-none transition-colors"
                      />
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="newsletter"
                        name="newsletter"
                        checked={newsletterSignup}
                        onCheckedChange={(checked) => setNewsletterSignup(checked as boolean)}
                        className="mt-1 data-[state=checked]:bg-accent border-gray-300"
                      />
                      <label
                        htmlFor="newsletter"
                        className="text-sm font-poppins text-gray-600 cursor-pointer leading-relaxed"
                      >
                        Subscribe to our newsletter for exclusive offers, design tips, and product updates
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-accent hover:bg-accent/90 text-white font-poppins font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending Message...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Mail size={20} />
                          <span>Send Message</span>
                        </div>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <Mail size={40} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 font-playfair mb-3">Message Sent!</h3>
                    <p className="text-gray-600 font-poppins leading-relaxed">
                      Thank you for reaching out. We've received your message and will get back to you within 24 hours.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      className="mt-6 font-poppins"
                    >
                      Send Another Message
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
