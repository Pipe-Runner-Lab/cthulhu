import { motion, AnimatePresence } from "framer-motion";
import React, { useContext, useState } from "react";
import useStore from "../../store";
import { HiOutlineMenu as OpenIcon } from "react-icons/hi";
import PrimaryHeader from "./components/PrimaryHeader";
import { PyodideContext } from "../../providers/Pyodide";
import InputControls from "./components/InputControls";
import Input from "../Input/Input";
import { PlayerControls } from "./components/PlayerControls";
import {
  FaPlay as PlayIcon,
  FaPause as PauseIcon,
  FaStop as ResetIcon,
} from "react-icons/fa";
import { computeSimulation } from "../../utils/compute-async";
import script from "../../python/simulator.py";
import { extractScriptText } from "../../utils/script-text";

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

  const [isComputing, setIsComputing] = useState(false);
  const animating = useStore((state) => state.animating);
  const setAnimating = useStore((state) => state.setAnimating);
  const force = useStore((state) => state.force);
  const setForce = useStore((state) => state.setForce);

  const { asyncRun } = useContext(PyodideContext);

  return (
    <motion.div
      variants={menuVariants}
      animate={isMenuOpen ? "open" : "closed"}
      transition={{
        duration: 0.3,
        type: "tween",
      }}
      initial="closed"
      className="absolute flex flex-col w-1/4 min-w-[360px] max-w-md bg-white rounded-md shadow-md min-w-sm top-2 right-2 backdrop-blur-sm bg-opacity-70"
    >
      <AnimatePresence>
        {!isMenuOpen && (
          <motion.div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="shadow-md bg-blue-300 w-10 h-10 rounded-md absolute top-[0.5rem] left-0 translate-x-[calc(-100%-1rem)] flex items-center justify-center"
              onClick={() => setIsMenuOpen(true)}
            >
              <OpenIcon size={26} />
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="shadow-md bg-gray-300 w-10 h-10 rounded-md absolute top-[0.5rem] left-0 translate-x-[calc(-100%-1rem)] translate-y-[calc(100%+1rem)] flex items-center justify-center"
              onClick={() => {
                setAnimating(!animating);
              }}
            >
              {animating ? <PauseIcon size={26} /> : <PlayIcon size={26} />}
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="shadow-md bg-red-300 w-10 h-10 rounded-md absolute top-[0.5rem] left-0 translate-x-[calc(-100%-1rem)] translate-y-[calc(200%+2rem)] flex items-center justify-center"
            >
              <ResetIcon size={26} />
            </motion.button>
          </motion.div>
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

          <InputControls
            isDisabled={isComputing}
            // computeSimulation={() =>
            //   !isPyodideLoading &&
            //   computeSimulation(
            //     pyodide,
            //     {
            //       force,
            //     },
            //     () => setIsComputing(true),
            //     ({ state_time, index_skip }) => {
            //       setIndexSkip(index_skip);
            //       setSimulationData(state_time);
            //       setIsComputing(false);
            //     }
            //   )
            // }
            computeSimulation={async () => {
              const code = await extractScriptText(script);

              const context = {
                force_x: force.x,
                force_y: force.y,
              }
              const { variables, error } = await asyncRun(code, context);
              console.log(variables, error);
            }}
          />

          <PlayerControls />
        </div>
      </div>
    </motion.div>
  );
}

export default EditorPanel;
