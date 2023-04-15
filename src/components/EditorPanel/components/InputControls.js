import React from "react";
import clsx from "clsx";

function SimulationControls({ computeSimulation, isDisabled }) {
  return (
      <div className="flex space-x-2">
        <button
          disabled={isDisabled}
          onClick={computeSimulation}
          className={clsx("h-9 rounded-md flex-1 shadow-sm", {
            "bg-green-300 ": !isDisabled,
            "bg-gray-300 text-gray-600": isDisabled,
          })}
        >
          Compute
        </button>
      </div>
  );
}

export default SimulationControls;
