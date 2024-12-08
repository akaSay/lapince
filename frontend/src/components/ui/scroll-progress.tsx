import { motion, useScroll } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-1 origin-left bg-blue-500"
      style={{ scaleX: scrollYProgress }}
    />
  );
};
