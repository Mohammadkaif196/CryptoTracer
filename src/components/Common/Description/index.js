import React,{useState}from 'react'
import "./style.css"
function SummaryComponent({heading, desc}) {
  const[flag,setFlag]=useState(false);
  const shortdesc=desc.slice(0,350) + "<span style='color:var(--grey);padding:0.4rem' >Read More...</span>"
  const longdesc=desc + "<p style='color:var(--grey)'>Show Less...</p>";
  return (
    <div className='top-wrapper'>
          <h2 className='coin-heading'>{heading}</h2>
          <p className='coin-details' dangerouslySetInnerHTML={{__html:!flag?shortdesc:longdesc}}
          onClick={()=>setFlag(!flag)}></p>

    </div>
  )
}

export default SummaryComponent