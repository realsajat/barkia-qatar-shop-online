import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";
import ContactSection from "@/components/ContactSection";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className="font-poppins max-w-2xl mx-auto">
              We'd love to hear from you. Reach out via WhatsApp, email, or visit us in Doha.
            </p>
          </div>
        </div>
        <ContactSection />
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  );
};

export default Contact;

