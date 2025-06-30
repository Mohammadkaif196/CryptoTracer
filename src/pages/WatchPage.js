import React,{useState,useEffect} from 'react'
import Header from "../components/Common/Header";
import {getCoins} from "../functions/getCoins";
import TabComponent from '../components/Dashboard/Tabs';
import Button from '../components/Common/Button';
import MovingNav from"../components/Common/SecondNav";
import { toast } from "react-toastify";

function WatchPage() {
    let watchlist=localStorage.getItem("watchlist");
    const[coins,setCoins]=useState([]);
    const[error, setError] = useState(null);
    const[loading, setLoading] = useState(false);
    
    useEffect(()=>{
       if(watchlist){
        getData();
       }
    },[]);
    
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
   const getData=async()=>{
        try {
          setLoading(true);
          setError(null);
          
          const details=await getCoins();
          if(details){
              // Show toast if fallback to cache
              if (isCacheFallback(details, "coins_data")) {
                toast.warn("You are seeing cached data due to a network or rate limit error. Data may be outdated.");
              }
              setCoins(details.filter((coin)=> watchlist.includes(coin.id)));
              setLoading(false);
          } else {
              setError("Failed to load watchlist data. Please try again later.");
              setLoading(false);
          }
        } catch (error) {
          console.error("Error in getData:", error);
          setError("Failed to load watchlist data. Please check your connection.");
          setLoading(false);
        }
    }
    
  return (
    <div>
        <Header/>
        <MovingNav/>
        {loading ? (
          <div style={{ textAlign: "center", margin: "2rem" }}>
            Loading watchlist...
          </div>
        ) : error ? (
          <div style={{ 
            textAlign: "center", 
            color: '#ff6b6b', 
            margin: "2rem",
            fontSize: '1.1rem',
            padding: '1rem',
            backgroundColor: 'rgba(255, 107, 107, 0.1)',
            borderRadius: '8px'
          }}>
            {error}
          </div>
        ) : watchlist?.length>0 ?(
           <TabComponent coins={coins}/>
       ):(
        <div>
        <h1 style={{ textAlign: "center" }}>
          Sorry, No Items In The Watchlist.
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "2rem",
          }}
        >
          <a href="/dashboard">
            <Button text="Dashboard" />
          </a>
        </div>
      </div>
       )}
    </div>
  )
}

export default WatchPage