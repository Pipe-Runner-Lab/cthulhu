import shipModel from "../../assets/ship-light.gltf";
import { useLoader } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Ship({ shipRef, ghost = false }) {
  const gltf = useLoader(GLTFLoader, shipModel);

  // const scene = useMemo(() => {
  //   console.log("useMemo");

  //   if (ghost) {
  //     const ship = gltf.scene.clone();
  //     ship.traverse((child) => {
  //       if (child.isMesh) {
  //         child.material.transparent = true;
  //         child.material.opacity = 0.5;
  //       }
  //     });

  //     return ship;
  //   }

  //   return gltf.scene;
  // }, [ghost, gltf]);

  return <primitive ref={shipRef} scale={0.05} object={gltf.scene} />;
}
