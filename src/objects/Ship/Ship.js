import shipModel from "../../assets/ship.gltf";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Ship({ shipRef }) {
  const gltf = useLoader(GLTFLoader, shipModel);

  return <primitive ref={shipRef} scale={0.1} object={gltf.scene} />;
}
