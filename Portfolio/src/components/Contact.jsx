import React from 'react';
import './contact.css'
function handleCopy(){
  
}
function Contact() {
  return (
    <>
    <div className='flex contact h-[800px] w-[100%] p-1 border-1 border-white text-white justify-center items-center'>
      <div className='contact-inner flex flex-col flex-wrap h-[700px] w-[50%] border-1 border-white text-white '>
          <div className='getinTouch'>Get in Touch</div>
         
            <label htmlFor="" >Email</label>
            <div className='EmailComponent flex border-1 border-white'>
              <div className='emailText'>bhavyasachula07@gmail.com</div>
              <button className='text-white border-1 border-white rounded-md' onClick={handleCopy}>Copy</button>
            </div>
          <div className='getinDesc'>Intersted in collaborating in a project, discussing an engineering role, or just want to say hi? Send a note or reach out directly</div>
          <div className='getinLoc grid gap-1 border-1 border-white w-[100%]'> 
          <div className='getcard border-1 border '>
            <div className='title'>Location</div>
            <div className='text text-[25px]'>Ahmedabad,Gujarat</div>
            <div className='title'>IST (UTC +05:30)</div>
          </div>
          <div className='getcard border-1 border '>
            <div className='title'>Availablity</div>
            <div className='text text-[25px]'>Full time & Advisory</div>
            <div className='title'>Open to select projects</div>
          </div>
          </div>
          <div className='socials'>
            <div className="socialcard">
              <div>Github</div>
              <div>
                <svg width="20px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M6 18L18 6M18 6H10M18 6V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            </div>
           <div className="socialcard">
              <div>LinkedIn</div>
              <div>
                <svg width="20px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M6 18L18 6M18 6H10M18 6V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            </div>
            <div className="socialcard">
              <div>X /Twitter</div>
              <div>
                <svg width="20px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M6 18L18 6M18 6H10M18 6V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            </div>
            <div className="socialcard">
              <div>Discord</div>
              <div>
                <svg width="20px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M6 18L18 6M18 6H10M18 6V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default Contact