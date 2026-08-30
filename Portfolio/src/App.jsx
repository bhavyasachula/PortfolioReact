import { useState, useRef } from 'react'
import LightTunnel from './components/LightTunnel.jsx'; 
import Caraousal from './components/Caraousal.jsx';
import Navbar from './components/Navbar.jsx';
import './App.css'

function App() {
  const frameRef = useRef(null);

  function handleMouseMove(e) {
    const el = frameRef.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  function handleMouseLeave() {
    frameRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  }

  return (
   <>
  <div className="main" style={{ width: '100%', height: '870px', position: 'relative'  }}>

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
    thickness={0.45}
    rimWidth={0.15}
    waviness={0.3}
    sway={0.5}
    size={1}
    centerX={0}
    centerY={0}
    glow={1}
    fadeNear={0.5}
    fadeFar={2}
    brightness={1.2}
    colorVariance
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
  <span className="section-tag">About</span>
  <div
    className="terminal-frame"
    ref={frameRef}
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
  >
    <div className="terminal-header">
      <div className='inner-header'>
      <span className="dot red"></span>
      <span className="dot yellow"></span>
      <span className="dot green"></span>
      <span className="terminal-title ">bhavya.exe</span>
    </div>
    <div className='resume'>
      <a href="/resumeSB.pdf"
            rel="noopener noreferrer"
            className="nav-resume">
            Resume
          </a>
    </div>
    </div>
    <div className="terminal-body">
      <p className='terminalp'>
        <span className="prompt">bhavya@portfolio~$:</span><span className='cmdtext'>{' '}whoami</span> 
        <br />
        <span className="output">
          Computer Science Graduate targeting{' '}
          <span className="highlight">AI Developer</span>,
          <span className="highlight">Full Stack Developer</span> roles.
        </span>
        <br /><br />
        <span className="prompt">bhavya@portfolio~$:</span><span className='cmdtext'>{" "}skills --list</span>
        <br />
        <span className="output">
          Building <span className="highlight">agentic AI systems</span>,{' '}
          <span className="highlight">RAG workflows</span>, and full-stack
          apps ,Backend systems, API integrations, database management.
        </span>
        <br/>
        <br/>
        <span className="prompt">bhavya@portfolio~$:</span>
        <span className="cmdtext">{" "}open resume.pdf</span>
        <br />
        <span className="output">
          → <a href="/resumeSB.pdf" target="_blank" className="resume-link">Click here to download </a>
         
<span style="background-color: #E53935; color: #FFFFFF; font-family: Arial, sans-serif; font-weight: bold; font-size: 12px; padding: 3px 6px; border-radius: 4px; letter-spacing: 0.5px; display: inline-block;">PDF</span>

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#E53935">
  <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .8-.7 1.5-1.5 1.5H9v2H7.5V7H10c.8 0 1.5.7 1.5 1.5v1zm5 2c0 .8-.7 1.5-1.5 1.5h-2.5V7H15c.8 0 1.5.7 1.5 1.5v3zm4-3.5H19v1h1.5V10H19v3h-1.5V7H20.5v1.5zM9 9.5h-.5v-1H9c.3 0 .5.2.5.5s-.2.5-.5.5zm5.5 2h-1v-3h1c.3 0 .5.2.5.5v2c0 .3-.2.5-.5.5zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/>
</svg>
        </span>
        <span className="cursor">▍</span>
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