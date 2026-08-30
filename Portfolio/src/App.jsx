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
<div style="background-color: #0d1117; color: #00FF66; font-family: 'Courier New', Courier, monospace; font-weight: bold; font-size: 14px; padding: 6px 12px; border: 1px solid #00FF66; border-radius: 4px; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 0 8px rgba(0, 255, 102, 0.2);">
  <span style="opacity: 0.7;">&gt;_</span>
  <span>[PDF]</span>
</div>


<div style="background-color: #0d1117; color: #00FF66; font-family: 'Courier New', Courier, monospace; font-weight: bold; font-size: 14px; padding: 6px 12px; border: 1px solid #00FF66; border-radius: 4px; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 0 8px rgba(0, 255, 102, 0.2);">
  <span style="opacity: 0.7;">&gt;_</span>
  <span>[PDF]</span>
</div>


<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">

  <rect x="26" y="0" width="204" height="256" rx="16" ry="16" fill="#0D1117" stroke="#00FF66" stroke-width="6"/>


  <path d="M166 0 L230 64 H182 C173.2 64 166 56.8 166 48 Z" fill="#00FF66" opacity="0.3"/>
  <path d="M166 0 L230 64" stroke="#00FF66" stroke-width="6" fill="none"/>

  <text x="50" y="90" font-family="'Courier New', Courier, monospace" font-weight="bold" font-size="45" fill="#00FF66">&gt;_</text>

 
  <text x="128" y="185" font-family="'Courier New', Courier, monospace" font-weight="bold" font-size="60" fill="#00FF66" text-anchor="middle" letter-spacing="4">PDF</text>
</svg>

 </>
  )
}

export default App;