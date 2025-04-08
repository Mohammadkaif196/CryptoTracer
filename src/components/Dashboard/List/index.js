import React,{useState} from "react";
import "./style.css";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { Tooltip } from "@mui/material";
import { convertNumber } from "../../../functions/ConvertNumber";
import {Link} from "react-router-dom";
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import {saveToWatchList} from "../../../functions/SaveToWatchList";
import {removeItemToWatchlist} from "../../../functions/RemoveFromWatch"
function List({ coin }) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [isCoinAdded, setIsCoinAdded] = useState(watchlist?.includes(coin.id));
  return (
    <Link to={`/coin/${coin.id}`}>
    <tr className="table-row">
        <Tooltip title="image" placement="bottom">
      <td className="info-flex">
        <img src={coin.image} className="coin-logo td-image" />
      </td>
      </Tooltip>
      <Tooltip title="info" placement="bottom">
      <td>
        <div className="name-info">
          <p className="coin-name">{coin.name}</p>
          <p className="coin-sym">{coin.symbol}</p>
        </div>
      </td>
      </Tooltip>
      {coin.price_change_percentage_24h > 0 ? (
            <Tooltip title="price_change_percentage_24h" placement="bottom">
        <td className="chip-flex">
          <div className="price-list">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </div>
          <div className="chip-up td-icon">
            <TrendingUpIcon />
          </div>
        </td>
        </Tooltip>
      ) : (
        <Tooltip title="price" placement="bottom">
        <td className="chip-flex">
          <div className="price-list chip-red">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </div>
          <div className="chip-down td-icon">
            <TrendingDownIcon />
          </div>
        </td>
        </Tooltip>
      )}
      <Tooltip title="Current price" placement="bottom">
        <td>
          <h3
            className="coin-price td-center-price"
            style={{
              color:
                coin.price_change_percentage_24h < 0
                  ? "var(--red)"
                  : "var(--green)",
            }}
          >
            ${coin.current_price.toLocaleString()}
          </h3>
        </td>
      </Tooltip>
      <Tooltip title="Total Volume" placement="bottom">
      <td>
        <p className="total-volume td-right td-total-volume">
          {coin.total_volume.toLocaleString()}
        </p>
      </td>
      </Tooltip>
      <Tooltip title="MarketCap" placement="bottom">
      <td className="market-normal">
        <p className="total-market td-right">
          ${coin.market_cap.toLocaleString()}
        </p>
      </td>
      </Tooltip>
      {/* for mobile view */}
      <Tooltip title="MarketCap" placement="bottom">
      <td className="market-mobile">
        <p className="total-market td-right">
          {convertNumber(coin.market_cap)}
        </p>
      </td>
      </Tooltip>
      <td
          className={`save ${coin.price_change_percentage_24h<0 && "save-red"}`
        }
          onClick={(e) => {
                  if (isCoinAdded) {
                    removeItemToWatchlist(e, coin.id, setIsCoinAdded);
                  } else {
                    setIsCoinAdded(true);
                    saveToWatchList(e, coin.id);
                  }
                }}
        >
          {isCoinAdded?<TurnedInIcon/>:  <TurnedInNotIcon/>}
        </td>
    </tr>
    </Link>
  );
}

export default List;
