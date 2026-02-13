import { UtensilsCrossed } from "lucide-react";

const SectionDivider = () => {
  return (
    <div className="flex items-center justify-center gap-4 py-2">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" />
      <UtensilsCrossed size={16} className="text-primary/50" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" />
    </div>
  );
};

export default SectionDivider;
