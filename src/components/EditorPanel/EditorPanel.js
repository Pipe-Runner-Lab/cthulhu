import { motion, AnimatePresence } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
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
import {
  IoTelescopeOutline as TopDownIcon,
  IoExpandOutline as PanIcon,
  IoVideocamOutline as PerspectiveIcon,
} from "react-icons/io5";
import { GoGraph as GraphIcon } from "react-icons/go";
import { GiPathDistance as PathIcon } from "react-icons/gi";
import script from "../../python/simulator.py";
import { extractScriptText } from "../../utils/script-text";
import { Button } from "./components/Button";

const menuVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: "calc(100% + 0.5rem)",
  },
};

function EditorPanel() {
  const { asyncRun } = useContext(PyodideContext);

  const isMenuOpen = useStore((state) => state.isMenuOpen);
  const setIsMenuOpen = useStore((state) => state.setIsMenuOpen);
  const setSimulationData = useStore((state) => state.setSimulationData);

  const animating = useStore((state) => state.animating);
  const setAnimating = useStore((state) => state.setAnimating);
  const isComputing = useStore((state) => state.isComputing);
  const cameraType = useStore((state) => state.cameraType);
  const toggleCameraType = useStore((state) => state.toggleCameraType);
  const showGraph = useStore((state) => state.showGraph);
  const toggleShowGraph = useStore((state) => state.toggleShowGraph);
  const showPath = useStore((state) => state.showPath);
  const toggleShowPath = useStore((state) => state.toggleShowPath);

  const computeSimulation = async () => {
    setSimulationData(null);
    const code = await extractScriptText(script);

    const context = {
      force_x: force.x,
      force_y: force.y,
    };

    const {
      variables: { output },
      error,
    } = await asyncRun(code, context);

    if (error) console.error(error);

    setSimulationData(output);
  };

  useEffect(() => {
    computeSimulation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onReset = () => {
    setAnimating(false);
  };

  const [force, setForce] = useState({
    x: 1,
    y: -1,
  });

  return (
    <motion.div
      variants={menuVariants}
      animate={isMenuOpen ? "open" : "closed"}
      transition={{
        duration: 0.3,
        type: "tween",
      }}
      initial="closed"
      className="absolute flex flex-col w-[340px] bg-white rounded-md shadow-md min-w-sm top-2 right-2 backdrop-blur-sm bg-opacity-70"
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
              disabled={isComputing}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="shadow-md bg-gray-300 w-10 h-10 rounded-md absolute top-[0.5rem] left-0 translate-x-[calc(-100%-1rem)] translate-y-[calc(100%+1rem)] flex items-center justify-center"
              onClick={() => {
                setAnimating(!animating);
              }}
            >
              {animating ? (
                <PauseIcon size={26} color={isComputing ? "grey" : "black"} />
              ) : (
                <PlayIcon size={26} color={isComputing ? "grey" : "black"} />
              )}
            </motion.button>
            <motion.button
              disabled={isComputing}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="shadow-md bg-red-300 w-10 h-10 rounded-md absolute top-[0.5rem] left-0 translate-x-[calc(-100%-1rem)] translate-y-[calc(200%+2rem)] flex items-center justify-center"
            >
              <ResetIcon size={26} color={isComputing ? "grey" : "black"} />
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
            computeSimulation={computeSimulation}
          />

          <PlayerControls isDisabled={isComputing} />
        </div>

        <div className="flex flex-col p-2 space-y-2 border border-gray-400 border-solid rounded-md">
          <div className="flex space-x-1">
            <Button onClick={toggleCameraType}>
              {cameraType === "pan" && <PanIcon size={26} color="black" />}
              {cameraType === "top-down" && (
                <TopDownIcon size={26} color="black" />
              )}
              {cameraType === "perspective" && (
                <PerspectiveIcon size={26} color="black" />
              )}
            </Button>
            <Button onClick={toggleShowGraph}>
              <GraphIcon size={26} color={showGraph ? "black" : "grey"} />
            </Button>
            <Button onClick={toggleShowPath}>
              <PathIcon size={26} color={showPath ? "black" : "grey"} />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default EditorPanel;
