import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
} from "framer-motion";
import PixelSnow from "./PixelSnow";

export const InfiniteGrid = ({ children, className }) => {
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.25) % 40);
    gridOffsetY.set((gridOffsetY.get() + 0.25) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative w-full min-h-screen flex flex-col overflow-hidden bg-background",
        className
      )}
    >
      {/* Pixel Snow layer */}
      <div className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
        <PixelSnow
          color="#4ade80"
          speed={0.4}
          density={0.15}
          brightness={0.6}
          pixelResolution={180}
          flakeSize={0.008}
          minFlakeSize={1.0}
          depthFade={10}
          farPlane={18}
          direction={130}
          variant="round"
        />
      </div>

      {/* Static subtle grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>

      {/* Mouse-reveal grid */}
      <motion.div
        className="absolute inset-0 z-0 opacity-20"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      {/* Warm ambient glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute right-[-15%] top-[-15%] w-[35%] h-[35%] rounded-full bg-green-500/8 blur-[100px]" />
        <div className="absolute left-[-10%] bottom-[-15%] w-[30%] h-[30%] rounded-full bg-green-600/5 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1">
        {children}
      </div>
    </div>
  );
};

const GridPattern = ({ offsetX, offsetY }) => {
  return (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern
          id="grid-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-foreground"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
};

export default InfiniteGrid;
