import React, {useImperativeHandle, useRef, forwardRef} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls, useGLTF} from '@react-three/drei';
import EyeCube from './EyeCube';


const EyeCanvas = forwardRef((props, ref) => { // TODO: why did i need forwardRef and UseImperitiveHandle
  const x = 400; // change this to change how quickly/slowly the cube follows the cursor 
  const cubeRef = useRef();

  useImperativeHandle(ref, () => ({
    callRotation(y, z) {
      // console.log(`[EyeCanvas] y= ${y} z = ${z}`);
      if (cubeRef.current) cubeRef.current.setRotation(y,z);
    }
  }));
  
  // for position: change first element to change how far/close camera is 
  return (
    <Canvas className="canvas" frameloop='always' camera={{ position: [5, 0, 0], fov: 45, near: 0.1, far: 200}}>  
      <ambientLight/>
      <pointLight position={[2, 0, -1]} intensity={3}/>
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