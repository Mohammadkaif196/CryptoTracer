import React,{useState,useEffect} from 'react'
import Header from "../components/Common/Header";
import {getCoins} from "../functions/getCoins";
import TabComponent from '../components/Dashboard/Tabs';
import Button from '../components/Common/Button';
import MovingNav from"../components/Common/SecondNav";
function WatchPage() {
    let watchlist=localStorage.getItem("watchlist");
    const[coins,setCoins]=useState([]);
    useEffect(()=>{
       if(watchlist){
        getData();
       }
    },[]);
   const getData=async()=>{
        const details=await getCoins();
        if(details){
            setCoins(details.filter((coin)=> watchlist.includes(coin.id)));
        }
    }
  return (
    <div>
        <Header/>
        <MovingNav/>
       {watchlist?.length>0 ?(
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