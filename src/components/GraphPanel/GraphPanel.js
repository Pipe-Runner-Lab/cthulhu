import React, { useState } from "react";
import { motion } from "framer-motion";
import useStore from "../../store";
import { MeasurementGraph } from "./graphs/MeasurementGraph";
import Select from "react-select";
import { EstimateGraph } from "./graphs/EstimateGraph";

const panelVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: "calc(-100% - 0.5rem)",
  },
};

const options = [
  { value: "sensor", label: "Sensor Data" },
  { value: "estimated-global", label: "Estimated Global Parameters" },
  { value: "estimated-local", label: "Estimated Local Parameters" },
  { value: "estimated-fault", label: "Estimated Fault Parameters" },
];

export default function GraphPanel() {
  const [selectedOption, setSelectedOption] = useState("sensor");
  const isMenuOpen = useStore((state) => state.isMenuOpen);

  return (
    <motion.div
      variants={panelVariants}
      animate={isMenuOpen ? "open" : "closed"}
      transition={{
        duration: 0.7,
        type: "tween",
      }}
      initial="closed"
      className="absolute flex flex-col w-3/4 max-w-[1120px] p-2 bg-white rounded-md shadow-md min-w-sm top-2 bottom-2 left-2 backdrop-blur-sm bg-opacity-70"
    >
      <div className="mb-2">
        <Select
          value={selectedOption}
          defaultValue={selectedOption}
          onChange={(option) => {
            setSelectedOption(option.value);
          }}
          options={options}
        />
      </div>
      {selectedOption === "sensor" && <MeasurementGraph />}
      {selectedOption === "estimated-global" && <EstimateGraph />}
    </motion.div>
  );
}
