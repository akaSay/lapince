import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

type AnimatedNumberProps = {
  value: number;
  suffix?: string;
};

export const AnimatedNumber = ({ value, suffix = "" }: AnimatedNumberProps) => {
  const count = useMotionValue(0);
  const displayValue = useTransform(count, (latest) =>
    Math.round(latest).toString()
  );

  useEffect(() => {
    const animation = animate(count, value, { duration: 2 });
    return animation.stop;
  }, [count, value]);

  return (
    <motion.span>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </motion.span>
  );
};
