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
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--white)",
    },
    "& .MuiSvgIcon-root": {
      color: "var(--white)",
    },
    "&:hover": {
      "&& fieldset": {
        borderColor: "#3a80e9",
      },
    },
  };


  return (
    <div className="compare-list">
        <p>Crypto 1:</p>
        <Select
          value={crypto1}
          onChange={(e) => onCoinChange(e, false)}
          sx={style}
        >
          {allCoins
            ?.filter((coin) => coin.id !== crypto2)
            .map((coin, i) => (
              <MenuItem value={coin.id} key={i}>
                {coin.name}
              </MenuItem>
            ))}
        </Select>
      <p>Crypto 2:</p>
      <Select
          value={crypto2}
          onChange={(e) => onCoinChange(e, false)}
          sx={style}
        >
          {allCoins
            ?.filter((coin) => coin.id !==crypto1)
            .map((coin, i) => (
              <MenuItem value={coin.id} key={i}>
                {coin.name}
              </MenuItem>
            ))}
        </Select>
      <SelectComponent days={days} handleDaysChange={handleDaysChange} text={true}/>
    </div>
  );
}

export default SelectCrypto;
