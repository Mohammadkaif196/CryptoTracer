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
function CoinPage() {
  const[coinData,setCoinData]=useState();
  const[isLoading,setIsLoading]=useState(true);
  const[days,setDays]=useState(7);
  const[chartData,setChartData]=useState([]);
  const[Type,setType]=useState("prices");
  const{id}=useParams();
  useEffect(()=>{
    if(id){
        getDetails();
    }      
  },[id]);

  async function getDetails(){
    const cdata=await getCoinData(id);
    if(cdata){
      coinObjectSetting(cdata,setCoinData);
      const prices=await getPriceData(id,days,Type);
      if(prices){
        console.log("sucess");
        getChartData(setChartData, prices);
        setIsLoading(false);
      } 
    }
  }
  const handleDaysChange=async(event)=>{
     setDays(event.target.value);
     setIsLoading(true);
     const prices=await getPriceData(id,days,Type)
     if(prices){
       console.log("sucess");
       getChartData(setChartData,prices);
       setIsLoading(false);
     } 
  }
  const handleChangepriceType=async(event)=>{
    setIsLoading(true);
    setType(event.target.value);
    const prices=await getPriceData(id,days,Type)
    if(prices){
      console.log("sucess");
      getChartData(setChartData,prices);
      setIsLoading(false);
    } 
  }
  return (
    <div>
         <Header/>
         <MovingNav/>
         {isLoading?<LoaderComponent/>:(
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