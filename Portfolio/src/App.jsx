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
<div className="about" style={{fontFamily:"Cursive"}}>
  <span className="section-tag">About</span>
  <div className="terminal-frame">
    <div className="terminal-header">
      <span className="dot red"></span>
      <span className="dot yellow"></span>
      <span className="dot green"></span>
      <span className="terminal-title">bhavya.exe</span>
    </div>
    <div className="terminal-body">
      <p>
        <span className="prompt text-white">$whoami</span> 
        <br />
        <span className="output">
          Computer Engineering Graduate targeting{' '}
          <span className="highlight">GenAI Developer</span> and{' '}
          <span className="highlight">Full Stack Developer</span> roles.
        </span>
        <br /><br />
        <span className="prompt">$skills --list</span>
        <br />
        <span className="output">
          Building <span className="highlight">agentic AI systems</span>,{' '}
          <span className="highlight">RAG workflows</span>, and full-stack
          apps. Backend systems, API integrations, database management.
        </span>
        <span className="cursor">|</span>
      </p>
    </div>
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
