import React from 'react'
import "./Project.css"
function Project({ data }) {
  const { title, desc, stats, techstack, repoLink, demoLink, steps } = data

  return (
    
    <div className='projMaster flex flex-col lg:flex-row flex-wrap justify-evenly min-h-[600px] lg:h-[800px] w-full mt-[15px] text-white border-1' id="projects">

      <div className="projSection1 w-full lg:w-[50%] p-[15px]">

        <div className="projTitle text-[28px] sm:text-[36px] lg:text-[50px]">{title}</div>

        <div className="projDesc text-[16px] sm:text-[20px] lg:text-[25px]">{desc}</div>

        <div className='projStats flex flex-wrap justify-around lg:justify-around border-1 p-[10px] m-[10px] gap-[10px]'>

          {stats.map((s) => (

            <div className="statscard" key={s.label}>

              <div className="statsCtitle">{s.label}</div>

              <div className="statsvalue">{s.value}</div>

              <div className="statsCtitle">{s.sub}</div>

            </div>

          ))}

        </div>

        <div className='projTechstack flex-wrap'>

          {techstack.map((t) => (

            <div className="projTechstacklang" key={t}>--{t}</div>

          ))}

        </div>
          <div className='Pipeline'>PDF ──▶ OCR ──▶ ROUTE ──▶ DISPATCH </div>
        <div className="liveDemo flex flex-col sm:flex-row w-full p-[10px] gap-[10px] h-auto sm:h-[90px]">

          <a className="liveDemoButton" href={repoLink} target='_blank' rel="noreferrer">

            <div className="content">Repository</div>

            <div className="content"><ArrowIcon /></div>

          </a>
          <a className="liveDemoButton" href={demoLink} target='_blank' rel="noreferrer">
            <div className="content">Live Demo</div>
            <div className="content"><ArrowIcon /></div>
          </a>
        </div>
      </div>

      <div className="projSection2 w-full lg:w-[50%] p-[10px]">
        <div className="innerSection2 flex flex-col justify-evenly h-full p-[10px] border-1 gap-[10px]">
          {steps.map((step) => (
            <div className="executionSteps text-[18px] sm:text-[24px] lg:text-[35px] flex flex-wrap justify-around items-center min-h-[100px] w-full border-1" key={step.id}>
              <div className="content p-[]">{step.id}</div>
              <div className="content p-[]">{step.label}</div>
              <div className="content p-[]">{step.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 18L18 6M18 6H10M18 6V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default Project