import React from 'react'
import "./Project.css"
function Project() {
  return (
    <>
    <div className='projMaster flex h-[800px] w-[100%] text-white border-1 '>
      <div className="projimagesection border-1 h-[100%] w-[50%] p-[15px]">
        <div className="projTitle text-[60px]">Invoice Dispatcher Agent</div>
        <div className="projdesc text-[25px]">AgenticInvoiceDispatcher — LangGraph single-agent invoice routing/dispatch system. Uses LLM-based natural language routing (replaced brittle keyword matching), Tesseract OCR for invoice parsing, and SMTP for email dispatch. Explicitly single-agent — no multi-agent setup, no Postgres checkpointing. One of your three core portfolio projects; you've pitched it in interviews and explored productizing it for small agencies.</div>
      </div>
      <div className="projdesc border-1 h-[100%] w-[50%] "></div>
    </div>
    </>
  )
}

export default Project