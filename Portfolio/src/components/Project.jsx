import React from 'react'
import "./Project.css"
function Project() {
  return (
    <>
    <div className='projMaster flex h-[800px] w-[100%] text-white border-1 '>
      <div className="projSection1  h-[100%] w-[50%] p-[15px]">

        <div className="projTitle text-[60px]">Invoice Dispatcher Agent</div>
        <div className="projDesc text-[25px]">AgenticInvoiceDispatcher — a LangGraph single-agent system that automates invoice routing and dispatch. It uses LLM-based natural language routing (replacing brittle keyword matching) to classify incoming invoices, Tesseract OCR to extract data from them, and SMTP to send them to the right recipient/department automatically.</div>
        <div className='projStats flex flex-wrap justify-around border-1 p-[10px] m-[10px]'>
          <div className="statscard">
            <div className="statsCtitle">EXTRACTION</div>
            <div className="statsvalue">91.9%</div>
            <div className="statsCtitle">FIELD ACCURACY</div>
          </div>
          <div className="statscard">
            <div className="statsCtitle">LATENCY</div>
            <div className="statsvalue">{"<1.8s"}</div>
            <div className="statsCtitle">CYCLE DURATION</div>
          </div>
          <div className="statscard">
            <div className="statsCtitle">DISPATCH</div>
            <div className="statsvalue">0.0 min</div>
            <div className="statsCtitle">ZERO-TOUCH OP</div>
          </div>
        </div>
          <div className='projTechstack'>
            <div className="projTechstacklang">PYTHON</div>
            <div className="projTechstacklang">LANGGRAPH</div>
            <div className="projTechstacklang">LANGCHAIN</div>
            <div className="projTechstacklang">STREAMLIT</div>
          </div>
      </div>
      <div className="ProjMiddleline border-1 m-[5px]">


      </div>
      <div className="projSection2  h-[100%] w-[50%] "></div>
    </div>
    </>
  )
}

export default Project