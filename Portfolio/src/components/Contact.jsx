import React, { useState } from 'react';
import './contact.css'
function Contact(){
  return (
    <>
    <div className='contact flex h-[800px] w-[100%] p-1 text-white justify-center items-center'>
        <div className='contact-inner flex flex-col h-[700px] w-[50%]  text-white overflow-y-auto'>
          <div className='getinTouch'>Get in Touch.</div>
         
            <label htmlFor="" className='mt-7 mb-2'>EMAIL</label>
            <div className='EmailComponent flex border-1 border-white'>
              <div className='emailText'>bhavyasachula07@gmail.com</div>
              <button className='text-white rounded-md '>Copy</button>
            </div> 
          <div className='getinDesc flex flex-wrap'>Interested in collaborating in a project, discussing an engineering role, or just want to say hi? Send a note or reach out directly</div>
          <div className='getinLoc flex flex-wrap gap-1  w-[100%]'> 
          <div className='getcard'>
            <div className='title'>LOCATION</div>
            <div className='text text-[25px]'>Ahmedabad,Gujarat</div>
            <div className='title'>IST (UTC +05:30)</div>
          </div>
          <div className='getcard'>
            <div className='title'>AVAILABILITY</div>
            <div className='text text-[25px]'>Full time & Advisory</div>
            <div className='title'>Open to select projects</div>
          </div>
          </div>
          <label className='mt-8'>ONLINE</label>
          <div className='socials'>
            <a href="https://github.com/bhavyasachula" target='_blank' className="socialcard">
              <div>Github</div>
              <div >
                <svg width="22px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M6 18L18 6M18 6H10M18 6V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>

            </a>
           <a href="https://linkedin.com/bhavyasachula" target="_blank" className="socialcard">
              <div>LinkedIn</div>
              <div>
                <svg width="22px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M6 18L18 6M18 6H10M18 6V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            </a>
            <a href="https://x.com/SachulaBhavya" target="_blank" className="socialcard">
              <div>X /Twitter</div>
              <div>
                <svg width="22px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M6 18L18 6M18 6H10M18 6V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            </a>
            <a href="https://leetcode.com/u/SabkaBaaap/" target="_blank" className="socialcard">
              <div>LeetCode</div>
              <div>
                <svg width="22px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M6 18L18 6M18 6H10M18 6V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            </a>
          </div>
      </div>
    </div>
    </>
  )
}

export default Contact