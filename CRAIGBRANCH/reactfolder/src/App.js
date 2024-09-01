import './App.css';
import { useState, Suspense} from 'react';
import useWindowSize from '../src/useWindowSize.js'

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Arrow from './Arrow3.jsx'

function Cl(){
  return(
    <>
    {/* font for poem ahh */}
    <div><link rel="stylesheet" href="https://use.typekit.net/njx3jwa.css"></link></div>
    {/* text */}
    <div className='scripture'>
    <p>Flint nor steel has lit,</p>
    <p>Nor storm disturbs, flames begotten of flame,</p>
    <p>Where blood-begotten spirits come,</p>
    <p>And all complexities of fury leave</p>
  </div>
    </>
  )
}

function CArrow(){
  <Canvas camera={{ fov: 40 }}>
        <ambientLight />
        <pointLight position={[0, -5, .5]} intensity={2000}/>
        <OrbitControls 
        autoRotate={true}
        enablePan={false}
        enableRotate={false}
        enableZoom={false}/>
        <Suspense fallback={null}>
          <Arrow />
        </Suspense>
      </Canvas>
}

function C2(){
  if (window.innerHeight < 600){
    return(
      <div className='canvasclass1'>
        <CArrow />
        </div>
    )
  }
  else {
    return(
      <div className='canvasclass2'>
  <CArrow />
  </div>
    )
  }


}


function App() {

  const size = useWindowSize();

  return (
    <>
      {(size.width > 900) && <Cl/>}
    <div className='creightonlmao'>creightonlmao</div>
    <input type="text" placeholder="Search.."></input>
    {/* arrow */}
    <C2 />
    </>
  );
}

export default App;
