import { useState } from 'react'
import LightTunnel from './components/LightTunnel.jsx'; 
import Caraousal from './components/Caraousal.jsx';
import Navbar from './components/Navbar.jsx';
import './App.css'
function App() {

  return (
   <>
  <div className="main" style={{ width: '100%', height: '800px', position: 'relative'  }}>

  <Navbar></Navbar>
 <LightTunnel
    cableColor="#A855F7"
    pulseColor="#A855F7"
    tunnelColor="#5227FF"
    tunnelOpacity={0}
    speed={0.1}
    flowDirection="outward"
    pulseSpeed={2}
    pulseLength={0.28}
    pulseBlend={1}
    pulseWidth={1}
    cableCount={20}
    thickness={0.35}
    rimWidth={0.15}
    waviness={0.3}
    sway={0.5}
    size={1}
    centerX={0}
    centerY={0}
    glow={1}
    fadeNear={0.5}
    fadeFar={2}
    brightness={1}
    colorVariance
    grain
    grainIntensity={0.05}
    opacity={1}
    mouseInteraction
    mouseStrength={0.1}
  />
 <div className='HeroText' >
  HI,I m BHAVYA
</div> 
  </div>
  <div className="about">
  <span className="section-tag" style={{fontSize:'30px'}}>About</span>
  <div className="section-about-description">
    <p style={{fontFamily:"Sans serif", color:"white"}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic eligendi ut pariatur ad tempore harum omnis quod corporis, molestias, in minus earum assumenda? Velit ipsa impedit nostrum ullam magni! Omnis, minima recusandae.</p>  
  </div>
</div>

  <div className="section-header">
  <span className="section-tag">SKills & Tools</span>
</div>
  <Caraousal></Caraousal>
 </>
  )
}

export default App;
