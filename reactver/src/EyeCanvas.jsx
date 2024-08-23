import React, {useImperativeHandle, useRef, forwardRef} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls, useGLTF} from '@react-three/drei';
import EyeCube from './EyeCube';


const EyeCanvas = forwardRef((props, ref) => { // TODO: why did i need forwardRef and UseImperitiveHandle
  const x = 400;
  const cubeRef = useRef();

  useImperativeHandle(ref, () => ({
    callRotation(y, z) {
      console.log(`[EyeCanvas] y= ${y} z = ${z}`);
      if (cubeRef.current) cubeRef.current.setRotation(y,z);
    }
  }));
  

  return (
    <Canvas frameloop='always' camera={{ position: [5, 1, 0], fov: 45, near: 0.1, far: 200}}>
      <ambientLight/>
      <OrbitControls 
        enableRotate={false}
        enableZoom={false}
        autoRotate={false}
        enablePan={false}
        />
      <EyeCube x={x} ref={cubeRef} />
    </Canvas>
  );
});

export default EyeCanvas;