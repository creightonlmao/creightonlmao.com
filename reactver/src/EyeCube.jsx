import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useGLTF } from '@react-three/drei';

const EyeCube = forwardRef((props, ref) => {
  
    const { scene } = useGLTF("/eyecube/eye cube 4.gltf");
    const selfRef = useRef(); // this?
  
    useImperativeHandle(ref, () => ({
        setRotation(y, z) { 
            // console.log(`[EyeCube] y= ${y} z = ${z}`);
            const theta_z = Math.atan2(y, props.x);
            const theta_y = Math.atan2(z, props.x);
            selfRef.current.rotation.y = selfRef.current ? (theta_z) : 0;  // add a delay
            selfRef.current.rotation.z = selfRef.current ? (-theta_y) : 0; 
            // console.log(`[EyeCube] rotation y = ${selfRef.current.rotation.y} rotation z = ${selfRef.current.rotation.z}`);
          }
    }));
  
    return (
      <primitive object = {scene} scale = {1} ref = {selfRef} position={[0, -1, 0]}>
      </primitive>
    );
});

export default EyeCube;