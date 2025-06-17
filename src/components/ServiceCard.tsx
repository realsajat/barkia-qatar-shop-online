
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-2xl hover:scale-105 h-full">
      <CardContent className="p-6 flex flex-col items-center text-center h-full">
        <div className="mb-4 text-primary">
          {icon}
        </div>
        <h3 className="font-playfair text-lg font-semibold mb-3">{title}</h3>
        <p className="font-poppins text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
