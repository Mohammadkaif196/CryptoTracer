import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from "../components/Common/Header"
import LoaderComponent from '../components/Common/Loader';
import { coinObjectSetting } from '../functions/coinObjectSetting';
import List from '../components/Dashboard/List';
import SummaryComponent from '../components/Common/Description';
import { getCoinData } from '../functions/getCoinData';
import {getPriceData} from "../functions/getPricesOfCoin"
import LineChart from '../components/Coin/Charts';
import SelectComponent from "../components/Coin/Select"
import { getChartData } from '../functions/gettingChartData';
import PriceTypeChange from "../components/Coin/Toggle";
import MovingNav from"../components/Common/SecondNav";
import ErrorMessage from '../components/Common/ErrorMessage';
import { toast } from "react-toastify";

function CoinPage() {
  const[coinData,setCoinData]=useState();
  const[isLoading,setIsLoading]=useState(true);
  const[error, setError] = useState(null);
  const[days,setDays]=useState(7);
  const[chartData,setChartData]=useState([]);
  const[Type,setType]=useState("prices");
  const{id}=useParams();
  
  useEffect(()=>{
    if(id){
        getDetails();
    }      
  },[id]);

  // Helper to detect cache fallback
  function isCacheFallback(data, cacheKey, maxAge = 5 * 60 * 1000) {
    try {
      const value = sessionStorage.getItem(cacheKey);
      if (!value) return false;
      const { timestamp } = JSON.parse(value);
      // If cache is older than maxAge, it's a fallback
      return Date.now() - timestamp > maxAge;
    } catch {
      return false;
    }
  }

  async function getDetails(){
    try {
      setIsLoading(true);
      setError(null);
      
      const cdata = await getCoinData(id);
      if(cdata){
        // Show toast if fallback to cache
        if (isCacheFallback(cdata, `coin_data_${id}`)) {
          toast.warn("You are seeing cached coin data due to a network or rate limit error. Data may be outdated.");
        }
        coinObjectSetting(cdata,setCoinData);
        const prices = await getPriceData(id,days,Type);
        if(prices){
          // Show toast if fallback to cache
          if (isCacheFallback(prices, `price_data_${id}_${days}_${Type}`)) {
            toast.warn("You are seeing cached price data due to a network or rate limit error. Data may be outdated.");
          }
          console.log("success");
          getChartData(setChartData, prices);
          setIsLoading(false);
        } else {
          setError("Failed to load price data. Please try again later.");
          setIsLoading(false);
        }
      } else {
        setError("Failed to load coin data. Please check if the coin exists.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error in getDetails:", error);
      setError("An error occurred while loading data. Please try again.");
      setIsLoading(false);
    }
  }
  
  const handleDaysChange=async(event)=>{
     try {
       setDays(event.target.value);
       setIsLoading(true);
       setError(null);
       
       const prices = await getPriceData(id,days,Type)
       if(prices){
         // Show toast if fallback to cache
         if (isCacheFallback(prices, `price_data_${id}_${days}_${Type}`)) {
           toast.warn("You are seeing cached price data due to a network or rate limit error. Data may be outdated.");
         }
         console.log("success");
         getChartData(setChartData,prices);
         setIsLoading(false);
       } else {
         setError("Failed to load price data for the selected time period.");
         setIsLoading(false);
       }
     } catch (error) {
       console.error("Error in handleDaysChange:", error);
       setError("Failed to update chart data. Please try again.");
       setIsLoading(false);
     }
  }
  
  const handleChangepriceType=async(event)=>{
    try {
      setIsLoading(true);
      setError(null);
      setType(event.target.value);
      
      const prices = await getPriceData(id,days,Type)
      if(prices){
        // Show toast if fallback to cache
        if (isCacheFallback(prices, `price_data_${id}_${days}_${Type}`)) {
          toast.warn("You are seeing cached price data due to a network or rate limit error. Data may be outdated.");
        }
        console.log("success");
        getChartData(setChartData,prices);
        setIsLoading(false);
      } else {
        setError("Failed to load price data for the selected type.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error in handleChangepriceType:", error);
      setError("Failed to update chart data. Please try again.");
      setIsLoading(false);
    }
  }
  
  return (
    <div>
         <Header/>
         <MovingNav/>
         {isLoading ? (
           <LoaderComponent/>
         ) : error ? (
           <ErrorMessage 
             message={error} 
             onRetry={getDetails}
           />
         ) : (
          <>
          <div className='top-wrapper'> 
            <List coin={coinData}/>
            </div>
            <div className='top-wrapper'> 
              <SelectComponent days={days} handleDaysChange={handleDaysChange}/>
              <PriceTypeChange Type={Type} handleChangepriceType={handleChangepriceType}/>
             <LineChart chartData={chartData}/>
            </div>
            <SummaryComponent heading={coinData.name} desc={coinData.desc}/>
            </>
         )}
    </div>
  )
}

export default CoinPage