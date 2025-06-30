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
import "./style.css";
import { toast } from "react-toastify";

function ComparePage() {
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

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

  const getDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const coins = await getCoins();
      if (coins) {
        // Show toast if fallback to cache
        if (isCacheFallback(coins, "coins_data")) {
          toast.warn("You are seeing cached data due to a network or rate limit error. Data may be outdated.");
        }
        setAllCoins(coins);
        // Fetch both coins in parallel
        const [data1, data2] = await Promise.all([
          getCoinData(crypto1),
          getCoinData(crypto2)
        ]);
        
        if (data1 && data2) {
          // Show toast if fallback to cache
          if (isCacheFallback(data1, `coin_data_${crypto1}`) || isCacheFallback(data2, `coin_data_${crypto2}`)) {
            toast.warn("You are seeing cached coin data due to a network or rate limit error. Data may be outdated.");
          }
          coinObjectSetting(data1, setCoin1Data);
          coinObjectSetting(data2, setCoin2Data);
          
          // Fetch prices in parallel
          const [prices1, prices2] = await Promise.all([
            getPriceData(crypto1, days, priceType),
            getPriceData(crypto2, days, priceType)
          ]);
          
          if (prices1 && prices2) {
            // Show toast if fallback to cache
            if (
              isCacheFallback(prices1, `price_data_${crypto1}_${days}_${priceType}`) ||
              isCacheFallback(prices2, `price_data_${crypto2}_${days}_${priceType}`)
            ) {
              toast.warn("You are seeing cached price data due to a network or rate limit error. Data may be outdated.");
            }
            getChartData(setChartData, prices1, prices2);
            setLoading(false);
          } else {
            setError("Failed to load price data for comparison.");
            setLoading(false);
          }
        } else {
          setError("Failed to load coin data for comparison.");
          setLoading(false);
        }
      } else {
        setError("Failed to load coin list. Please try again later.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error in getDetails:", error);
      setError("An error occurred while loading comparison data.");
      setLoading(false);
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
      try {
        setLoading(true);
        setError(null);
        setIsAnimating(true);
        
        let updatedCrypto1 = crypto1;
        let updatedCrypto2 = crypto2;
        
        if (isCoin2) {
          setCrypto2(crypto);
          updatedCrypto2 = crypto;
          const data2 = await getCoinData(crypto);
          if (!data2) {
            setError(`Failed to fetch data for ${crypto}`);
            setLoading(false);
            setIsAnimating(false);
            return;
          }
          coinObjectSetting(data2, setCoin2Data);
        } else {
          setCrypto1(crypto);
          updatedCrypto1 = crypto;
          const data1 = await getCoinData(crypto);
          if (!data1) {
            setError(`Failed to fetch data for ${crypto}`);
            setLoading(false);
            setIsAnimating(false);
            return;
          }
          coinObjectSetting(data1, setCoin1Data);
        }
        
        // Use the updated crypto values for fetching price data
        const prices1 = await getPriceData(updatedCrypto1, days, priceType);
        const prices2 = await getPriceData(updatedCrypto2, days, priceType);
        
        console.log('Chart data update:', {
          crypto1: updatedCrypto1,
          crypto2: updatedCrypto2,
          prices1Length: prices1?.length,
          prices2Length: prices2?.length,
          days,
          priceType
        });
        
        if (prices1 && prices2) {
          getChartData(setChartData, prices1, prices2);
        } else {
          setError("Failed to load price data for chart update.");
        }
      } catch (error) {
        console.error("Error during coin change:", error);
        setError("Failed to update comparison data.");
      } finally {
        setLoading(false);
        setTimeout(() => setIsAnimating(false), 500);
      }
    };
    
    const handleDaysChange = async (e) => {
      const newDays = e.target.value;
      try {
        setLoading(true);
        setError(null);
        setIsAnimating(true);
        setDays(newDays);
        
        // Use the new days value for fetching price data
        const prices1 = await getPriceData(crypto1, newDays, priceType);
        const prices2 = await getPriceData(crypto2, newDays, priceType);
        
        if (prices1 && prices2) {
          getChartData(setChartData, prices1, prices2);
        } else {
          setError("Failed to load price data for the selected time period.");
        }
      } catch (error) {
        console.error("Error in handleDaysChange:", error);
        setError("Failed to update chart data.");
      } finally {
        setLoading(false);
        setTimeout(() => setIsAnimating(false), 500);
      }
    };

    const handlePriceTypeChange = async (event, newPriceType) => {
      if (newPriceType === null) return; // Prevent deselection
      
      try {
        setLoading(true);
        setError(null);
        setIsAnimating(true);
        setPriceType(newPriceType);
        
        // Use the new price type value for fetching price data
        const prices1 = await getPriceData(crypto1, days, newPriceType);
        const prices2 = await getPriceData(crypto2, days, newPriceType);
        
        if (prices1 && prices2) {
          getChartData(setChartData, prices1, prices2);
        } else {
          setError("Failed to load price data for the selected type.");
        }
      } catch (error) {
        console.error("Error in handlePriceTypeChange:", error);
        setError("Failed to update chart data.");
      } finally {
        setLoading(false);
        setTimeout(() => setIsAnimating(false), 500);
      }
    };
    
  return (
    <div className="compare-main-list">
      <Header />
      <MovingNav/>
      
      {/* Creative Header */}
      <div className="compare-header">
        <div className="compare-title">
          <h1>🔄 Crypto Comparison</h1>
          <p>Compare cryptocurrencies side by side with real-time data</p>
        </div>
        <div className="compare-stats">
          <div className="stat-card">
            <span className="stat-number">{allCoins.length}</span>
            <span className="stat-label">Cryptocurrencies</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Live Data</span>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <LoaderComponent />
          <p className="loading-text">Analyzing market data...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <div className="error-message">{error}</div>
          <button className="retry-button" onClick={getDetails}>
            Try Again
          </button>
        </div>
      ) : !coin1Data?.id || !coin2Data?.id ? (
        <div className="no-data-container">
          <div className="no-data-icon">📊</div>
          <div className="no-data-message">No data available for comparison.</div>
        </div>
      ) : (
        <div className={`compare-content ${isAnimating ? 'animating' : ''}`}>
          {/* Enhanced Selector Section */}
          <div className="selector-section">
            <SelectCrypto
              allCoins={allCoins}
              crypto1={crypto1}
              crypto2={crypto2}
              onCoinChange={onCoinChange}
              days={days}
              handleDaysChange={handleDaysChange}
            />
          </div>
          
          {/* Coin Cards with Enhanced Styling */}
          <div className="coin-cards-container">
            <div className="coin-card coin-card-1">
              <div className="coin-card-header">
                <div className="coin-rank">#1</div>
                <div className="coin-trend">
                  {coin1Data.price_change_percentage_24h > 0 ? '📈' : '📉'}
                </div>
              </div>
              <List coin={coin1Data} />
              
            </div>
            <div className="vs-indicator">
              <div className="vs-circle">VS</div>
            </div>
            
           
            <div className="coin-card coin-card-2">
              <div className="coin-card-header">
                <div className="coin-rank">#2</div>
                <div className="coin-trend">
                  {coin2Data.price_change_percentage_24h > 0 ? '📈' : '📉'}
                </div>
              </div>
              <List coin={coin2Data} />
            </div>
          </div>
          
          {/* Enhanced Chart Section */}
          <div className="chart-section">
            <div className="chart-header">
              <h3>📈 Price Comparison Chart</h3>
              <div className="chart-controls">
                <PriceTypeChange
                  Type={priceType}
                  handleChangepriceType={handlePriceTypeChange}
                />
              </div>
            </div>
            <div className="chart-container">
              <LineChart chartData={chartData} multiAxis={true} />
            </div>
          </div>
          
          {/* Enhanced Summary Section */}
          <div className="summary-section">
            <div className="summary-card">
              <SummaryComponent title={coin1Data.name} desc={coin1Data.desc} />
            </div>
            <div className="summary-card">
              <SummaryComponent title={coin2Data.name} desc={coin2Data.desc} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComparePage;
