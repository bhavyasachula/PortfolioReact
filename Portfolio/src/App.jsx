import { useState } from 'react'
import LightTunnel from './components/LightTunnel.jsx'; 
import './App.css'
function App() {
  

  return (
   <>
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
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
    <div></div>  
    </div>
 </>
  )
}

export default App
