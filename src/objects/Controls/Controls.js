import { OrbitControls } from '@react-three/drei';
import React from 'react';
// import useStore from '../../store';

function Controls() {
  // TODO: Add store back
  // const isMenuOpen = useStore((state) => state.isMenuOpen);
  const orbitControlsRef = React.useRef(null);

  return (
    <OrbitControls
      ref={orbitControlsRef}
      // autoRotate={!isMenuOpen}
      autoRotateSpeed={0.2}
      minPolarAngle={-Math.PI / 2}
      maxPolarAngle={Math.PI / 2.1}
    />
  );
}

export default Controls;