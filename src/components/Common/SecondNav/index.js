import { useEffect, useRef } from "react";
import "./style.css";

function MovingNav() {
  const textRef = useRef(null);

  useEffect(() => {
    const animateText = () => {
      if (!textRef.current) return; // Ensure element exists before applying styles

      textRef.current.style.transform = "translateX(-100%)";
      textRef.current.style.transition = "transform 8s linear";

      setTimeout(() => {
        if (!textRef.current) return; // Double-check before applying styles
        textRef.current.style.transition = "none";
        textRef.current.style.transform = "translateX(100%)";
        requestAnimationFrame(animateText);
      }, 8000);
    };

    animateText();

    return () => {
      if (textRef.current) textRef.current.style.transition = "none"; // Cleanup
    };
  }, []);

  return (
    <div className="container">
      <div ref={textRef} className="glowing-text">
        Please Wait or Refresh Browser,if data doesn't appear.It take few seconds to Fetch it... 🌐
      </div>
    </div>
  );
}

export default MovingNav;
