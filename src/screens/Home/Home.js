import React from "react";
import { Canvas } from "@react-three/fiber";
import Gizmo from "../../objects/Gizmo";
import Controls from "../../objects/Controls";
import EditorPanel from "../../components/EditorPanel";
import GraphPanel from "../../components/GraphPanel";
import Scene from "../../objects/Scene";

function Home() {
  // const { isPyodideLoading } = useContext(PyodideContext);

  return (
    <>
      <div
        id="canvas-container"
        className="relative w-full h-full overflow-hidden"
      >
        <Canvas shadows>
          <Scene />

          {/* Utils */}
          <Controls />
          <Gizmo />
        </Canvas>

        <EditorPanel />
        <GraphPanel />
      </div>
    </>
  );
}

export default Home;
