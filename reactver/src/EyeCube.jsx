import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useGLTF } from '@react-three/drei';

const EyeCube = forwardRef((props, ref) => {
  
    const { scene } = useGLTF("/eyecube/eyecube.gltf");
    const selfRef = useRef(); // this?
  
    useImperativeHandle(ref, () => ({
        setRotation(y, z) { // i might need to use state for this... maybe
            console.log(`[EyeCube] y= ${y} z = ${z}`);
            const theta_z = Math.atan2(y, props.x);
            const theta_y = Math.atan2(z, props.x);
            selfRef.current.rotation.y = selfRef.current ? (theta_z) : 0; 
            selfRef.current.rotation.z = selfRef.current ? (-theta_y) : 0; 
            console.log(`[EyeCube] rotation y = ${selfRef.current.rotation.y} rotation z = ${selfRef.current.rotation.z}`);
          }
    }));
  
    return (
      <primitive object = {scene} scale={1} ref = {selfRef}>
      </primitive>
    );
});

export default EyeCube;