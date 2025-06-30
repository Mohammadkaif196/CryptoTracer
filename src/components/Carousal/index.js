import React, { useState, useEffect } from "react";
import "./style.css";
import { getCoins } from "../../functions/getCoins";
import { coinImageData } from "../../functions/coinImageSetting";
import ImageList from "../Common/ImageFolder";

function Carousal() {
  const [coin, setCoin] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCoinsData();
  }, []);

  const getCoinsData = async () => {
    try {
      const details = await getCoins();
      if (details) {
        coinImageData(details, setCoin);
        setError(null);
      } else {
        setError("Failed to load coin data. Please try again later.");
      }
    } catch (error) {
      console.error("Error in getCoinsData:", error);
      setError("Failed to load coin data. Please check your connection.");
    }
  };

  // Duplicate the coin list for seamless infinite scroll
  const displayCoins = [...coin, ...coin];

  if (error) {
    return (
      <div className="slider">
        <div style={{ 
          textAlign: 'center', 
          color: '#fff', 
          padding: '2rem',
          fontSize: '1.1rem'
        }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="slider">
      <div className="list">
        {displayCoins.map((item, index) => (
          <div className="item" key={index}>
            <div className="coin-img-wrapper">
              <ImageList coin={item} />
              <span className="coin-name">{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousal;
