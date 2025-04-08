import React, { useState, useEffect } from "react";
import "./style.css";
import { getCoins } from "../../functions/getCoins";
import { coinImageData } from "../../functions/coinImageSetting";
import ImageList from "../Common/ImageFolder";

function Carousal() {
  const [coin, setCoin] = useState([]);

  useEffect(() => {
    getCoinsData();
  }, []);

  const getCoinsData = async () => {
    const details = await getCoins();
    console.log(details);
    if (details) {
      coinImageData(details, setCoin);
    }
  };

  return (
    <div
      className="slider"
      style={{
        "--width": "100px",
        "--height": "50px",
        "--quantity": coin.length || 10,
      }}
    >
      <div className="list">
        {coin.map((item, index) => (
          <div className="item" key={index}>
            <ImageList coin={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousal;
