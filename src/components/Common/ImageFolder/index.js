import React from 'react'
import "./style.css";
function ImageList({ coin }) {
  console.log("Coin Data:", coin); 
  return (
    <>
    <div className="mainImage-container">
      <img src={coin.image} className="image-container" alt={coin.name} />
      <h3>{coin.name}</h3>
    </div>
    </>
  );
}


export default ImageList;