import { useState, useRef } from 'react'
import LightTunnel from './components/LightTunnel.jsx';
import Caraousal from './components/Caraousal.jsx';
import Navbar from './components/Navbar.jsx';
import ProjetBento from './components/ProjectBento.jsx';
import TechStackBeam from './components/TechStackBeam.jsx';
import NewContact from "./components/NewContact.jsx"
import About from './components/About.jsx';
// import Skills from './components/skills.jsx';
import strandspurple from './assets/svgpurplee.png'
import reactlogo from "./assets/reactjslogo.png";
import nodejslogo from "./assets/nodejslogo.png";
import pytorchlogo from "./assets/pytorchlog.png";
import langsmithlogo from "./assets/pytorchlog.png";
// import MicroSlats from './components/MicroSlats.jsx';
import './App.css'
import { FileTerminal, ImageOff } from 'lucide-react';
import { Link } from 'react-scroll';
import Contact from './components/Contact.jsx';
import Project from './components/Project.jsx';

// import ScrollRuler from "./components/ScrollRuler.jsx";


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
      "https://media.licdn.com/dms/image/v2/D5612AQFSTglfKdI9eg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1708971797430?e=2147483647&v=beta&t=iZKe_LBwW0NSHcz1V9_LsKskeje_BYusBCoctWYnWJ0",
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
  {/* <ScrollRuler /> */}
  <div className="main" id="home" style={{ width: '100%', height: '870px', position: 'relative'  }}>
    
  <Navbar></Navbar>
 <LightTunnel 
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
  
   {/* <MicroSlats
    preset="tide"
    color="#A855F7"
    glintColor="#ffffff"
    backgroundColor="#120f17"
    slatWidth={15}
    slatHeight={35}
    gap={3}
    roundness={0.75}
    interactive
    cursorStrength={1}
    cursorSize={40}
    swirl={0}
    trail={1.4}
    lean={0}
    intro
    scale={1.3}
    speed={0.5}
    direction={262}
    chop={0.2}
    stretch={0.12}
    glint={0.45}
    contrast={1.1}
    perspective={0.5}
    fog={0.4}
    introDuration={1.5}
    paused={false}
/> */}

 <div className='HeroText select-none' >
  HI,I m BHAVYA
</div> 
  </div>
{/* <div className="about flex justify-center w-[100%]" id="about">     */}
   <div className="section-tag w-[100%]">{'{About}'}</div>
  {/*<div
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
        Building agentic AI systems and Full stack App workflows
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
  </div> */}

{/* </div> */}
<About/>
{/* <div className="wave-section" >
    <svg width="0" height="0" style={{ position: 'absolute' }}>
  <clipPath id="waveClip" clipPathUnits="objectBoundingBox">
    <path d="M0.00000,0.60000L0.01285,0.61656C0.02562,0.63438,0.05139,0.66563,0.07708,0.66656C0.10257,0.66563,0.12847,0.63438,0.15417,0.58344C0.17951,0.53438,0.20486,0.46563,0.23056,0.46656C0.25639,0.46563,0.28194,0.53438,0.30764,0.48344C0.33333,0.43438,0.35903,0.26562,0.38472,0.25000C0.41028,0.23438,0.43611,0.36562,0.46181,0.45000C0.48715,0.53438,0.51250,0.56563,0.53819,0.61656C0.56410,0.66563,0.58958,0.73438,0.61528,0.66656C0.64104,0.60000,0.66667,0.40000,0.69236,0.30000C0.71792,0.20000,0.74375,0.20000,0.76944,0.25000C0.79486,0.30000,0.82083,0.40000,0.84583,0.46656C0.87181,0.53438,0.89722,0.56563,0.92292,0.53344C0.94875,0.50000,0.97431,0.40000,0.98750,0.35000L1.00000,0.30000L1.00000,0.00000L0.98715,0.00000C0.97437,0.00000,0.94861,0.00000,0.92292,0.00000C0.89743,0.00000,0.87153,0.00000,0.84583,0.00000C0.82049,0.00000,0.79514,0.00000,0.76944,0.00000C0.74361,0.00000,0.71806,0.00000,0.69236,0.00000C0.66667,0.00000,0.64097,0.00000,0.61528,0.00000C0.58972,0.00000,0.56389,0.00000,0.53819,0.00000C0.51285,0.00000,0.48750,0.00000,0.46181,0.00000C0.43590,0.00000,0.41042,0.00000,0.38472,0.00000C0.35896,0.00000,0.33333,0.00000,0.30764,0.00000C0.28208,0.00000,0.25625,0.00000,0.23056,0.00000C0.20514,0.00000,0.17917,0.00000,0.15417,0.00000C0.12819,0.00000,0.10278,0.00000,0.07708,0.00000C0.05125,0.00000,0.02569,0.00000,0.01250,0.00000L0.00000,0.00000Z" />
  </clipPath>
</svg>
</div> */}

  {/* <Caraousal></Caraousal> */}
  <TechStackBeam images={imageLinks}  id="TechStack" />   
 {/*new grid skills  */}
{/* <Skills></Skills> */}


 {/* end grid skills */}
    <div className='proheadOuter w-[100%] flex justify-center  items-center' >
      <div className='proHeading text-white w-[50%]'>{'{PROJECTS}'}</div>
    </div>
    {/* <Project data={invoiceDispatcherData}></Project> */}
<ProjetBento id="projects"></ProjetBento>
  <div className='proheadOuter w-[100%] flex justify-center  mt-10 items-center' >
      <div className='proHeading text-white w-[50%]'>{"{Get In Touch.}"}</div>
    </div>
  <NewContact></NewContact>
 </>
  )
}

export default App;