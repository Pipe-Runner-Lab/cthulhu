import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/plots";
import useStore from "../../../store";
import { useWorker } from "@koale/useworker";

const processData = (data, skipIndex, simplify = true) => {
  let result = [];
  let skip = 0;

  for (let i = 0; i < data.length; i += skipIndex) {
    if (simplify && skip % 2 === 1) {
      skip += 1;
      continue;
    }

    const time = data[i + skipIndex - 1];
    result.push({
      time,
      value: data[i + 0],
      category: "x",
    });
    result.push({
      time,
      value: data[i + 1],
      category: "y",
    });
    result.push({
      time,
      value: data[i + 2],
      category: "Ψ",
    });
    result.push({
      time,
      value: data[i + 3],
      category: "u",
    });
    result.push({
      time,
      value: data[i + 4],
      category: "v",
    });
    result.push({
      time,
      value: data[i + 5],
      category: "r",
    });
  }

  return result;
};

export function MeasurementGraph() {
  const [data, setData] = useState([]);

  const simulationData = useStore((state) => state.simulationData);
  const indexSkip = useStore((state) => state.indexSkip);
  const [processDataWorker] = useWorker(processData);

  useEffect(() => {
    if (simulationData && indexSkip) {
      processDataWorker(simulationData, indexSkip).then((result) => {
        setData(result);
      });
    }
  }, [indexSkip, simulationData, processDataWorker]);

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
    // interactions: [{ type: "brush" }],
  };

  return (
    <div className="p-2 bg-white rounded-md">
      <Line {...config} />
    </div>
  );
}
