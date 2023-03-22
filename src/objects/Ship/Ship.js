import { useFBX } from "@react-three/drei";

export default function Ship() {
  const fbx = useFBX("/assets/vessels_1.fbx");
  return <group><primitive scale={0.002} object={fbx} /></group>;
}
