import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Gizmo from "../../objects/Gizmo";
import Controls from "../../objects/Controls";
import EditorPanel from '../../components/EditorPanel';
import { PerspectiveCamera } from "@react-three/drei";
import Scene from "../../objects/Scene";

function Home() {
  const defaultCameraRef = useRef(null);

  return (
    <div
      id="canvas-container"
      className="relative w-full h-full overflow-hidden"
    >
      <Canvas shadows>
        <PerspectiveCamera
          ref={defaultCameraRef}
          position={[45, 26, 45]}
          fov={35}
          far={500}
          near={1}
          makeDefault
        />
        <Scene />

        {/* Utils */}
        <Controls />
        <Gizmo />
      </Canvas>

      <EditorPanel />
    </div>
  );
}

export default Home;
