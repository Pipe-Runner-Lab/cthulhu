import React, { useContext } from "react";
import { Canvas } from "@react-three/fiber";
import Gizmo from "../../objects/Gizmo";
import Controls from "../../objects/Controls";
import EditorPanel from "../../components/EditorPanel";
import GraphPanel from "../../components/GraphPanel";
import Scene from "../../objects/Scene";
import { Leva } from "leva";
import { PyodideContext } from "../../providers/Pyodide";
import Lights from "../../objects/Lights";
import Cameras from "../../objects/Cameras";

function Home() {
  const { isPyodideLoading } = useContext(PyodideContext);

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
          
          <Cameras />
          <Lights />
          <Scene />

          {/* Utils */}
          <Controls />
          <Gizmo />
        </Canvas>

        <EditorPanel />
        <GraphPanel />
      </div>
      {/* <div className="absolute overflow-auto top-2 left-2 max-h-96">
        <Leva collapsed fill />
      </div> */}
    </>
  );
}

export default Home;
