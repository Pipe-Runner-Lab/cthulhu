import Sky from "../../objects/Sky";
import Ocean from "../../objects/Ocean";
import Ship from "../../objects/Ship";
import Lights from "../../objects/Lights";
import Marker from "../../objects/Marker";
import { useFrame } from "@react-three/fiber";
import useStore from "../../store";
import { useMemo, useRef } from "react";

const SCALE_FACTOR = 100;

export default function Scene() {
  const shipRef = useRef();
  const dataCounterIndex = useRef(0);
  const currentAnimationStep = useRef(0);

  const simulationData = useStore((state) => state.simulationData);
  const indexSkip = useStore((state) => state.indexSkip);
  const animating = useStore((state) => state.animating);
  const setAnimating = useStore((state) => state.setAnimating);
  const setAnimationProgress = useStore((state) => state.setAnimationProgress);

  console.log(simulationData, indexSkip);

  // useEffect(() => {
  //   if (animating) {
  //     dataCounterIndex.current = 0;
  //   }
  // }, [animating])

  const maxStep = useMemo(
    () => simulationData && simulationData.length / indexSkip,
    [indexSkip, simulationData]
  );

  useFrame(() => {
    if (animating && simulationData && indexSkip) {
      const idx = indexSkip * dataCounterIndex.current;

      if (idx < simulationData.length) {
        // x and z are swapped because of co-ordinate system
        shipRef.current.position.z = simulationData[idx + 0] * SCALE_FACTOR;
        shipRef.current.position.x = simulationData[idx + 1] * SCALE_FACTOR;
        shipRef.current.rotation.y = simulationData[idx + 2]; // TODO: Is it in radians?

        dataCounterIndex.current += 1;
        
        currentAnimationStep.current += 1;
        const animationProgress =
          Math.floor(currentAnimationStep.current / maxStep * 100);

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
