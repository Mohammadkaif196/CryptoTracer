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
  const [hoveredCoin, setHoveredCoin] = useState(null);
  const [angle, setAngle] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });
  const [showPopup, setShowPopup] = useState(false);
  const websiteUrl = "https://example.com";

  // Responsive canvas size
  useEffect(() => {
    function handleResize() {
      const size = Math.min(window.innerWidth * 0.8, 400);
      setDimensions({ width: size, height: size });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Coin images
  const coins = [
    { src: bitcoin, name: 'bitcoin' },
    { src: ethereum, name: 'ethereum' },
    { src: tether, name: 'tether' },
    { src: xrp, name: 'xrp' },
    { src: usdc, name: 'usdc' },
  ];

  // Calculate positions in a circle
  const getPositions = (angleOffset = 0) => {
    const { width, height } = dimensions;
    const radius = width / 2.5;
    const centerX = width / 2;
    const centerY = height / 2;
    return coins.map((_, i) => {
      const theta = (2 * Math.PI * i) / coins.length + angleOffset;
      return {
        x: centerX + radius * Math.cos(theta),
        y: centerY + radius * Math.sin(theta),
      };
    });
  };

  // Animate lines and coins
  useEffect(() => {
    let animationFrame;
    let lastTimestamp = null;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    function draw(currentAngle) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const positions = getPositions(currentAngle);
      // Draw lines
      for (let i = 0; i < positions.length; i++) {
        const from = positions[i];
        const to = positions[(i + 1) % positions.length];
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        // Gradient line
        const grad = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        grad.addColorStop(0, hoveredCoin === i || hoveredCoin === (i + 1) % positions.length ? '#ffcc00' : '#7028ad');
        grad.addColorStop(1, hoveredCoin === i || hoveredCoin === (i + 1) % positions.length ? '#fff700' : '#3a80e9');
        ctx.strokeStyle = grad;
        ctx.lineWidth = hoveredCoin === i || hoveredCoin === (i + 1) % positions.length ? 6 : 4;
        ctx.shadowColor = hoveredCoin === i || hoveredCoin === (i + 1) % positions.length ? '#fff700' : 'blue';
        ctx.shadowBlur = hoveredCoin === i || hoveredCoin === (i + 1) % positions.length ? 15 : 8;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.restore();
      }
    }

    function animate(ts) {
      if (!lastTimestamp) lastTimestamp = ts;
      const delta = ts - lastTimestamp;
      lastTimestamp = ts;
      // Rotate coins
      setAngle((prev) => {
        const newAngle = prev + 0.002 * delta;
        draw(newAngle);
        return newAngle;
      });
      animationFrame = requestAnimationFrame(animate);
    }
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
    // eslint-disable-next-line
  }, [dimensions, hoveredCoin]);

  // Coin positions for rendering
  const positions = getPositions(angle);

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
        <div className='hexagon-container' style={{ width: dimensions.width, height: dimensions.height }}> 
         <canvas ref={canvasRef} className="hexagon-canvas" style={{ width: dimensions.width, height: dimensions.height }}></canvas>
        {coins.map((coin, index) => {
          const pos = positions[index];
          return (
            <motion.img
              key={index}
              src={coin.src}
              alt={`crypto-${index}`}
              className={`hexagon-image`}
              style={{
                left: pos.x - 30, // center the image
                top: pos.y - 30,
                zIndex: hoveredCoin === index ? 2 : 1,
                boxShadow: hoveredCoin === index ? '0 0 30px 10px #fff700' : '0 0 10px 2px #3a80e9',
                border: hoveredCoin === index ? '3px solid #fff700' : '2px solid #ffcc00',
                transition: 'all 0.2s',
                width: hoveredCoin === index ? 70 : 60,
                height: hoveredCoin === index ? 70 : 60,
                cursor: 'pointer',
                position: 'absolute',
              }}
              initial={{ opacity: 1, scale: 1 }}
              animate={{ y: [0, -10, 0] }} // Bouncing effect
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              onMouseEnter={() => setHoveredCoin(index)}
              onMouseLeave={() => setHoveredCoin(null)}
            />
          );
        })}

        </div>
    </div>
   
  )
}

export default MainComponent;