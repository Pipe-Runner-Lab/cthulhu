import React from "react";
import clsx from "clsx";

function SimulationControls({ computeSimulation }) {
  return (
      <div className="flex space-x-2">
        <button
          onClick={computeSimulation}
          className={clsx("h-9 rounded-md flex-1 shadow-sm", {
            "bg-green-300 ": true,
            "bg-red-300 ": false,
          })}
        >
          Compute
        </button>
      </div>
  );
}

export default SimulationControls;
