import Sky from "../../objects/Sky";
import Ocean from "../../objects/Ocean";
import { GhostShip, ShipLight } from "../../objects/Ship";
import Lights from "../../objects/Lights";
import Cameras from "../../objects/Cameras";
import Marker from "../../objects/Marker";
import { useFrame } from "@react-three/fiber";
import useStore from "../../store";
import { useEffect, useRef } from "react";
import { LinePlotter } from "../LinePlotter/LinePlotter";

const SCALE_FACTOR = 100;

export default function Scene() {
  const shipRef = useRef();
  const shipGhostRef = useRef();
  const thirdPersonGoalRef = useRef();
  const dataCounterIndex = useRef(0);

  const simulationData = useStore((state) => state.simulationData);
  const animating = useStore((state) => state.animating);
  const setAnimating = useStore((state) => state.setAnimating);
  const setAnimationProgress = useStore((state) => state.setAnimationProgress);
  const isComputing = useStore((state) => state.isComputing);
  const showPath = useStore((state) => state.showPath);
  const showPrediction = useStore((state) => state.showPrediction);

  useEffect(() => {
    if (animating === "stopped") {
      setAnimating("paused");
      dataCounterIndex.current = 0;
      setAnimationProgress(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animating]);

  useFrame(() => {
    if (simulationData) {
      // console.log(dataCounterIndex.current);

      // x and z are swapped because of co-ordinate system
      shipRef.current.position.z =
        simulationData.get("Position (X)")[dataCounterIndex.current] *
        SCALE_FACTOR;
      shipRef.current.position.x =
        simulationData.get("Position (Y)")[dataCounterIndex.current] *
        SCALE_FACTOR;
      shipRef.current.rotation.y =
        simulationData.get("Position (Sai)")[dataCounterIndex.current]; // TODO: Is it in radians?

      if (shipGhostRef.current) {
        shipGhostRef.current.position.z =
          (simulationData.get("Position (X`)")[dataCounterIndex.current] ?? 0) *
          SCALE_FACTOR;
        shipGhostRef.current.position.x =
          (simulationData.get("Position (Y`)")[dataCounterIndex.current] ?? 0) *
          SCALE_FACTOR;
        shipGhostRef.current.rotation.y =
          simulationData.get("Position (Sai`)")[dataCounterIndex.current] ?? 0; // TODO: Is it in radians?
      }
    }

    if (animating === "playing" && simulationData) {
      // reset the animation if it reaches the end (play seek end, not reset yet)
      if (dataCounterIndex.current === simulationData.get("Time").length - 1) {
        dataCounterIndex.current = 0;
      }

      if (dataCounterIndex.current < simulationData.get("Time").length - 1) {
        dataCounterIndex.current += 1;

        const animationProgress = Math.floor(
          (dataCounterIndex.current / (simulationData.get("Time").length - 1)) *
            100
        );

        // debounce the progress bar update
        if (animationProgress % 5 === 0) {
          setAnimationProgress(animationProgress);
        }
      }

      if (dataCounterIndex.current === simulationData.get("Time").length - 1) {
        // stop animation at the end, but do not reset the progress bar or position
        setAnimating("paused");
        // dataCounterIndex.current = 0;
      }
    }
  });

  return (
    <>
      <Cameras shipRef={shipRef} thirdPersonGoalRef={thirdPersonGoalRef} />

      <Lights />

      <Sky />
      <Ocean />

      <ShipLight thirdPersonGoalRef={thirdPersonGoalRef} shipRef={shipRef} />
      {showPrediction && <GhostShip shipRef={shipGhostRef} />}
      <Marker />

      {!isComputing && showPath && (
        <LinePlotter showPrediction={showPrediction} />
      )}
    </>
  );
}
