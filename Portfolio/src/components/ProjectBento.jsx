import React from 'react'
import "./ProjectBento.css"
function ProjetBento() {
  return (
   <>
    <div className=''>
        <div className='Container w-full text-white'>
            <div className="gridcard tetle b-title bg-[#FF69B4]">
              <div className='flex flex-col justify-between h-full w-full p-[20px]'>
              <div className='innerTetle flex flex-col items-start'>
                <span className='bg-[#FFD23F] p-1 self-start border-2 text-[25px]'>Featured Project</span>
               <label className="" htmlFor="">Invoice Dispatcher Agent</label>
              <p>Agentic invoice routing — OCR extraction, LLM <br></br> classification, SMTP dispatch. Zero manual touch</p>
              </div>
              <div className='LiveLinks flex gap-5'>
                <a href="https://github.com/bhavyasachula/" target="_blank" className=''>Repository</a>
                <a href="https://flowchat.streamlit.app/" className=''>live Demo</a>
              </div>
              </div>
           </div>
            <div className="gridcard c1 flex flex-col justify-end flex-end "> 
              <div className='metrix'>91.9%</div> 
              <span className='fieldText'>Field Accuracy</span>
              </div>
            <div className="gridcard c2 flex flex-col justify-end flex-end bg-[#00BC90]">
              <div className='metrix'>{'<1.8s'}</div>
              <span className='fieldText'>Cycle Time</span>
              </div>
            <div className="gridcard m1 flex flex-col justify-end flex-end bg-[#FF8A3D]">
              <div className='metrix'>0.0</div>
              <span className='fieldText'>Touch Minutes</span>
              </div>
            <div className="gridcard flow flex items-center justify-center bg-[#FFD23F]">
              <div className="flowCard">INGEST</div>
              <ArrowForward/>
              <div className="flowCard">OCR</div>  
              <ArrowForward/>
              <div className="flowCard">PARSE</div>
              <ArrowForward/>
              <div className="flowCard">ROUTE</div>
              <ArrowForward/>
              <div className="flowCard">SEND</div>
             </div>
            <div className="gridcard stack flex items-center justify-center bg-[#ae08a0]"> 

              <div className="techStack">——LangGraph</div>
              <div className="techStack">——LangChain</div>
              <div className="techStack">——Python</div>
              <div className="techStack">——Streamlit</div>
            </div>
            <div className="gridcard proc text-[45px] flex flex-col items-end justify-end">
              <div className="Prjno">01</div>
              <div className="Prjtitle">Project</div>
            </div>
        </div>
    </div>
   </>
  )
}

function ArrowForward(){
  return(
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M6 17L11 12L6 7M13 17L18 12L13 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>
  );
}

export default ProjetBento;