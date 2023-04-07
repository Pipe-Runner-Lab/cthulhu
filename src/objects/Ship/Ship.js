import shipModel from "../../assets/ship.gltf";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import useStore from "../../store";

const SCALE_FACTOR = 100

export default function Ship() {
  const shipRef = useRef();
  const dataCounterIndex = useRef(0);
  const gltf = useLoader(GLTFLoader, shipModel);

  const simulationData = useStore((state) => state.simulationData);
  const indexSkip = useStore((state) => state.indexSkip);
  const animating = useStore((state) => state.animating);
  const setAnimating = useStore((state) => state.setAnimating);

  useFrame(() => {
    if (animating && simulationData && indexSkip) {
      const idx = indexSkip * dataCounterIndex.current;

      if (idx < simulationData.length) {
        // x and z are swapped because of co-ordinate system
        shipRef.current.position.z = simulationData[idx + 0] * SCALE_FACTOR;
        shipRef.current.position.x = simulationData[idx + 1] * SCALE_FACTOR;
        shipRef.current.rotation.y = simulationData[idx + 2]; // TODO: Is it in radians?

        dataCounterIndex.current += 1;
      } else {
        setAnimating(false);
        dataCounterIndex.current = 0;
      }
    }
  });

  return <primitive ref={shipRef} scale={0.1} object={gltf.scene} />;
}
