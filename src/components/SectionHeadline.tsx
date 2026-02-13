import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface SectionHeadlineProps {
  children: React.ReactNode;
  className?: string;
}

const SectionHeadline = ({ children, className = "" }: SectionHeadlineProps) => {
  const { ref, isVisible } = useScrollAnimation(0.3);

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
        {children}
      </h2>
      <div
        className={`mt-3 mx-auto h-[3px] rounded-full bg-primary transition-all duration-700 ease-out ${
          isVisible ? "w-16 opacity-100" : "w-0 opacity-0"
        }`}
      />
    </div>
  );
};

export default SectionHeadline;
