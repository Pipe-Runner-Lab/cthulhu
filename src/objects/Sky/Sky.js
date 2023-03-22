import { Sky as BaseSky } from "@react-three/drei";

export default function Sky() {
  return (
    <BaseSky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
  );
}
