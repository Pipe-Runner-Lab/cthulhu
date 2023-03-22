import React, { useContext, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
// import Lights from '../../objects/Lights';
import Gizmo from "../../objects/Gizmo";
import Controls from "../../objects/Controls";
// import Scene from '../../objects/Scene';
// import EditorPanel from '../../components/EditorPanel';
import { PerspectiveCamera } from "@react-three/drei";
import { PyodideContext } from "../../providers/Pyodide";
import script from "../../python/simulator.py";
import Scene from "../../objects/Scene";

function Home() {
  const defaultCameraRef = useRef(null);

  const { pyodide, isPyodideLoading } = useContext(PyodideContext);

  const extractScriptText = async (script) => {
    return await (await fetch(script)).text();
  };

  useEffect(() => {
    if (isPyodideLoading) {
      console.log("Pyodide is loading...");
    } else {
      console.log("Pyodide is loaded!");
      extractScriptText(script)
        .then((code) => pyodide.runPython(code))
        .then((output) => console.log(output));
    }
  }, [pyodide, isPyodideLoading]);

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

      {/* <EditorPanel /> */}
    </div>
  );
}

export default Home;
