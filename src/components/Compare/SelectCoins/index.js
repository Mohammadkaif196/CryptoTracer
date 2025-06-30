import React from "react";
import  Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./style.css"
import SelectComponent from "../../Coin/Select";

function SelectCrypto({allCoins,
  crypto1,
  crypto2,
  onCoinChange,
  days,
  handleDaysChange, }) {
 
  const style = {
    height: "2.5rem",
    color: "var(--white)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "10px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.3)",
      borderRadius: "10px",
    },
    "& .MuiSvgIcon-root": {
      color: "var(--white)",
    },
    "&:hover": {
      "&& fieldset": {
        borderColor: "#3a80e9",
      },
    },
    "&.Mui-focused": {
      "&& fieldset": {
        borderColor: "#3a80e9",
      },
    },
  };

  const getCoinIcon = (coinId) => {
    const coin = allCoins?.find(c => c.id === coinId);
    return coin?.image || "🪙";
  };

  return (
    <div className="compare-list">
      <div className="selector-grid">
        <div className="selector-group">
          <div className="selector-label">
            <span className="label-icon">🪙</span>
            <span>Crypto 1</span>
          </div>
          <Select
            value={crypto1}
            onChange={(e) => onCoinChange(e, false)}
            sx={style}
            className="crypto-select"
          >
            {allCoins
              ?.filter((coin) => coin.id !== crypto2)
              .map((coin, i) => (
                <MenuItem value={coin.id} key={i} className="crypto-option">
                  <div className="option-content">
                    <img src={coin.image} alt={coin.name} className="option-icon" />
                    <span>{coin.name}</span>
                    <span className="option-symbol">({coin.symbol.toUpperCase()})</span>
                  </div>
                </MenuItem>
              ))}
          </Select>
        </div>

        <div className="selector-group">
          <div className="selector-label">
            <span className="label-icon">🪙</span>
            <span>Crypto 2</span>
          </div>
          <Select
            value={crypto2}
            onChange={(e) => onCoinChange(e, true)}
            sx={style}
            className="crypto-select"
          >
            {allCoins
              ?.filter((coin) => coin.id !== crypto1)
              .map((coin, i) => (
                <MenuItem value={coin.id} key={i} className="crypto-option">
                  <div className="option-content">
                    <img src={coin.image} alt={coin.name} className="option-icon" />
                    <span>{coin.name}</span>
                    <span className="option-symbol">({coin.symbol.toUpperCase()})</span>
                  </div>
                </MenuItem>
              ))}
          </Select>
        </div>

        <div className="selector-group">
          <div className="selector-label">
            <span className="label-icon">📅</span>
            <span>Time Period</span>
          </div>
          <SelectComponent days={days} handleDaysChange={handleDaysChange} text={true}/>
        </div>
      </div>
    </div>
  );
}

export default SelectCrypto;
