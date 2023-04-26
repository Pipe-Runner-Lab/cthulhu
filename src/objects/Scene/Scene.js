import Sky from "../../objects/Sky";
import Ocean from "../../objects/Ocean";
import Ship from "../../objects/Ship";
import Lights from "../../objects/Lights";
import Marker from "../../objects/Marker";
import { useFrame } from "@react-three/fiber";
import useStore from "../../store";
import { useRef } from "react";

const SCALE_FACTOR = 100;

export default function Scene() {
  const shipRef = useRef();
  const dataCounterIndex = useRef(0);

  const simulationData = useStore((state) => state.simulationData);
  const animating = useStore((state) => state.animating);
  const setAnimating = useStore((state) => state.setAnimating);
  const setAnimationProgress = useStore((state) => state.setAnimationProgress);

  console.log(simulationData);

  useFrame(() => {
    if (animating && simulationData) {
      if (dataCounterIndex.current < simulationData.get("Time").length) {
        // x and z are swapped because of co-ordinate system
        shipRef.current.position.z =
          simulationData.get("Position (X)")[dataCounterIndex.current] * SCALE_FACTOR;
        shipRef.current.position.x = simulationData.get("Position (Y)")[dataCounterIndex.current] * SCALE_FACTOR;
        shipRef.current.rotation.y = simulationData.get("Position (Sai)")[dataCounterIndex.current]; // TODO: Is it in radians?

        dataCounterIndex.current += 1;

        const animationProgress = Math.floor(
          (dataCounterIndex.current / simulationData.get("Time").length) * 100
        );

        // debounce the progress bar update
        if (animationProgress % 5 === 0) {
          setAnimationProgress(animationProgress);
        }
      } else {
        setAnimating(false);
        dataCounterIndex.current = 0;
      }
    }
  });

  return (
    <>
      <Lights />

      <Sky />
      <Ocean />

      <Ship shipRef={shipRef} />
      <Marker />
    </>
  );
}
