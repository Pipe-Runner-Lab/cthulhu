import React from "react";
import { motion } from "framer-motion";
import useStore from "../../store";

const panelVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: "calc(-100% - 0.5rem)",
  },
};

export default function GraphPanel() {
  const isMenuOpen = useStore((state) => state.isMenuOpen);

  return (
    <motion.div
      variants={panelVariants}
      animate={isMenuOpen ? "open" : "closed"}
      transition={{
        duration: 0.3,
        type: "tween",
      }}
      initial="closed"
      className="absolute flex flex-col w-1/4 min-w-[360px] max-w-md bg-white rounded-md shadow-md min-w-sm top-2 bottom-2 left-2 backdrop-blur-sm bg-opacity-70"
    >
      
    </motion.div>
  );
}
