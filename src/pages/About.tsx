
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="bg-primary text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-4">About Al Arabia Carpets</h1>
            <p className="font-poppins max-w-2xl mx-auto">
              Learn more about our company and commitment to quality home furnishings in Qatar.
            </p>
          </div>
        </div>

        {/* About Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-6">Our Story</h2>
                <p className="font-poppins mb-4">
                Al Arabia Carpets was founded with a vision to bring premium home furnishing solutions to Qatar. 
                  We specialize in providing high-quality products including Barkia, PVC barkia, carpets, rollers, 
                  sofas, majlis sets, curtains, and grass carpets.
                </p>
                <p className="font-poppins mb-4">
                  What sets us apart is our commitment to quality, customer satisfaction, and our comprehensive 
                  service package that includes free installation, delivery, and expert consultation.
                </p>
                <p className="font-poppins">
                  Over the years, we've built a reputation for excellence in Qatar, serving both residential 
                  and commercial clients with products that blend functionality, durability, and aesthetic appeal.
                </p>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 rounded-full overflow-hidden bg-secondary">
                    <AspectRatio ratio={1/1} className="w-full h-full">
                      <img 
                        src="/About Al Arabia Carpets.svg" 
                        alt="Al Arabia Carpets shopfront" 
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-4">Our Values</h2>
              <p className="font-poppins max-w-2xl mx-auto">
                The principles that guide everything we do at Barkia Qatar.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center h-full">
                <h3 className="font-playfair text-xl font-semibold mb-3">Quality</h3>
                <p className="font-poppins text-muted-foreground">
                  We never compromise on the quality of our products, sourcing only the best materials and designs.
                </p>
              </Card>
              
              <Card className="p-6 text-center h-full">
                <h3 className="font-playfair text-xl font-semibold mb-3">Customer Satisfaction</h3>
                <p className="font-poppins text-muted-foreground">
                  Your satisfaction is our priority. We go the extra mile to ensure you're happy with your purchase.
                </p>
              </Card>
              
              <Card className="p-6 text-center h-full">
                <h3 className="font-playfair text-xl font-semibold mb-3">Excellence</h3>
                <p className="font-poppins text-muted-foreground">
                  From product selection to installation, we strive for excellence in every aspect of our service.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-4">Why Choose Al Arabia Carpets</h2>
              <p className="font-poppins max-w-2xl mx-auto">
                Discover what makes our products and services stand out in Qatar.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="font-playfair text-xl font-semibold mb-3">Premium Products</h3>
                <p className="font-poppins text-muted-foreground">
                  All our products are carefully selected for their quality, durability, and design appeal.
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-playfair text-xl font-semibold mb-3">Free Services</h3>
                <p className="font-poppins text-muted-foreground">
                  Enjoy free installation, delivery, and expert consultation with every purchase.
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-playfair text-xl font-semibold mb-3">Wide Selection</h3>
                <p className="font-poppins text-muted-foreground">
                  From Barkia to majlis sofas, we offer a comprehensive range of home furnishing solutions.
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-playfair text-xl font-semibold mb-3">Customer Support</h3>
                <p className="font-poppins text-muted-foreground">
                  Our responsive customer service team is always ready to assist you via WhatsApp.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
            <p className="font-poppins max-w-2xl mx-auto mb-8">
              Contact us today to discuss your home furnishing needs and discover how we can help.
            </p>
            <a 
              href="https://wa.me/+97455512858" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white text-primary rounded-md hover:bg-white/90 transition-colors font-poppins font-medium"
            >
              Contact Us on WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  );
};

export default About;
