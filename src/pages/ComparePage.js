import React, { useState,useEffect } from "react";
import Header from "../components/Common/Header";
import SelectCrypto from "../components/Compare/SelectCoins";
// import SelectComponent from "../components/Coin/Select";
import { getCoins } from "../functions/getCoins";
import { getCoinData } from "../functions/getCoinData";
import { getChartData } from "../functions/gettingChartData";
import { coinObjectSetting } from "../functions/coinObjectSetting";
import {getPriceData} from "../functions/getPricesOfCoin"
import SummaryComponent from "../components/Common/Description"
import LoaderComponent from "../components/Common/Loader"
import List from "../components/Dashboard/List"
import LineChart from "../components/Coin/Charts/"
import PriceTypeChange from "../components/Coin/Toggle"
import MovingNav from"../components/Common/SecondNav";

function ComparePage() {
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");

  const [coin1Data, setCoin1Data] = useState({});
  const [coin2Data, setCoin2Data] = useState({});

  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getDetails();
  }, []);
  
  const getDetails = async () => {
    setLoading(true);
    const coins = await getCoins();
    if (coins) {
      setAllCoins(coins);
      const data1 = await getCoinData(crypto1);
      const data2 = await getCoinData(crypto2);
      coinObjectSetting(data1, setCoin1Data);
      coinObjectSetting(data2, setCoin2Data);
      if (data1 && data2) {
        // getPrices
        const prices1 = await getPriceData(crypto1, days, priceType);
        const prices2 = await getPriceData(crypto2, days, priceType);
        getChartData(setChartData, prices1, prices2);
        setLoading(false);
      }
    }
  };
  
    // const handleChangeCrypto = async (event,coin2) => {
    //   if(coin2){
    //     setCrypto2(event.target.value);
    //     console.log("crypto1 is",event.target.value);
    //   }else{
    //   setCrypto1(event.target.value);
    //   console.log("crypto1 is",event.target.value);
    //   }
    // };

    const onCoinChange = async (e, isCoin2) => {
      const crypto = e.target.value;
      setLoading(true);
      try {
        if (isCoin2) {
          setCrypto2(crypto);
          const data2 = await getCoinData(crypto);
          if (!data2) {
            console.error(`Failed to fetch data for ${crypto}`);
            return;
          }
          coinObjectSetting(data2, setCoin2Data);
        } else {
          setCrypto1(crypto);
          const data1 = await getCoinData(crypto);
          if (!data1) {
            console.error(`Failed to fetch data for ${crypto}`);
            return;
          }
          coinObjectSetting(data1, setCoin1Data);
        }
        const prices1 = await getPriceData(crypto1, days, priceType);
        const prices2 = await getPriceData(crypto2, days, priceType);
        getChartData(setChartData, prices1, prices2);
      } catch (error) {
        console.error("Error during coin change:", error);
      } finally {
        setLoading(false);
      }
    };
    
    const handleDaysChange = async (e) => {
      const newDays = e.target.value;
      setLoading(true);
      setDays(newDays);
      const prices1 = await getPriceData(crypto1, days, priceType);
      const prices2 = await getPriceData(crypto2, days, priceType);
      getChartData(setChartData, prices1, prices2);
      setLoading(false);
    };

    const handlePriceTypeChange = async (e) => {
      const newPriceType = e.target.value;
      setLoading(true);
      setPriceType(newPriceType);
      const prices1 = await getPriceData(crypto1, days, priceType);
      const prices2 = await getPriceData(crypto2, days, priceType);
      getChartData(setChartData, prices1, prices2);
      setLoading(false);
    };
  return (
    <div className="compare-main-list" >
      <Header />
      <MovingNav/>
      {loading || !coin1Data?.id || !coin2Data?.id ? (
        <LoaderComponent />
      ) : (
        <>
          <SelectCrypto
            allCoins={allCoins}
            crypto1={crypto1}
            crypto2={crypto2}
            onCoinChange={onCoinChange}
            days={days}
            handleDaysChange={handleDaysChange}
          />
          <div className="grey-wrapper">
            <List coin={coin1Data} />
          </div>
          <div className="grey-wrapper">
            <List coin={coin2Data} />
          </div>
          <div className="grey-wrapper">
            <PriceTypeChange
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <LineChart chartData={chartData} multiAxis={true} />
          </div>
          <SummaryComponent title={coin1Data.name} desc={coin1Data.desc} />
          <SummaryComponent title={coin2Data.name} desc={coin2Data.desc} />
        </>
      )}
    </div>
  );

}

export default ComparePage;
