import React from 'react'
import "./ProjectBento.css"
function ProjetBento() {
  return (
   <>
    <div className=''>
        <div className='Container w-full text-white'>
            <div className="gridcard tetle b-title">
              <div className='flex flex-col justify-between h-full w-full p-[20px]'>
              <div className='innerTetle'>
               <label className="" htmlFor="">Invoice Dispatcher Agent</label>
              <p>Agentic invoice routing — OCR extraction, LLM <br></br> classification, SMTP dispatch. Zero manual touch</p>
              </div>
              <div className='LiveLinks flex gap-5 text-[30px]'>
                <button className='bg-green-400 text-black'><a href="" className=''>Repository</a></button>
                <button><a href="" className=''>live Demo</a></button>
              </div>
              </div>
              </div>
            <div className="gridcard c1"> <div className='metrix'>91.9%</div> <span>field accuracy</span></div>
            <div className="gridcard c2"><div className='metrix'>{'<1.8s'}</div><span>cycle time</span></div>
            <div className="gridcard m1"><div className='metrix'>0.0</div><span>touch minutes</span></div>
            <div className="gridcard m2"><div className='metrix'>6</div> <span>Pipeline stages</span></div>
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