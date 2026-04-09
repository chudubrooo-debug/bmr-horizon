import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { LucideIcon } from "lucide-react";

interface ServiceDetail {
  icon: LucideIcon;
  title: string;
  desc: string;
  details: string[];
}

interface Props {
  service: ServiceDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ServiceModal = ({ service, open, onOpenChange }: Props) => {
  if (!service) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg glass-card">
        <DialogHeader>
          <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-3">
            <service.icon size={26} className="text-primary-foreground" />
          </div>
          <DialogTitle className="text-xl font-display">{service.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{service.desc}</DialogDescription>
        </DialogHeader>
        <ul className="space-y-3 mt-4">
          {service.details.map((d, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full gradient-bg mt-2 flex-shrink-0" />
              <span className="text-sm text-foreground/80">{d}</span>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;
