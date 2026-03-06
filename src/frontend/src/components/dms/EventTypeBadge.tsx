import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Gauge, Navigation } from "lucide-react";

interface EventTypeBadgeProps {
  type: "speedViolation" | "hardBraking" | "laneDeparture";
  className?: string;
}

export default function EventTypeBadge({
  type,
  className,
}: EventTypeBadgeProps) {
  const config = {
    speedViolation: {
      label: "Speed",
      icon: Gauge,
      variant: "destructive" as const,
    },
    hardBraking: {
      label: "Braking",
      icon: AlertTriangle,
      variant: "default" as const,
    },
    laneDeparture: {
      label: "Lane",
      icon: Navigation,
      variant: "secondary" as const,
    },
  };

  const { label, icon: Icon, variant } = config[type];

  return (
    <Badge variant={variant} className={className}>
      <Icon className="h-3 w-3 mr-1" />
      {label}
    </Badge>
  );
}
