import {
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import useStore from "../../store";
import * as THREE from "three";

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

const tempVector = new THREE.Vector3();

export default function Cameras({ shipRef, thirdPersonGoalRef }) {
  const topDownCameraRef = useRef(null);
  const perspectiveCameraRef = useRef(null);

  const cameraType = useStore((state) => state.cameraType);

  // Reset perspective camera position when switching to pan camera
  useEffect(() => {
    if (
      perspectiveCameraRef.current != null &&
      shipRef.current != null &&
      cameraType === "pan"
    ) {
      perspectiveCameraRef.current.lookAt(0, 0, 0);
      perspectiveCameraRef.current.position.set(
        shipRef.current.position.x + 45,
        26,
        shipRef.current.position.z + 45
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraType]);

  useFrame(() => {
    if (
      shipRef.current != null &&
      perspectiveCameraRef.current != null &&
      topDownCameraRef.current != null
    ) {
      if (cameraType === "perspective") {
        tempVector.setFromMatrixPosition(
          thirdPersonGoalRef.current.matrixWorld
        );

        perspectiveCameraRef.current.position.lerp(tempVector, 0.3);
        perspectiveCameraRef.current.lookAt(shipRef.current.position);
      }

      if (cameraType === "top-down") {
        topDownCameraRef.current.position.x = shipRef.current.position.x;
        topDownCameraRef.current.position.y = 8;
        topDownCameraRef.current.position.z = shipRef.current.position.z;
        topDownCameraRef.current.lookAt(
          shipRef.current.position.x,
          0,
          shipRef.current.position.z
        );
      }
    }
  });

  return (
    <>
      <PerspectiveCamera
        position={[45, 26, 45]}
        fov={35}
        far={500}
        near={1}
        makeDefault={cameraType === "perspective" || cameraType === "pan"}
        ref={perspectiveCameraRef}
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
        makeDefault={cameraType === "top-down"}
      />
    </>
  );
}
