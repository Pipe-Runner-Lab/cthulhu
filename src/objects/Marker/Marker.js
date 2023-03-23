import { useFBX } from "@react-three/drei";
import markerModel from "../../assets/marker.fbx";

export default function Marker() {
  const fbx = useFBX(markerModel);
  return (
    <group>
      <primitive scale={0.002} object={fbx} />
    </group>
  );
}
