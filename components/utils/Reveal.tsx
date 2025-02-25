import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";

interface Props {
  children: JSX.Element;
  width?: "fit-content" | "100%";
}

export const Reveal = ({ children, width = "fit-content" }: Props) => {
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      slideControls.start("visible");
      mainControls.start("visible");
    } else {
      slideControls.start("hidden");
      mainControls.start("hidden");
    }
  }, [isInView, mainControls, slideControls]);

  const variants: Variants = {
    hidden: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0 },
  };

  const slideVariants: Variants = {
    hidden: { left: 0 },
    visible: { left: "100%" },
  };

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={slideVariants}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.5, ease: "easeIn" }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          background: "var(--primary)",
          zIndex: 20,
        }}
      />
    </div>
  );
};
