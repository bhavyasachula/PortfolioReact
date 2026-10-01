import React from 'react'
import "./ProjectBento.css"
function ProjetBento() {
  return (
   <>
    <div className=''>
        <div className='Container w-full text-white'>
            <div className="gridcard tetle">
              <div className='innerTetle w-full p-[20px]'>
               <label className="" htmlFor="">Agentic Invoice Dispatcher</label>
              <p>Agentic invoice routing — OCR extraction, LLM <br></br> classification, SMTP dispatch. Zero manual touch</p>
              </div>
              </div>
            <div className="gridcard c1">91.9% <span>field accuracy</span></div>
            <div className="gridcard c2">{'<1.8s'}<span>cycle time</span></div>
            <div className="gridcard m1">0.0 <span>touch minutes</span></div>
            <div className="gridcard m2">6 <span>Pipeline stages</span></div>
            <div className="gridcard metric">
              <div className='StatusContainer'>
                 <div className='innerStats'>
                    <div>01</div>
                    <div>02</div>
                    <div>03</div>
                </div>
              </div>
            </div>
            <div className="gridcard flow">{'ingest -> ocr -> parse -> route -> send'}</div>
            <div className="gridcard stack"> python , langgraph , langchain , streamlit</div>
            <div className="gridcard proc">01 Project</div>
        </div>
    </div>
   </>
  )
}

export default ProjetBento;