import React, { memo, useEffect, useState } from "react";
import useStore from "../../store";
import { useWorker, WORKER_STATUS } from "@koale/useworker";
import { QuadraticBezierLine } from "@react-three/drei";

const processData = (data) => {
  const SKIP_FACTOR = 25;
  const SCALE_FACTOR = 100;

  let position = [];
  const estimatedPosition = [];
  const length = data.get("Time").length;

  for (let i = SKIP_FACTOR * 2; i < length; i += 2 * SKIP_FACTOR) {
    position.push([
      [
        data.get("Position (X)")[i - 2 * SKIP_FACTOR] * SCALE_FACTOR,
        data.get("Position (Y)")[i - 2 * SKIP_FACTOR] * SCALE_FACTOR,
      ],
      [
        data.get("Position (X)")[i - SKIP_FACTOR] * SCALE_FACTOR,
        data.get("Position (Y)")[i - SKIP_FACTOR] * SCALE_FACTOR,
      ],
      [
        data.get("Position (X)")[i] * SCALE_FACTOR,
        data.get("Position (Y)")[i] * SCALE_FACTOR,
      ],
    ]);

    estimatedPosition.push([
      [
        data.get("Position (X`)")[i - 2 * SKIP_FACTOR] * SCALE_FACTOR,
        data.get("Position (Y`)")[i - 2 * SKIP_FACTOR] * SCALE_FACTOR,
      ],
      [
        data.get("Position (X`)")[i - SKIP_FACTOR] * SCALE_FACTOR,
        data.get("Position (Y`)")[i - SKIP_FACTOR] * SCALE_FACTOR,
      ],
      [
        data.get("Position (X`)")[i] * SCALE_FACTOR,
        data.get("Position (Y`)")[i] * SCALE_FACTOR,
      ],
    ]);
  }

  return { position, estimatedPosition };
};

export const LinePlotter = memo(() => {
  const [data, setData] = useState({
    position: [],
    estimatedPosition: [],
  });

  const simulationData = useStore((state) => state.simulationData);
  const [processDataWorker, controller] = useWorker(processData, {
    autoTerminate: true,
  });

  useEffect(() => {
    if (simulationData && controller.status === WORKER_STATUS.PENDING) {
      console.log(simulationData === null, controller.status);
      processDataWorker(simulationData).then((result) => {
        setData(result);
        controller.kill();
        controller.status = WORKER_STATUS.IDLE;
      });
    }
  }, [simulationData]);

  console.log(controller.status);

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
      {data.estimatedPosition.map((line, index) =>
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
