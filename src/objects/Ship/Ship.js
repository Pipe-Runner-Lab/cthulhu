import shipModel from "../../assets/ship.gltf";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import useStore from "../../store";

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
        shipRef.current.position.x = simulationData[idx + 0] * 50;
        shipRef.current.position.z = simulationData[idx + 1] * 50;
        shipRef.current.rotation.y = simulationData[idx + 2];

        console.log("shipRef.current.position.x", shipRef.current.position.x);
        console.log("shipRef.current.position.z", shipRef.current.position.z);
        console.log("shipRef.current.rotation.y", shipRef.current.rotation.y);

        dataCounterIndex.current += 1;
      } else {
        setAnimating(false);
        dataCounterIndex.current = 0;
      }
    }
  });

  return <primitive ref={shipRef} scale={0.1} object={gltf.scene} />;
}
