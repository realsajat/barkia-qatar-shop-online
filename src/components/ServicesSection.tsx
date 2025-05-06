
import { TruckIcon, Phone, Ruler } from "lucide-react";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  const services = [
    {
      title: "Free Delivery",
      description: "We deliver all our products to your doorstep anywhere in Qatar at no extra cost.",
      icon: <TruckIcon size={36} className="text-primary" />
    },
    {
      title: "Free Installation",
      description: "Our professional team will install all products to ensure perfect fit and finish.",
      icon: <Ruler size={36} className="text-primary" />
    },
    {
      title: "Expert Consultation",
      description: "Get personalized advice from our experts to find the perfect solutions for your space.",
      icon: <Phone size={36} className="text-primary" />
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="font-poppins text-muted-foreground max-w-2xl mx-auto">
            We go beyond just selling products. Enjoy these complimentary services with every purchase.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
