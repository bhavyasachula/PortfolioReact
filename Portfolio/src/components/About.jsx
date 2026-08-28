import React from 'react'

function About() {
  return (
    <>
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
          apps. Backend systems, API integrations, database management.
        </span>
        <br/>
        <br/>
        <span className="prompt">bhavya@portfolio~$:</span>
        <span className="cmdtext">{" "}open resume.pdf</span>
        <br />
        <span className="output">
          → <a href="/resumeSB.pdf" target="_blank" className="resume-link">Click here to download</a>
        </span>
        <span className="cursor"> ▍</span>
      </p>
    </div>
  </div>
</div>
  <div className="section-header">
  <span className="section-tag">SKills & Tools</span>
</div>
</>
  )
}

export default About