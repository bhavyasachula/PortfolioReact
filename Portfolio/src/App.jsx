import { useState, useRef } from 'react'
import LightTunnel from './components/LightTunnel.jsx';
import Caraousal from './components/Caraousal.jsx';
import Navbar from './components/Navbar.jsx';
import strandspurple from './assets/svgpurplee.png'
import './App.css'
import { FileTerminal } from 'lucide-react';
import { Link } from 'react-scroll';
import Contact from './components/Contact.jsx';
import Project from './components/Project.jsx';
function App() {
  const invoiceDispatcherData = {
  title: "Invoice Dispatcher Agent",
  desc: "AgenticInvoiceDispatcher — an agent system that automates invoice routing and dispatch. It uses LLM-based natural language routing (replacing brittle keyword matching) to classify incoming invoices, Tesseract OCR to extract data from them, and SMTP to send them to the right recipient/department automatically.",
  stats: [
    { label: "EXTRACTION", value: "91.9%", sub: "FIELD ACCURACY" },
    { label: "LATENCY", value: "<1.8s", sub: "CYCLE DURATION" },
    { label: "DISPATCH", value: "0.0 min", sub: "ZERO-TOUCH OP" },
  ],
  techstack: [ "PYTHON", "LANGGRAPH", "LANGCHAIN", "STREAMLIT"],
  repoLink: "https://github.com/bhavyasachula/agentic-billbot-pro",
  demoLink: "http://flowchat.streamlit.app/",
  steps: [
    { id: "01", label: "Document Ingestion", time: "150ms" },
    { id: "02", label: "Tesseract OCR Extraction", time: "600ms" },
    { id: "03", label: "Field Parsing & Validation", time: "200ms" },
    { id: "04", label: "LLM Natural-Language Routing", time: "500ms" },
    { id: "05", label: "Recipient Resolution", time: "150ms" },
    { id: "06", label: "SMTP Dispatch", time: "200ms" },
  ],
}

  const frameRef = useRef(null);

  function handleMouseMove(e) {
    const el = frameRef.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * -7;

    el.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.06)`;
  }

  function handleMouseLeave() {
    frameRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  }

  return (
   <>
   
  <div className="main" id="home" style={{ width: '100%', height: '870px', position: 'relative'  }}>
  <Navbar></Navbar>
 <LightTunnel /*CRTwrap here*/ 
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
  />
  
 <div className='HeroText select-none' >
  HI,I m BHAVYA
</div> 
  </div>
  <div className="about flex justify-center w-[100%]" id="about">    
  <div className="section-tag w-[55%]">{'{About}'}</div>
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
          CS Grad → 
          <span className="highlight"> AI Developer</span>|
          <span className="highlight">Full Stack Developer</span>|
        Building agentic AI systems and Full stack Apps workflows
        </span>
        <br /><br />

        <span className="prompt">bhavya@portfolio~$:</span>
        <span className="cmdtext">{" "}cat education.log</span>
        <br />
       <span className="output">
       <span className="highlight">B.Tech in Computer Science</span> — New LJ Institute of Engineering, 2026 (CGPA 8.26)
       <br />
       <span className="highlight">Diploma in Computer Engineering</span> — Government Polytechnic Gandhinagar (CGPA 9.24)
      </span>
      <br/>
      <br/>
        
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
    <div className="wave-section" >
      <svg width="0" height="0" style={{ position: 'absolute' }}>
  <clipPath id="waveClip" clipPathUnits="objectBoundingBox">
    <path d="M0.00000,0.60000L0.01285,0.61656C0.02562,0.63438,0.05139,0.66563,0.07708,0.66656C0.10257,0.66563,0.12847,0.63438,0.15417,0.58344C0.17951,0.53438,0.20486,0.46563,0.23056,0.46656C0.25639,0.46563,0.28194,0.53438,0.30764,0.48344C0.33333,0.43438,0.35903,0.26562,0.38472,0.25000C0.41028,0.23438,0.43611,0.36562,0.46181,0.45000C0.48715,0.53438,0.51250,0.56563,0.53819,0.61656C0.56410,0.66563,0.58958,0.73438,0.61528,0.66656C0.64104,0.60000,0.66667,0.40000,0.69236,0.30000C0.71792,0.20000,0.74375,0.20000,0.76944,0.25000C0.79486,0.30000,0.82083,0.40000,0.84583,0.46656C0.87181,0.53438,0.89722,0.56563,0.92292,0.53344C0.94875,0.50000,0.97431,0.40000,0.98750,0.35000L1.00000,0.30000L1.00000,0.00000L0.98715,0.00000C0.97437,0.00000,0.94861,0.00000,0.92292,0.00000C0.89743,0.00000,0.87153,0.00000,0.84583,0.00000C0.82049,0.00000,0.79514,0.00000,0.76944,0.00000C0.74361,0.00000,0.71806,0.00000,0.69236,0.00000C0.66667,0.00000,0.64097,0.00000,0.61528,0.00000C0.58972,0.00000,0.56389,0.00000,0.53819,0.00000C0.51285,0.00000,0.48750,0.00000,0.46181,0.00000C0.43590,0.00000,0.41042,0.00000,0.38472,0.00000C0.35896,0.00000,0.33333,0.00000,0.30764,0.00000C0.28208,0.00000,0.25625,0.00000,0.23056,0.00000C0.20514,0.00000,0.17917,0.00000,0.15417,0.00000C0.12819,0.00000,0.10278,0.00000,0.07708,0.00000C0.05125,0.00000,0.02569,0.00000,0.01250,0.00000L0.00000,0.00000Z" />
  </clipPath>
</svg>
</div>

<div className="section-header flex justify-center items-center w-[100]">
  <span className="section-tag w-[52%]">{'{Skills & tools}'}</span>
</div>
  
  <Caraousal></Caraousal>
    <div className='proheadOuter w-[100%] flex justify-center items-center' >
      <div className='proHeading text-white w-[50%]'>{'{PROJECTS}'}</div>
    </div>
    
  <Project data={invoiceDispatcherData} />

  
  <Contact></Contact>
 </>
  )
}

export default App;