import React, { useContext, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { MuiChipsInput } from "mui-chips-input";
import { Line } from "@ant-design/charts";
import { TextField } from "@mui/material";
import { PyodideContext } from "../../../providers/Pyodide";
import script from "../../../python/simulator.py";
import { extractScriptText } from "../../../utils/script-text";
import useStore from "../../../store";

const checkIsNumber = (value) => {
  if (value === "" || value === "-" || value === "." || value === "-.") {
    return false;
  }

  return !isNaN(value);
};

const checkValidChips = (chips) => {
  if (chips.length === 0) {
    return false;
  }

  for (let i = 0; i < chips.length; i += 1) {
    const timeMap = {};

    const [t, a, b] = chips[i].replace(/ /g, "").split(",");

    if (
      !checkIsNumber(t) ||
      !checkIsNumber(a) ||
      !checkIsNumber(b) ||
      timeMap[t]
    ) {
      timeMap[t] = true;
      return false;
    }
  }

  return true;
};

const sortChips = (chips) => {
  return chips.sort((a, b) => {
    const [t1] = a.replace(/ /g, "").split(",");
    const [t2] = b.replace(/ /g, "").split(",");

    if (!checkIsNumber(t1) || !checkIsNumber(t2)) {
      return 1;
    }

    return parseFloat(t1) - parseFloat(t2);
  });
};

const DefaultValues = {
  time: "200",
  force: [
    "0,0.7,0",
    "5,0.5,0.5",
    "7,-0.2,-0.2",
    "10,0.3,0.01",
    "30,0.1,-0.2",
    "35,0.6,0",
    "40,0.2,0.3",
    "45,0.4,0",
    "50,0.1,0.15",
    "90, 1, 0.2",
    "120, 1, -0.1"
  ],
  theta: ["100, 0.3, 0.25", "150, 0, 0.2"],
};

function convertDataForPyodide(data, sTime) {
  const result = [];
  const time = parseFloat(sTime);

  for (let i = 0; i < data.length; i += 1) {
    const [t, a, b] = data[i].replace(/ /g, "").split(",").map(parseFloat);

    if (t >= 0 && t <= time) {
      result.push([t, [a, b]]);
    }
  }

  if (result.length === 0 || result[0][0] > 0) {
    result.unshift([0, [0, 0]]);
  }

  if (result[result.length - 1][0] < time) {
    result.push([time, result[result.length - 1][1]]);
  }

  return result;
}

function processDataForGraph(force, theta) {
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

function SimulationControls({ isDisabled }) {
  const { asyncRun } = useContext(PyodideContext);

  const setSimulationData = useStore((state) => state.setSimulationData);

  const [force, setForce] = useState(DefaultValues.force);
  const [theta, setTheta] = useState(DefaultValues.theta);
  const [time, setTime] = useState(DefaultValues.time);
  const [processedData, setProcessedData] = useState(() => [
    convertDataForPyodide(force, time),
    convertDataForPyodide(theta, time),
  ]);

  const [graphData, setGraphData] = useState(
    processDataForGraph(...processedData)
  );

  useEffect(() => {
    computeSimulation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // block update if not a number
    if (
      !checkIsNumber(time) ||
      !checkValidChips(force) ||
      !checkValidChips(theta)
    ) {
      return;
    }

    setProcessedData([
      convertDataForPyodide(force, time),
      convertDataForPyodide(theta, time),
    ]);
  }, [force, theta, time]);

  useEffect(() => {
    setGraphData(processDataForGraph(...processedData));
  }, [processedData]);

  const computeSimulation = async () => {
    setSimulationData(null);
    const code = await extractScriptText(script);

    const context = {
      force: processedData[0],
      theta: processedData[1],
      time: parseFloat(time),
    };

    const {
      variables: { output },
      error,
    } = await asyncRun(code, context);

    if (error) console.error(error);

    setSimulationData(output);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleForceChange = (newChips) => {
    setForce(sortChips(newChips));
  };

  const handleThetaChange = (newChips) => {
    setTheta(sortChips(newChips));
  };

  const config = useMemo(
    () => ({
      data: graphData,
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
    }),
    [graphData]
  );

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
        error={!checkValidChips(force)}
      />
      <MuiChipsInput
        clearInputOnBlur
        fullWidth
        label="θ1, θ2"
        placeholder="Text should be <time,θ1,θ2>..."
        size="small"
        value={theta}
        onChange={handleThetaChange}
        error={!checkValidChips(theta)}
      />

      <div className="flex space-x-2">
        <div className="flex-1">
          <TextField
            size="small"
            label="Time (sec)"
            value={time}
            onChange={handleTimeChange}
            error={!checkIsNumber(time)}
            required
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
          {isDisabled ? "Please Wait..." : "Compute"}
        </button>
      </div>
    </div>
  );
}

export default SimulationControls;
