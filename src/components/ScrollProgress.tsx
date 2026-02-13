import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-primary origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgress;
