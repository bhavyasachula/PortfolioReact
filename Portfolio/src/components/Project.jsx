import React from 'react'
import "./Project.css"
function Project() {
  return (
    <>
    <div className='projMaster flex flex-wrap h-[770px] w-[100%] mt-[15px] text-white border-1 '>
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
            <div className="projTechstacklang">--PYTHON</div>
            <div className="projTechstacklang">--LANGGRAPH</div>
            <div className="projTechstacklang">--LANGCHAIN</div>
            <div className="projTechstacklang">--STREAMLIT</div>
          </div>
          <div className="liveDemo flex w-[100%] p-[10px] h-[90px]">
            <a className="liveDemoButton" href='https://github.com/bhavyasachula/agentic-billbot-pro' target='_blank'>
              <div className="content">View Repository</div>
              <div className="content"><svg width="35px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M6 18L18 6M18 6H10M18 6V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            </a>
            
            <a className="liveDemoButton" href='http://flowchat.streamlit.app/' target='_blank'>
              <div className="content">Live Demo</div>
              <div className="content"><svg width="35px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M6 18L18 6M18 6H10M18 6V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            </a>

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