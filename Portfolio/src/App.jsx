import { useState, useRef } from 'react'
// import LightTunnel from './components/LightTunnel.jsx';
import CRTWarp from './components/CRTwrap.jsx'; 
import Caraousal from './components/Caraousal.jsx';
import Navbar from './components/Navbar.jsx';
import './App.css'
import { FileTerminal } from 'lucide-react';
import { Link } from 'react-scroll';
import Contact from './components/Contact.jsx';
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
   
  <div className="main" id="home" style={{ width: '100%', height: '870px', position: 'relative'  }}>

  <Navbar></Navbar>
 {/* <LightTunnel
    cableColor="#da0dfe"
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
  /> */}
  <CRTWarp
    color="#c755f7"
    backgroundColor="#05010a"
    speed={0.1}
    curvature={0.30}
    scanlineStrength={0.25}
    scanlineFrequency={200}
    waveAmplitude={0.3}
    waveFrequency={2.5}
    bloom={1.5}
    bloomRadius={1}
    noise={0.1}
    vignette={0}
    brightness={1.25}
    pixelation={1}
    rgbShift={0.015}
    mouseReact
    mouseStrength={0.5}
    dpr={1}
    fps={30}
    paused={false}
/>
 <div className='HeroText' >
  HI,I m BHAVYA
</div> 
  </div>
  <div className="about" id="about">
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
          apps ,Backend systems, API integrations,  database management.
        </span>

        <br/>
        <br/>
        <span className="prompt">bhavya@portfolio~$:</span>
        <span className="cmdtext">{" "}open resume.pdf</span>
        <br />
        <span className="output">
          → <a href="/resumeSB.pdf" target="_blank" className="resume-link">Click here to download <FileTerminal className="inline-block text-[#00FF66] w-4 h-4 ml-1 align-middle" /></a>
          
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