import { useHelper } from "@react-three/drei";
import { useControls } from "leva";
import React, { useMemo, useRef } from "react";
import { DirectionalLightHelper, Object3D } from "three";

function Lights() {
  const directionalLightRef = useRef(null);

  const { position, shouldShowHelper } = useControls("Sun", {
    shouldShowHelper: { value: false, label: "Debug" },
  });

  useHelper(shouldShowHelper && directionalLightRef, DirectionalLightHelper);

  const target = useMemo(() => {
    const target = new Object3D();
    target.position.set(0, 0, 0);
    return target;
  }, []);

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight
        ref={directionalLightRef}
        intensity={1}
        color="white"
        position={position}
        target={target}
      />
    </>
  );
}

export default Lights;
