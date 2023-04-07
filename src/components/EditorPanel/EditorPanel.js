import { motion, AnimatePresence } from "framer-motion";
import React, { useContext, useState } from "react";
import useStore from "../../store";
import { HiOutlineMenu as OpenIcon } from "react-icons/hi";
import PrimaryHeader from "./components/PrimaryHeader";
import { PyodideContext } from "../../providers/Pyodide";
import script from "../../python/simulator.py";
import { extractScriptText } from "../../utils/script-text";
import SimulationControls from "./components/SimulationControls";
import Input from "../Input/Input";

const menuVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: "calc(100% + 0.5rem)",
  },
};

function EditorPanel() {
  const isMenuOpen = useStore((state) => state.isMenuOpen);
  const setIsMenuOpen = useStore((state) => state.setIsMenuOpen);
  const setSimulationData = useStore((state) => state.setSimulationData);
  const setIndexSkip = useStore((state) => state.setIndexSkip);
  const animating = useStore((state) => state.animating);
  const setAnimating = useStore((state) => state.setAnimating);

  const [isComputing, setIsComputing] = useState(false);

  const { pyodide, isPyodideLoading } = useContext(PyodideContext);

  const [force, setForce] = useState({
    x: 1,
    y: -1,
  });

  const computeSimulation = async () => {
    setIsComputing(true);

    if (!isPyodideLoading) {
      window.simulator_input = { force };

      const code = await extractScriptText(script);
      await pyodide.runPythonAsync(code);

      setSimulationData(pyodide.globals.get("state_time").toJs());
      setIndexSkip(pyodide.globals.get("index_skip"));

      setIsComputing(false);
    }
  };

  return (
    <motion.div
      variants={menuVariants}
      animate={isMenuOpen ? "open" : "closed"}
      transition={{
        duration: 0.3,
        type: "tween",
      }}
      initial="closed"
      className="absolute flex flex-col w-1/4 min-w-[360px] max-w-md bg-white rounded-md shadow-md min-w-sm top-2 bottom-2 right-2 backdrop-blur-sm bg-opacity-90"
    >
      <AnimatePresence>
        {!isMenuOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="shadow-md bg-blue-300 w-10 h-10 rounded-md absolute top-[0.5rem] left-0 translate-x-[calc(-100%-1rem)] flex items-center justify-center"
            onClick={() => setIsMenuOpen(true)}
          >
            <OpenIcon size={26} />
          </motion.button>
        )}
      </AnimatePresence>
      {/* Primary Panel content */}
      <div className="w-full p-2">
        <PrimaryHeader />
      </div>

      <div className="h-[1px] w-auto mx-2 bg-gray-300" />

      <div className="flex flex-col flex-1 p-2 space-y-2 overflow-auto">
        <div className="flex flex-col p-2 space-y-2 border border-gray-400 border-solid rounded-md">
          <div className="flex items-center justify-center w-full py-1 rounded-sm bg-violet-300">
            Simulation Controls
          </div>
          <div className="">
            <Input
              value={force.x}
              onChange={(value) => setForce({ x: value, ...force })}
            />

            <Input
              value={force.y}
              onChange={(value) => setForce({ y: value, ...force })}
            />
          </div>
          <SimulationControls computeSimulation={computeSimulation} />
        </div>

        <div>
          <button
            onClick={() => {
              setAnimating(true);
            }}
          >
            {animating ? "Stop" : "Play"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default EditorPanel;
