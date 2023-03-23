import { useFBX } from "@react-three/drei";

export default function Marker() {
  const fbx = useFBX("/marker.fbx");
  return (
    <group>
      <primitive scale={0.002} object={fbx} />
    </group>
  );
}
