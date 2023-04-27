/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./src/assets/ship-light.gltf
*/

import shipModel from "../../assets/ship-light.gltf";

import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function GhostShip({ shipRef }) {
  const { nodes } = useGLTF(shipModel);

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "yellow",
        transparent: true,
        opacity: 0.3,
      }),
    []
  );

  return (
    <group scale={0.05} ref={shipRef} dispose={null}>
      <mesh
        geometry={nodes.Cube141.geometry}
        material={material}
        position={[2.88, 58.75, 5.34]}
      />
      <group position={[2.86, 49.13, 8.84]}>
        <mesh geometry={nodes.Cube014.geometry} material={material} />
        <mesh geometry={nodes.Cube014_1.geometry} material={material} />
      </group>
      <mesh
        geometry={nodes.Cube143.geometry}
        material={material}
        position={[2.85, 44.96, 9.75]}
        scale={1.59}
      />
      <mesh
        geometry={nodes.Cube144.geometry}
        material={material}
        position={[2.9, 54.62, 5.85]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[-1, -0.1, -0.73]}
      />
      <mesh
        geometry={nodes.Cube145.geometry}
        material={material}
        position={[2.89, 42.37, 5.72]}
      />
      <mesh
        geometry={nodes.Cube151.geometry}
        material={material}
        position={[11.64, 27.39, 2.64]}
        scale={0.82}
      />
      <group position={[3.88, -2.17, -18.5]} scale={[15.59, 18.12, 18.12]}>
        <mesh geometry={nodes.Cube026.geometry} material={material} />
        <mesh geometry={nodes.Cube026_1.geometry} material={material} />
      </group>
      <group position={[4.07, 17.07, 10.22]} scale={[12.08, 9.12, 9.12]}>
        <mesh geometry={nodes.Cube027.geometry} material={material} />
        <mesh geometry={nodes.Cube027_1.geometry} material={material} />
      </group>
      <group position={[3.82, -9.16, -20.17]} scale={[16.29, 14.86, 18.93]}>
        <mesh geometry={nodes.Cube028.geometry} material={material} />
        <mesh geometry={nodes.Cube028_1.geometry} material={material} />
      </group>
      <mesh
        geometry={nodes.Cylinder132.geometry}
        material={material}
        position={[10.89, -9.1, -71.21]}
      />
      <mesh
        geometry={nodes.Cylinder136.geometry}
        material={material}
        position={[2.92, 44.38, 9.73]}
        scale={[0.17, 0.4, 0.17]}
      />
      <mesh
        geometry={nodes.Cylinder138.geometry}
        material={material}
        position={[2.88, 59.07, 6.25]}
        scale={[0.04, 0.32, 0.04]}
      />
      <mesh
        geometry={nodes.Cylinder139.geometry}
        material={material}
        position={[2.9, 48.76, 8.83]}
        scale={[0.11, 0.25, 0.11]}
      />
      <mesh
        geometry={nodes.Cylinder141.geometry}
        material={material}
        position={[2.9, 54.13, 8.11]}
        scale={[0.2, 0.26, 0.2]}
      />
      <mesh
        geometry={nodes.Cylinder142.geometry}
        material={material}
        position={[2.88, 57.82, 5.37]}
        scale={[0.21, 3.13, 0.21]}
      />
      <mesh
        geometry={nodes.Cylinder161.geometry}
        material={material}
        position={[11.65, 35.98, 3.08]}
        rotation={[0, -0.49, 0]}
        scale={0.59}
      />
      <mesh
        geometry={nodes.Cylinder162.geometry}
        material={material}
        position={[11.65, 35.98, 0.99]}
        rotation={[0, -0.46, 0]}
        scale={0.59}
      />
      <mesh
        geometry={nodes.Cylinder166.geometry}
        material={material}
        position={[13.6, 31.26, 18.55]}
        scale={[0.63, 1.46, 0.63]}
      />
      <mesh
        geometry={nodes.Cylinder167.geometry}
        material={material}
        position={[-5.29, 31.26, 18.55]}
        scale={[0.63, 1.46, 0.63]}
      />
      <mesh
        geometry={nodes.Sphere031.geometry}
        material={material}
        position={[2.88, 59.49, 6.26]}
        scale={0.09}
      />
      <mesh
        geometry={nodes.Sphere032.geometry}
        material={material}
        position={[2.94, 54.86, 8.09]}
        scale={0.8}
      />
      <mesh
        geometry={nodes.Sphere033.geometry}
        material={material}
        position={[13.6, 34.72, 18.55]}
        scale={3.11}
      />
      <mesh
        geometry={nodes.Sphere034.geometry}
        material={material}
        position={[-5.29, 34.72, 18.55]}
        scale={3.11}
      />
      <mesh
        geometry={nodes["Кран004|Cube169|Dupli|3"].geometry}
        material={material}
        position={[0.06, 6.51, -5.91]}
      />
      <mesh
        geometry={nodes["Кран004|Cylinder177|Dupli|5"].geometry}
        material={material}
        position={[0.02, 7.33, 0.39]}
        rotation={[0, 0, Math.PI / 2]}
        scale={[0.26, 1.28, 0.26]}
      />
      <mesh
        geometry={nodes["Спасательный_плот_А008|Cube172|Dupli|"].geometry}
        material={material}
        position={[0.1, 0.26, 0.64]}
      />
      <mesh
        geometry={nodes["Спасательный_плот_А009|Cube172|Dupli|"].geometry}
        material={material}
        position={[0.1, 0.26, 0.64]}
      />
      <mesh
        geometry={nodes["Спасательный_плот_А010|Cube172|Dupli|"].geometry}
        material={material}
        position={[0.1, 0.26, 0.64]}
      />
      <mesh
        geometry={nodes["Спасательный_плот_А011|Cube172|Dupli|"].geometry}
        material={material}
        position={[0.1, 0.26, 0.64]}
      />
      <mesh
        geometry={nodes["Спасательный_плот_А008|Cube173|Dupli|1"].geometry}
        material={material}
        position={[0.1, 0.26, -0.72]}
      />
      <mesh
        geometry={nodes["Спасательный_плот_А009|Cube173|Dupli|1"].geometry}
        material={material}
        position={[0.1, 0.26, -0.72]}
      />
      <mesh
        geometry={nodes["Спасательный_плот_А010|Cube173|Dupli|1"].geometry}
        material={material}
        position={[0.1, 0.26, -0.72]}
      />
      <mesh
        geometry={nodes["Спасательный_плот_А011|Cube173|Dupli|1"].geometry}
        material={material}
        position={[0.1, 0.26, -0.72]}
      />
      <mesh
        geometry={nodes["Спасательный_плот_А008|Cube174|Dupli|2"].geometry}
        material={material}
        position={[-0.03, 0.12, 0.01]}
        scale={[0.68, 0.12, 1]}
      />
      <mesh
        geometry={nodes["Спасательный_плот_А009|Cube174|Dupli|2"].geometry}
        material={material}
        position={[-0.03, 0.12, 0.01]}
        scale={[0.68, 0.12, 1]}
      />
      <mesh
        geometry={nodes["Спасательный_плот_А010|Cube174|Dupli|2"].geometry}
        material={material}
        position={[-0.03, 0.12, 0.01]}
        scale={[0.68, 0.12, 1]}
      />
      <mesh
        geometry={nodes["Спасательный_плот_А011|Cube174|Dupli|2"].geometry}
        material={material}
        position={[-0.03, 0.12, 0.01]}
        scale={[0.68, 0.12, 1]}
      />
      <mesh
        geometry={nodes["Спасательный_плот_А008|Sphere039|Dupli|3"].geometry}
        material={material}
        position={[0.18, 1.28, -0.91]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes["Спасательный_плот_А009|Sphere039|Dupli|3"].geometry}
        material={material}
        position={[0.18, 1.28, -0.91]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes["Спасательный_плот_А010|Sphere039|Dupli|3"].geometry}
        material={material}
        position={[0.18, 1.28, -0.91]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes["Спасательный_плот_А011|Sphere039|Dupli|3"].geometry}
        material={material}
        position={[0.18, 1.28, -0.91]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload(shipModel);
