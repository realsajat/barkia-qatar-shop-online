
import { Whatsapp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsappButton() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button
        size="lg"
        className="rounded-full bg-green-600 hover:bg-green-700 shadow-lg p-4 h-14 w-14 flex items-center justify-center"
        asChild
      >
        <a
          href="https://wa.me/+97455512858"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
        >
          <Whatsapp size={24} />
        </a>
      </Button>
    </div>
  );
}
