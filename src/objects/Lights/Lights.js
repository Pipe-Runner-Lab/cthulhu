import React, { useMemo, useRef } from "react";
import { Object3D } from "three";

function Lights() {
  const directionalLightRef = useRef(null);

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
        target={target}
      />
    </>
  );
}

export default Lights;
