import markerModel from "../../assets/bouy.gltf";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Marker() {
  const gltf = useLoader(GLTFLoader, markerModel);
  return (
    <group>
      <primitive position-x={20} scale={0.1} object={gltf.scene} />
    </group>
  );
}
