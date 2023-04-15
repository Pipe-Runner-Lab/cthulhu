import { OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import React, { useEffect, useRef } from "react";

var w = window.innerWidth;
var h = window.innerHeight;
var viewSize = 350;
var aspectRatio = w / h;

const _viewport = {
  left: (-aspectRatio * viewSize) / 2,
  right: (aspectRatio * viewSize) / 2,
  top: viewSize / 2,
  bottom: -viewSize / 2,
};

console.log(_viewport);

export default function Cameras() {
  const topDownCameraRef = useRef(null);

  // useHelper(topDownCameraRef && topDownCameraRef, CameraHelper);

  useEffect(() => {
    if (topDownCameraRef.current != null) {
      topDownCameraRef.current.lookAt(0, 0, 0);
    }
  }, []);

  return (
    <>
      <PerspectiveCamera
        // ref={defaultCameraRef}
        position={[45, 26, 45]}
        fov={35}
        far={500}
        near={1}
        makeDefault={true}
      />
      <OrthographicCamera
        left={_viewport.left}
        right={_viewport.right}
        top={_viewport.top}
        bottom={_viewport.bottom}
        zoom={2.5}
        position={[0, 8, 0]}
        far={9}
        near={1}
        ref={topDownCameraRef}
        // makeDefault={true}
      />
    </>
  );
}
