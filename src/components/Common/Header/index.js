import React from 'react'
import "./style.css";
import TemporaryDrawer from './TemporaryDrawer';
import Button from '../Button';
import {Link} from "react-router-dom"
function index() {
  return (
    <div className="navbar">
      <h1 className="logo">CryptoTracer <span style={{color:"var(--blue)"}}>.</span></h1>

      <div className="links">
         <Link to="/"><p className="link">
          Home</p></Link>
          <Link to="/compare"><p className="link">
          Compare</p></Link>
          <Link to="/watchlist"><p className="link">WatchList
          </p></Link>
          <Link to="/dashboard">
          <Button text={"Dashboard"} onClick={()=>console.log("clicked")}/>
          </Link>
          {/* <a href="/">
          <Button text={"Share"} outlined={true}
           onClick={console.log("btn clicked")}/></a> */}
      </div>
      <div className="responsive">
        <TemporaryDrawer/>
      </div>
    </div>
  )
}

export default index