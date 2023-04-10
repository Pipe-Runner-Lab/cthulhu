import React from "react";
import clsx from "clsx";

function SimulationControls({ computeSimulation, isDisabled }) {
  return (
      <div className="flex space-x-2">
        <button
          disabled={isDisabled}
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
