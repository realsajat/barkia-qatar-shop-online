
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Phone, MapPin, Facebook, Instagram, Send } from "lucide-react";
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
          title: "Message sent successfully!",
          description: `Thank you ${name}, we'll get back to you soon.`,
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
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h2>
          <p className="font-poppins text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to transform your space? Let's discuss your project and bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="mb-8">
                <h3 className="font-playfair text-2xl font-semibold text-gray-900 mb-3">
                  Contact Information
                </h3>
                <p className="font-poppins text-gray-600 leading-relaxed">
                  Our team is here to help you with any questions about our premium products and services.
                </p>
              </div>

              <div className="space-y-6">
                {/* WhatsApp */}
                <div className="flex items-center gap-4 group/item">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
                    <Phone size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-poppins font-medium text-gray-900">WhatsApp</p>
                    <p className="font-poppins text-gray-600">+974 5551 2858</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 group/item">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover/item:bg-blue-200 transition-colors">
                    <MapPin size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-poppins font-medium text-gray-900">Visit Our Showroom</p>
                    <p className="font-poppins text-gray-600">Al Mansoura St, Doha, Qatar</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="pt-4 border-t border-gray-100">
                  <p className="font-poppins font-medium text-gray-900 mb-4">Follow Us</p>
                  <div className="flex gap-4">
                    <a
                      href="https://facebook.com/alarabiacarpets"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Facebook size={18} className="text-blue-600" />
                    </a>
                    <a
                      href="https://instagram.com/alarabiacarpet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-pink-100 hover:bg-pink-200 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Instagram size={18} className="text-pink-600" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700 text-white h-12 rounded-xl font-poppins font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <a
                    href="https://wa.me/+97455512858"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <span>Start a Conversation</span>
                    <ExternalLink size={18} />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Message Form Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              {!submitted ? (
                <>
                  <div className="mb-8">
                    <h3 className="font-playfair text-2xl font-semibold text-gray-900 mb-3">
                      Send us a Message
                    </h3>
                    <p className="font-poppins text-gray-600 leading-relaxed">
                      Tell us about your project and we'll get back to you within 24 hours.
                    </p>
                  </div>

                  <form
                    name="helpdesk"
                    method="POST"
                    data-netlify="true"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <input type="hidden" name="form-name" value="helpdesk" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl font-poppins"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl font-poppins"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your project or ask any questions..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="min-h-[120px] border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl font-poppins resize-none"
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="newsletter"
                        name="newsletter"
                        checked={newsletterSignup}
                        onCheckedChange={(checked) => setNewsletterSignup(checked as boolean)}
                        className="mt-1 data-[state=checked]:bg-primary border-gray-300"
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
                      className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-xl font-poppins font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send size={18} />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send size={24} className="text-green-600" />
                  </div>
                  <h3 className="font-playfair text-2xl font-semibold text-gray-900 mb-3">
                    Message Sent Successfully!
                  </h3>
                  <p className="font-poppins text-gray-600 leading-relaxed">
                    Thank you for reaching out. We'll review your message and get back to you within 24 hours.
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
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
