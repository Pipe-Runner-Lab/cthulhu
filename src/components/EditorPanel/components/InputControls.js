import React, { useState } from "react";
import clsx from "clsx";
import { MuiChipsInput } from "mui-chips-input";
import { Line } from "@ant-design/charts";
import { TextField } from "@mui/material";

const DefaultValues = {
  time: "180",
  force: ["0,1,-1", "30,-1,1"],
  theta: ["0,0,0", "100,0.2,0.3", "150,0,0"],
};

function convertData(data, sTime) {
  const result = [];
  const time = parseFloat(sTime);

  for (let i = 0; i < data.length; i += 1) {
    const [t, a, b] = data[i].replace(/ /g, "").split(",").map(parseFloat);

    result.push([t, [a, b]]);
  }

  if (result[result.length - 1][0] < time) {
    result.push([time, result[result.length - 1][1]]);
  }

  if (result[0][0] > 0) {
    result.unshift([0, [0, 0]]);
  }

  return result;
}

function processData(force, theta) {
  let result = [];

  for (let i = 0; i < force.length; i += 1) {
    result.push({
      time: force[i][0],
      value: force[i][1][0],
      category: "u1",
    });
    result.push({
      time: force[i][0],
      value: force[i][1][1],
      category: "u2",
    });
  }

  for (let i = 0; i < theta.length; i += 1) {
    result.push({
      time: theta[i][0],
      value: theta[i][1][0],
      category: "θ1",
    });
    result.push({
      time: theta[i][0],
      value: theta[i][1][1],
      category: "θ2",
    });
  }

  return result.sort((a, b) => a.time - b.time);
}

function SimulationControls({ computeSimulation, isDisabled }) {
  const [force, setForce] = React.useState(DefaultValues.force);
  const [theta, setTheta] = React.useState(DefaultValues.theta);
  const [time, setTime] = React.useState(DefaultValues.time);

  const [processedForce, processedTheta] = [
    convertData(force, time),
    convertData(theta, time),
  ];

  const [data, setData] = useState(processData(processedForce, processedTheta));

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleForceChange = (newChips) => {
    setForce(newChips);
  };

  const handleThetaChange = (newChips) => {
    setTheta(newChips);
  };

  const config = {
    data,
    stepType: "hv",
    xField: "time",
    yField: "value",
    seriesField: "category",
    xAxis: {
      label: {
        title: {
          text: "Time (s)",
        },
        formatter: (v) => `${parseFloat(v).toFixed(2)}`,
      },
      tickCount: 8,
    },
  };

  return (
    <div className="space-y-2">
      <div className="w-full h-[180px] p-2 bg-white rounded-md mb-1">
        <div className="h-full">
          <Line {...config} />
        </div>
      </div>

      <MuiChipsInput
        clearInputOnBlur
        fullWidth
        label="u1, u2"
        placeholder="Text should be <time,u1,u2>..."
        size="small"
        value={force}
        onChange={handleForceChange}
      />
      <MuiChipsInput
        clearInputOnBlur
        fullWidth
        label="θ1, θ2"
        placeholder="Text should be <time,θ1,θ2>..."
        size="small"
        value={theta}
        onChange={handleThetaChange}
      />

      <div className="flex space-x-2">
        <div className="flex-1">
          <TextField
            size="small"
            label="Time (sec)"
            value={time}
            onChange={handleTimeChange}
          />
        </div>
        <button
          disabled={isDisabled}
          onClick={computeSimulation}
          className={clsx("h-9 rounded-md shadow-sm flex-[2]", {
            "bg-green-300 ": !isDisabled,
            "bg-gray-300 text-gray-600": isDisabled,
          })}
        >
          Compute
        </button>
      </div>
    </div>
  );
}

export default SimulationControls;
