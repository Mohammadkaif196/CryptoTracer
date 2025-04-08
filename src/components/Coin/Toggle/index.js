import React,{useState} from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "./style.css"
export default function PriceTypeChange({Type,handleChangepriceType}) {

  return (
    <div className='toggle-list'>
    <ToggleButtonGroup
      value={Type}
      exclusive
      onChange={handleChangepriceType}
      sx={{
        "&.Mui-selected": {
          color: "var(--blue) !important",
        },
        borderColor: "var(--blue)",
        border: "unset !important",
        "& .MuiToggleButtonGroup-grouped": {
          border: "1px solid var(--blue)!important",
          borderColor: "unset",
          color: "var(--blue) !important ",
        },
        "& .MuiToggleButton-standard": {
          color: "var(--blue) !important",
        },
      }}
    >
      <ToggleButton value="prices" className='toggle-btn' >
            Prices
      </ToggleButton>
      <ToggleButton value="market_caps" className='toggle-btn' >
         MarketCap
      </ToggleButton>
      <ToggleButton value="total_volumes" className='toggle-btn'>
        TotalVolume
      </ToggleButton>
         
    </ToggleButtonGroup>
    </div>
  );
}
