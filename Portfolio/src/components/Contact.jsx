import React from 'react';
import './contact.css'
function Contact() {
  return (
    <>
    <div className='flex contact h-[800px] w-[100%] p-1 border-1 border-white text-white justify-center items-center'>
      <div className='contact-inner flex flex-col h-[600px] w-[50%] border-1 border-white text-white '>
          <div className='getinTouch'>Get in Touch</div>
          <div className='fontApplied'>
            <label htmlFor="Email">Email</label>
            <div></div>
          <div className='getinDesc'>Intersted in collaborating in a project, discussing an engineering role, or just want to say hi? Send a note or reach out directly</div>
          <div className='getinLoc flex border-1 border-white w-[100%]'> 
          <div className='getcard border-1 border w-[50%]'>
            <div className='title'>Location</div>
            <div className='text text-[25px]'>Ahmedabad,Gujarat</div>
            <div className='title'>IST (UTC +05:30)</div>
          </div>
          <div className='getcard border-1 border w-[50%]'>
            <div className='title'>Availablity</div>
            <div className='text text-[25px]'>Full time & Advisory</div>
            <div className='title'>Open to select projects</div>
          </div>
          </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default Contact