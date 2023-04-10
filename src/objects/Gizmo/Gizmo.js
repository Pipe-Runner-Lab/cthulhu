import { GizmoHelper, GizmoViewport } from "@react-three/drei";
import React from "react";

function Gizmo() {
  return (
    <GizmoHelper
      alignment="bottom-right" // widget alignment within scene
      margin={[80, 80]} // widget margins (X, Y)
    >
      <GizmoViewport axisColors={["red", "green", "blue"]} labelColor="black" />
    </GizmoHelper>
  );
}

export default Gizmo;
