import { Info } from "lucide-react";
import type { LabValue } from "@/lib/medicalTerms";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LabValueCardProps {
  labValue: LabValue;
}

const LabValueCard = ({ labValue }: LabValueCardProps) => {
  const { name, value, unit, normalRange, status, explanation, category } = labValue;
  
  const statusColors = {
    normal: {
      bg: "bg-health-normal-bg",
      text: "text-health-normal",
      bar: "bg-health-normal",
      badge: "bg-health-normal/10 text-health-normal",
    },
    warning: {
      bg: "bg-health-warning-bg",
      text: "text-health-warning",
      bar: "bg-health-warning",
      badge: "bg-health-warning/10 text-health-warning",
    },
    critical: {
      bg: "bg-health-critical-bg",
      text: "text-health-critical",
      bar: "bg-health-critical",
      badge: "bg-health-critical/10 text-health-critical",
    },
  };

  const colors = statusColors[status];
  
  // Calculate position percentage for the marker
  const rangeSpan = normalRange.max - normalRange.min;
  const extendedMin = normalRange.min - rangeSpan * 0.3;
  const extendedMax = normalRange.max + rangeSpan * 0.3;
  const totalSpan = extendedMax - extendedMin;
  
  const markerPosition = Math.max(0, Math.min(100, ((value - extendedMin) / totalSpan) * 100));
  const normalStartPos = ((normalRange.min - extendedMin) / totalSpan) * 100;
  const normalEndPos = ((normalRange.max - extendedMin) / totalSpan) * 100;

  return (
    <div className={`rounded-xl border border-border/50 bg-card p-5 shadow-soft transition-all duration-300 hover:shadow-medium`}>
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">{category}</span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors.badge}`}>
              {status === "normal" ? "Normal" : status === "warning" ? "Attention" : "Review"}
            </span>
          </div>
          <h3 className="text-base font-semibold text-foreground">{name}</h3>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <Info className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs">
              <p className="text-sm">{explanation}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-1">
          <span className={`text-3xl font-bold ${colors.text}`}>{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
      </div>

      {/* Visual range indicator */}
      <div className="relative h-3 rounded-full bg-muted">
        {/* Normal range indicator */}
        <div 
          className="absolute top-0 h-full rounded-full bg-health-normal/20"
          style={{ 
            left: `${normalStartPos}%`,
            width: `${normalEndPos - normalStartPos}%`
          }}
        />
        
        {/* Value marker */}
        <div 
          className={`absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card ${colors.bar} shadow-medium`}
          style={{ left: `${markerPosition}%` }}
        />
      </div>
      
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>{normalRange.min} {unit}</span>
        <span>Normal Range</span>
        <span>{normalRange.max} {unit}</span>
      </div>
    </div>
  );
};

export default LabValueCard;
