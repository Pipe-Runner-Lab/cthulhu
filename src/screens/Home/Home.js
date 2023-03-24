import React, { useContext, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Gizmo from "../../objects/Gizmo";
import Controls from "../../objects/Controls";
import EditorPanel from "../../components/EditorPanel";
import { PerspectiveCamera } from "@react-three/drei";
import Scene from "../../objects/Scene";
import { Leva } from "leva";
import { PyodideContext } from "../../providers/Pyodide";

function Home() {
  const { isPyodideLoading } = useContext(PyodideContext);

  const defaultCameraRef = useRef(null);

  return (
    <>
      {isPyodideLoading && (
        <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full text-white bg-black pointer-events-none">
          Loading...
        </div>
      )}
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
      <div className="absolute overflow-auto top-2 left-2 max-h-96">
        <Leva collapsed fill />
      </div>
    </>
  );
}

export default Home;
