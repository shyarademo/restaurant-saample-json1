import { useRef, useState, ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const GlowCard = ({ children, className = "", style }: GlowCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${className}`}
      style={{
        ...style,
        background: isHovered
          ? `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, hsl(36 95% 50% / 0.08) 0%, transparent 60%)`
          : undefined,
      }}
    >
      {children}
    </div>
  );
};

export default GlowCard;
