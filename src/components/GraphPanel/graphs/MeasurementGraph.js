import React, { useEffect, useState, memo, useRef } from "react";
import { Line } from "@ant-design/plots";
import useStore from "../../../store";
import { createWorkerFactory, useWorker } from "@shopify/react-web-worker";

const createWorker = createWorkerFactory(() =>
  import("../../../workers/data-processor")
);

export const MeasurementGraph = memo(() => {
  const [data, setData] = useState([]);

  const simulationData = useStore((state) => state.simulationData);

  const processDataWorker = useWorker(createWorker);
  const isProcess = useRef(false);

  useEffect(() => {
    (async () => {
      if (processDataWorker && simulationData && !isProcess.current) {
        isProcess.current = true;
        const result = await processDataWorker.processMeasurements(simulationData);
        setData(result);
        isProcess.current = false;
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simulationData]);

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
