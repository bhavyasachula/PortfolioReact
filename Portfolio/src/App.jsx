import { useState, useRef } from 'react'
import numpy from "./assets/numpy.png"
import ProjectScrollCov from "./components/ProjectScrollCov.jsx"
// import LightTunnel from './components/LightTunnel.jsx';
import Caraousal from './components/Caraousal.jsx';
import Navbar from './components/Navbar.jsx';
import TechStackBeam from './components/TechStackBeam.jsx';
import NewContact from "./components/NewContact.jsx"
import About from './components/About.jsx';
// import Skills from './components/skills.jsx';
import strandspurple from './assets/svgpurplee.png'
import reactlogo from "./assets/reactjslogo.png";
import nodejslogo from "./assets/nodejslogo.png";
import pytorchlogo from "./assets/pytorchlog.png";
import langsmithlogo from "./assets/pytorchlog.png";
import GhostFibers from './components/GhostFibers.jsx';
import './App.css'
import { FileTerminal, ImageOff } from 'lucide-react';
import { Link } from 'react-scroll';
import ScrollRuler from "./components/ScrollRuler.jsx";
import Certificates from './components/Certificates.jsx';

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

const imageLinks = [
      "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
      reactlogo,
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTqrOXX6aDLQETYHcaJWSdReybJBEgLNN3NPwWx8P0iRGnfKkwP",
      "https://storage.googleapis.com/chilipiper-cloud-static/workspace-logos/langchain.com/bd2bda48-ec1b-480c-8468-98e43909e079-93ca5a37-84a1-4aec-ab4e-86c54a01d315.png",
      nodejslogo,
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8cxgwkzgZl9Z7OFj04lWIEZJCD3QeGH_YhdVcjcRAoA&s=10",
      "https://avatars.githubusercontent.com/u/10566080?s=280&v=4",
      "https://avatars.githubusercontent.com/u/18133?s=280&v=4",
      "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/langgraph-color.png",
      pytorchlogo,
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYb9oNbyVvb5J10zWtdj_46nNAfUIko14n8Cb6RudWKxefkunJMyB6zzig&s=10",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Claude_AI_symbol.svg/3840px-Claude_AI_symbol.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail",
      "https://static.vecteezy.com/system/resources/previews/055/687/065/non_2x/gemini-google-icon-symbol-logo-free-png.png",
      langsmithlogo,
      "https://ubos.tech/wp-content/uploads/2023/11/chroma.png",
      "https://avatars.githubusercontent.com/u/156354296?s=280&v=4",
      "https://cdn.iconscout.com/icon/free/png-256/free-postgresql-icon-svg-download-png-1175119.png?f=webp&w=128",
      "https://assets.codeguru.com/uploads/2003/02/C-tutorials.jpg?f=jpeg",
      "https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxvHMT0riO5Ze2r4kAINc_2QgRT1de06pviP2kjjyzFLpCTZZEk1s5nN1tTMNrZUQs52mBPXbxUYT04uiFQgRxAc-&format=source",
      "https://avatars.slack-edge.com/2021-07-28/2335856319233_b1f6442290972bfa5498_512.png",
      "https://images.seeklogo.com/logo-png/45/1/pandas-logo-png_seeklogo-459105.png",
      "https://explore-feed.github.com/topics/nextjs/nextjs.png",
      numpy,
      "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-white-icon.png",
      "https://i0.wp.com/ahex.co/wp-content/uploads/2022/06/d3.png?fit=400%2C400&ssl=1",
      "https://images.seeklogo.com/logo-png/35/1/tailwind-css-logo-png_seeklogo-354675.png",
      "https://karankrishnani.com/images/vercel-logo.webp",
    ];

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
  <ScrollRuler />
  <div className="main" id="home" style={{ width: '100%', height: '850px', position: 'relative'  }}>
    
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



  <GhostFibers
    glowColor="#ff6a1a"
    layers={3}
    twist={0.75}
    threads={72}
    fiberStyle="dashes"
    depthOfField={0.85}
    hoverEffect="focus"
    intro
    mouseInteraction
    lineColor="#ffffff"
    secondaryColor="#d60fd9"
    gradient="depth"
    waves={0.7}
    volume={1.5}
    spread={0.9}
    scale={0.8}
    rotation={2}
    perspective={0.65}
    density={0.35}
    thickness={1}
    tips={0}
    foldGlow={1}
    speed={2}
    flow={0.9}
    rollSpeed={0.15}
    focusDepth={0}
    particles={0.9}
    sparkle={1}
    glow={0.8}
    brightness={1}
    vignette={0.3}
    grain={0.06}
    mouseStrength={1}
    pulseOnClick
    lightMode={false}
/>
 <div className='HeroText select-none' >
  HI,I m BHAVYA
</div> 
  </div>

<About/>

  <TechStackBeam images={imageLinks}  id="TechStack" />   

    <div className='proheadOuter w-[100%] flex justify-center mt-15 items-center' >
      <div className='proHeading text-white text-center w-[50%]'>{'{PROJECTS}'}</div>
    </div>


<ProjectScrollCov></ProjectScrollCov>
<div className='proheadOuter w-[100%] flex justify-center mt-4 items-center'>
      <div className='proHeading text-white text-center w-[70%]'>{"{Certificates.}"}</div>
    </div>
 <Certificates></Certificates>
  <div className='proheadOuter w-[100%] flex justify-center mt-4 items-center'>
      <div className='proHeading text-white text-center w-[70%]'>{"{Get In Touch.}"}</div>
    </div>

  <NewContact></NewContact>
 </>
  )
}

export default App;