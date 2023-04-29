import React, { memo, useEffect, useRef, useState } from "react";
import useStore from "../../store";
import { QuadraticBezierLine } from "@react-three/drei";
import { createWorkerFactory, useWorker } from "@shopify/react-web-worker";

const createWorker = createWorkerFactory(() =>
  import("../../workers/data-processor")
);

export const LinePlotter = memo(({ showPrediction }) => {
  const [data, setData] = useState({
    position: [],
    estimatedPosition: [],
  });

  const simulationData = useStore((state) => state.simulationData);

  const processDataWorker = useWorker(createWorker);
  const isProcess = useRef(false);

  useEffect(() => {
    (async () => {
      if (processDataWorker && simulationData && !isProcess.current) {
        isProcess.current = true;
        const result = await processDataWorker.generateTrails(simulationData);
        setData(result);
        isProcess.current = false;
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simulationData]);

  return (
    <>
      {data.position.map((line, index) => (
        <QuadraticBezierLine
          start={[line[0][1], 0.1, line[0][0]]}
          mid={[line[1][1], 0.1, line[1][0]]}
          end={[line[2][1], 0.1, line[2][0]]}
          segments={3}
          color={"#ed873e"}
          lineWidth={1}
          dashed={true}
          key={index}
        />
      ))}
      {showPrediction &&
        data.estimatedPosition.map((line, index) =>
          !line[0][1] ? null : (
            <QuadraticBezierLine
              start={[line[0][1], 0.1, line[0][0]]}
              mid={[line[1][1], 0.1, line[1][0]]}
              end={[line[2][1], 0.1, line[2][0]]}
              segments={3}
              color={"#ed3e5e"}
              lineWidth={1}
              dashed={true}
              key={index}
            />
          )
        )}
    </>
  );
});
