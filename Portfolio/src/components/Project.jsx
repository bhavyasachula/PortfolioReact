import React from 'react'
import "./Project.css"
function Project({ data }) {
  const { title, desc, stats, techstack, repoLink, demoLink, steps } = data

  return (
    <>
    <div className='projMaster flex justify-evenly flex-wrap flex-col h-[800px] w-[100%] mt-[15px] text-white border-1' id="projects">
      <div className="projSection1 h-[100%] w-[50%] p-[15px]">
        <div className="projTitle text-[50px]">{title}</div>
        <div className="projDesc text-[25px]">{desc}</div>

        <div className='projStats flex flex-wrap justify-around border-1 p-[10px] m-[10px]'>
          {stats.map((s) => (
            <div className="statscard" key={s.label}>
              <div className="statsCtitle">{s.label}</div>
              <div className="statsvalue">{s.value}</div>
              <div className="statsCtitle">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className='projTechstack'>
          {techstack.map((t) => (
            <div className="projTechstacklang" key={t}>--{t}</div>
          ))}
        </div>

        <div className="liveDemo flex w-[100%] p-[10px] h-[90px]">
          <a className="liveDemoButton" href={repoLink} target='_blank' rel="noreferrer">
            <div className="content">View Repository</div>
            <div className="content"><ArrowIcon /></div>
          </a>
          <a className="liveDemoButton" href={demoLink} target='_blank' rel="noreferrer">
            <div className="content">Live Demo</div>
            <div className="content"><ArrowIcon /></div>
          </a>
        </div>
      </div>

      <div className="projSection2 h-[100%] w-[50%] p-[10px]">
        <div className="innerSection2 flex flex-col justify-evenly h-[100%] p-[10px] border-1">
          {steps.map((step) => (
            <div className="executionSteps text-[35px] flex justify-around items-center h-[100px] w-[100%] border-1" key={step.id}>
              <div className="content p-[10px]">{step.id}</div>
              <div className="content p-[10px]">{step.label}</div>
              <div className="content p-[10px]">{step.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
  )

}

function ArrowIcon() {
  return (
    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 18L18 6M18 6H10M18 6V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default Project