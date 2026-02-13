import { useState } from "react";

interface ShimmerImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
}

const ShimmerImage = ({ wrapperClassName = "", className = "", ...props }: ShimmerImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!loaded && (
        <div className="absolute inset-0 shimmer bg-secondary" />
      )}
      <img
        {...props}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={(e) => {
          setLoaded(true);
          props.onLoad?.(e);
        }}
      />
    </div>
  );
};

export default ShimmerImage;
