import React from "react";
import clsx from "clsx";

function SimulationControls({ computeSimulation }) {
  return (
    <>
      <div className="flex space-x-2">
        <button
          onClick={computeSimulation}
          className={clsx("h-9 rounded-md flex-1 shadow-lg", {
            "bg-green-300 ": true,
            "bg-red-300 ": false,
          })}
        >
          Compute
        </button>
      </div>
      <div>
        <div className="w-full bg-blue-300 rounded-full h-1.5 mt-1 mb-2">
          <div
            className="bg-blue-500 h-1.5 rounded-full"
            style={{ width: `${20}%` }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default SimulationControls;
