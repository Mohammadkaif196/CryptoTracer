import React ,{useState,useEffect,useRef}from 'react'
import {Link} from "react-router-dom"
import "./style.css"
import Button from '../../components/Common/Button';
import { motion } from "framer-motion"
import { Card, CardContent, IconButton } from "@mui/material";
import { WhatsApp, Instagram, Email, Close } from "@mui/icons-material";
import usdc from "../../components/images/usdc.png";
import ethereum from "../../components/images/ethereum.png";
import xrp from "../../components/images/xrp.png";
import bitcoin from "../../components/images/bitcoin.png";
import tether from "../../components/images/tether.png";
function MainComponent() {
  const canvasRef = useRef(null);
  const positions = [
    { x: 200, y: 50 },
    { x: 300, y: 150 },
    { x: 250, y: 300 },
    { x: 150, y: 300 },
    { x: 100, y: 150 },
  ];
  const [showPopup, setShowPopup] = useState(false);
  const websiteUrl = "https://example.com";

  const handleShare = (platform) => {
    let shareUrl = "";
    switch (platform) {
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(websiteUrl)}`;
        break;
      case "instagram":
        shareUrl = `https://www.instagram.com/?url=${encodeURIComponent(websiteUrl)}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=Check this out&body=${encodeURIComponent(websiteUrl)}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, "_blank");
  };
  // for rotation images
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 400;
    ctx.strokeStyle = "#7028ad";
    ctx.lineWidth = 4;
    ctx.shadowColor = "blue";
    ctx.shadowBlur = 5;
    ctx.setLineDash([5, 5]); // Dotted line

    function drawLines() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let index = 0;
      
      function drawNextLine() {
        if (index >= positions.length) {
          setTimeout(drawLines, 1000); // Restart after a delay
          return;
        }
        ctx.beginPath();
        ctx.moveTo(positions[index % positions.length].x, positions[index % positions.length].y);
        ctx.lineTo(positions[(index + 1) % positions.length].x, positions[(index + 1) % positions.length].y);
        ctx.stroke();
        index++;
        setTimeout(drawNextLine, 1000); // Slower animation
      }
      drawNextLine();
    }
    drawLines();
  }, []);
 
  
  return (
    <div className='flex-info'>
        <div className='left-component'>
            <motion.h1 className='track-crypto'
           initial={{ opacity: 0, x: 50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.5, duration: 1 }}
           >TrackCrypto</motion.h1>
            <motion.h1 className='real-time'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75, duration: 1 }}
             >Real Time.</motion.h1>
            <motion.p className='info-text'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.25, duration: 1 }} >Tract crypto with real time prices,marketcap value and compare cryptos.</motion.p>
            <motion.div className='btn_flex'
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 1.5, duration: 1 }}>
              <Link to="/dashboard"><Button text={"Dashboard"} onClick={()=>console.log("clicked")}/></Link> 
                <Button text={"Share"} outlined={true} onClick={() => setShowPopup(true)}/>
                {/* for sharing application  */}
                {showPopup && (
        <Card className="absolute p-4 shadow-lg bg-white rounded-lg">
          <CardContent className="flex flex-col gap-3">
            <IconButton onClick={() => handleShare("whatsapp")}>
              <WhatsApp style={{ color: "green" }} />
            </IconButton>
            <IconButton onClick={() => handleShare("instagram")}>
              <Instagram style={{ color: "#E4405F" }} />
            </IconButton>
            <IconButton onClick={() => handleShare("email")}>
              <Email style={{ color: "#D44638" }} />
            </IconButton>
            <IconButton color="error" onClick={() => setShowPopup(false)} className="mt-2">
              <Close />
            </IconButton>
          </CardContent>
        </Card>
      )}
      {/* end here */}
            </motion.div>
        </div>
        <div className='hexagon-container'> 
         <canvas ref={canvasRef} className="hexagon-canvas"></canvas>
        {[bitcoin, ethereum, tether, xrp,usdc ].map((imgSrc, index) => (
         <motion.img
         key={index}
         src={imgSrc}
         alt={`crypto-${index}`}
         className={`hexagon-image pos-${index}`}
         initial={{ opacity: 1, scale: 1 }}
         animate={{ y: [0, -10, 0] }} // Bouncing effect
         transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
       />
        ))}

        </div>
    </div>
   
  )
}

export default MainComponent;