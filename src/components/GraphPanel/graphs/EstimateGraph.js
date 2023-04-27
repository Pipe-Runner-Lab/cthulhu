import React, { useEffect, useState, memo } from "react";
import { Line } from "@ant-design/plots";
import useStore from "../../../store";
import { useWorker } from "@koale/useworker";

const processData = (data, simplify = true) => {
  let result = [];
  const length = data.get("Time").length;

  for (let i = 0; i < length; i += simplify ? 25 : 1) {
    result.push({
      time: data.get("Time")[i],
      value: data.get("Position (X)")[i],
      category: "x",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("Position (Y)")[i],
      category: "y",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("Position (Sai)")[i],
      category: "Ψ",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("Position (X`)")[i],
      category: "x`",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("Position (Y`)")[i],
      category: "y`",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("Position (Sai`)")[i],
      category: "Ψ`",
    });
  }

  return result;
};

export const EstimateGraph = memo(() => {
  const [data, setData] = useState([]);

  const simulationData = useStore((state) => state.simulationData);
  const [processDataWorker] = useWorker(processData, {
    autoTerminate: true,
  });

  useEffect(() => {
    if (simulationData) {
      processDataWorker(simulationData).then((result) => {
        setData(result);
      });
    }
  }, [simulationData, processDataWorker]);

  const config = {
    data,
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
    interactions: [{ type: "brush" }],
  };

  return (
    <div className="flex-1 p-2 bg-white rounded-md">
      <div className="h-full">
        <Line {...config} />
      </div>
    </div>
  );
});
