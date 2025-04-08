import React,{useState} from "react";
import "./style.css";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Link } from "react-router-dom";
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import {saveToWatchList} from "../../../functions/SaveToWatchList";
import {removeItemToWatchlist} from "../../../functions/RemoveFromWatch"
function Grid({ coin }) {
  const watchlist = localStorage.getItem("watchlist");
  const[isCoinAdded,setIsCoinAdded]=useState(watchlist?.includes(coin.id));
  return (
<Link to={`/coin/${coin.id}`}>
    <div className={`grid-container ${coin.price_change_percentage_24h < 0 && "grid-container-red"}`}>
      <div className="info-flex">
        <img src={coin.image} className="coin-logo" />
        <div className="name-info">
          <p className="coin-name">{coin.name}</p>
          <p className="coin-sym">{coin.symbol}</p>
        </div>
        <div className={`save ${coin.price_change_percentage_24h<0 && "save-red"}`
      } onClick={(e) => {
        if (isCoinAdded) {
          removeItemToWatchlist(e, coin.id, setIsCoinAdded);
        } else {
          saveToWatchList(e, coin.id);
          setIsCoinAdded(true);
          
        }
      }}>{isCoinAdded?<TurnedInIcon/>:  <TurnedInNotIcon/>}
      
        </div>
          
      </div>
      {coin.price_change_percentage_24h > 0 ? (
        <div className="chip-flex">
          <div className="price-list">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </div>
            <div className="chip-up">
            <TrendingUpIcon/>
            </div>
        </div>
      ) : (
        <div className="chip-flex">
          <div className="price-list chip-red">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </div>
          <div className="chip-down">
            <TrendingDownIcon/>
            </div>
        </div>
      )}
      <div className="coin-details">
         <h3 className="coin-price" style={{
          color:coin.price_change_percentage_24h<0?"var(--red)":"var(--green)"
         }}>${coin.current_price.toLocaleString()}</h3>
         <p className="total-volume">Total Volume : {coin.total_volume.toLocaleString()}</p>
         <p className="total-market">Market Cap : ${coin.market_cap.toLocaleString()}</p>
      </div>
    </div>
    </Link>
  );
}

export default Grid;
