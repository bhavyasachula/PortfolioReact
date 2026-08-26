import React from 'react'
import reactlogo from "../src/assets/reactjslogo.png";
import nodejslogo from "../src/assets/nodejslogo.png";
import pytorchlogo from "../src/assets/pytorchlog.png";
import langsmithlogo from "../src/assets/pytorchlog.png";
import './caraousal.css'

const imageLinks = [
  "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
  reactlogo,
  "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTqrOXX6aDLQETYHcaJWSdReybJBEgLNN3NPwWx8P0iRGnfKkwP",
  "https://storage.googleapis.com/chilipiper-cloud-static/workspace-logos/langchain.com/bd2bda48-ec1b-480c-8468-98e43909e079-93ca5a37-84a1-4aec-ab4e-86c54a01d315.png",
  nodejslogo,
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8cxgwkzgZl9Z7OFj04lWIEZJCD3QeGH_YhdVcjcRAoA&s=10",
  "https://avatars.githubusercontent.com/u/10566080?s=280&v=4",
  "https://avatars.githubusercontent.com/u/18133?s=280&v=4",
  "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/langgraph-color.png",
  pytorchlogo,
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYb9oNbyVvb5J10zWtdj_46nNAfUIko14n8Cb6RudWKxefkunJMyB6zzig&s=10",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Claude_AI_symbol.svg/3840px-Claude_AI_symbol.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail",
  "https://static.vecteezy.com/system/resources/previews/055/687/065/non_2x/gemini-google-icon-symbol-logo-free-png.png",
  langsmithlogo,
  "https://ubos.tech/wp-content/uploads/2023/11/chroma.png",
  "https://avatars.githubusercontent.com/u/156354296?s=280&v=4",
  "https://cdn.iconscout.com/icon/free/png-256/free-postgresql-icon-svg-download-png-1175119.png?f=webp&w=128",
  "https://assets.codeguru.com/uploads/2003/02/C-tutorials.jpg?f=jpeg",
  "https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxvHMT0riO5Ze2r4kAINc_2QgRT1de06pviP2kjjyzFLpCTZZEk1s5nN1tTMNrZUQs52mBPXbxUYT04uiFQgRxAc-&format=source",
  "https://avatars.slack-edge.com/2021-07-28/2335856319233_b1f6442290972bfa5498_512.png",
  "https://images.seeklogo.com/logo-png/45/1/pandas-logo-png_seeklogo-459105.png",
  "https://media.licdn.com/dms/image/v2/D5612AQFSTglfKdI9eg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1708971797430?e=2147483647&v=beta&t=iZKe_LBwW0NSHcz1V9_LsKskeje_BYusBCoctWYnWJ0",
  "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-white-icon.png",
  "https://i0.wp.com/ahex.co/wp-content/uploads/2022/06/d3.png?fit=400%2C400&ssl=1",
  "https://images.seeklogo.com/logo-png/35/1/tailwind-css-logo-png_seeklogo-354675.png"
];
function Caraousal() {
  
  return (
    <>
    <div className='Caraousal'>
        <div className='Group'>
          {
            imageLinks.map((link,i)=>{
              <div className="card" key={i}><img src={link} alt="" /></div>
            })
          }
        </div>
         <div className='Group'>
          {
            imageLinks.map((link,i)=>{
              <div className="card" key={`dup-${i}`}><img src={link} alt="" /></div>
            })
          }
          </div>
    </div>  
    </>
  )
}

export default Caraousal