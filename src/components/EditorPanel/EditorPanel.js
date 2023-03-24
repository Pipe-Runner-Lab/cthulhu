import { motion, AnimatePresence } from "framer-motion";
import React, { useContext } from "react";
import useStore from "../../store";
import { HiOutlineMenu as OpenIcon } from "react-icons/hi";
import PrimaryHeader from "./components/PrimaryHeader";
import { PyodideContext } from "../../providers/Pyodide";
import script from "../../python/simulator.py";
import { extractScriptText } from "../../utils/script-text";
import SimulationControls from "./components/SimulationControls";

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

  const { pyodide, isPyodideLoading } = useContext(PyodideContext);

  const computeSimulation = async () => {
    if (!isPyodideLoading) {
      window.simulator_input = {
        x: 0,
        y: 0,
      };

      const code = await extractScriptText(script);
      await pyodide.runPythonAsync(code);

      console.log(pyodide.globals.get("output").toJs());
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
        <div className="flex flex-col p-2 space-y-2 border border-gray-400 border-solid rounded-md min-h-[60%]">
          <div className="flex items-center justify-center w-full py-1 rounded-sm bg-violet-300">
            Simulation Controls
          </div>
          <div className="flex items-center justify-center flex-1">
            {/* {heatData.length > 0 ? (
                <Heatmap
                  xField="x"
                  yField="z"
                  colorField="value"
                  data={heatData}
                  {...heatConfig}
                />
              ) : (
                <div>
                  {simulationState === "play"
                    ? "Collecting data..."
                    : "Start computation to collect data"}
                </div>
              )} */}
          </div>
          <SimulationControls computeSimulation={computeSimulation} />
        </div>
      </div>
    </motion.div>
  );
}

export default EditorPanel;
