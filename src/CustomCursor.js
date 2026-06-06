import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Snappier, cooler spring effect
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest("a, button, [data-cursor]");
      if (target) {
        setIsHovering(true);
        if (target.dataset.cursor) {
          setHoverText(target.dataset.cursor);
        } else if (target.tagName.toLowerCase() === "a") {
          setHoverText("VIEW");
        } else {
          setHoverText("");
        }
      } else {
        setIsHovering(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  return (
    <>
      <style>{`
        * { cursor: none !important; }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference flex items-center justify-center rounded-full overflow-hidden"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          border: isHovering ? "1px solid rgba(255,255,255,0.2)" : "none"
        }}
        initial={{ width: 12, height: 12, backgroundColor: "rgba(255,255,255,1)" }}
        animate={{
          width: isHovering && hoverText ? 90 : isHovering ? 60 : 12,
          height: isHovering && hoverText ? 90 : isHovering ? 60 : 12,
          backgroundColor: isHovering ? "rgba(255,255,255,1)" : "rgba(255,255,255,1)",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isHovering && hoverText ? 1 : 0, scale: isHovering && hoverText ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
          className="text-[10px] font-bold text-black tracking-widest whitespace-nowrap uppercase"
        >
          {hoverText}
        </motion.span>
      </motion.div>
    </>
  );
};

export default CustomCursor;
