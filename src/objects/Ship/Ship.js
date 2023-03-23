import { useFBX } from "@react-three/drei";
import shipModel from "../../assets/vessels_1.fbx";

export default function Ship() {
  const fbx = useFBX(shipModel);
  return <group><primitive scale={0.002} object={fbx} /></group>;
}
