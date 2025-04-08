import React, { useState, useEffect } from "react";
import "./style.css";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

function BackToTopComponent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Scroll event listener
    const handleScroll = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="back-to-top"
      id="myBtn"
      onClick={scrollToTop}
      style={{ display: visible ? "flex" : "none" }}
    >
      <ArrowUpwardRoundedIcon   className="arrow"/>
    </div>
  );
}

export default BackToTopComponent;
