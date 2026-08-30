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
<svg width="25" height="25" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">

  <rect x="26" y="0" width="204" height="256" rx="24" ry="24" fill="#4CAF50"/>
  <path d="M166 0 L230 64 H190 C176.7 64 166 53.3 166 40 Z" fill="#388E3C"/>
  <path d="M75 0 C150 50 166 200 230 200 V232 C230 245.3 219.3 256 206 256 H175 C120 180 80 80 75 0 Z" fill="#2E7D32" opacity="0.3"/>
  <text x="128" y="180" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="70" fill="#FFFFFF" text-anchor="middle">PDF</text>
</svg>
 </>
  )
}

export default App;