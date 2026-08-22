import { useState } from 'react'
import LightTunnel from './components/LightTunnel.jsx'; 
import Caraousal from './components/Caraousal.jsx';
import Navbar from './components/Navbar.jsx';
import FaultyTerminal from './components/FaultyTerminal.jsx';
import './App.css'
function App() {

  function onHeroClick(){
    console.log("Clicked");
  }
  return (
   <>
  
  <div className="main" style={{ width: '100%', height: '750px', position: 'relative'  }}>

  <Navbar></Navbar>
   <FaultyTerminal
    scale={1.5}
    gridMul={[2, 1]}
    digitSize={1.2}
    timeScale={0.5}
    pause={false}
    scanlineIntensity={0.5}
    glitchAmount={1}
    flickerAmount={1}
    noiseAmp={1}
    chromaticAberration={0}
    dither={0}
    curvature={0.1}
    tint="#7C3AED"
    mouseReact
    mouseStrength={0.5}
    pageLoadAnimation
    brightness={0.6}
  />
 <div className='HeroText' onClick={onHeroClick}>Hi,I m BHAVYA</div> 
  </div>
  <Caraousal></Caraousal>
 </>
  )
}

export default App
