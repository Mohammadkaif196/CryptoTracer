import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Common/Header";
import TabComponent from "../components/Dashboard/Tabs";
import Search from "../components/Dashboard/Search";
import PaginationComponent from "../components/Dashboard/Pagination";
import LoaderComponent from "../components/Common/Loader";
import BackToTopComponent from "../components/Common/BackToTop"
import MovingNav from "../components/Common/SecondNav";
import "./dashboard.css";
import { getCoins } from "../functions/getCoins";
import { toast } from "react-toastify";

function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalMarketCap, setTotalMarketCap] = useState(0);
  const [totalVolume, setTotalVolume] = useState(0);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  
  const filterCoins = coins.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase())
  );

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

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    (async () => {
      try {
        const allCoins = await getCoins();
        if (allCoins) {
          // Show toast if fallback to cache
          if (isCacheFallback(allCoins, "coins_data")) {
            toast.warn("You are seeing cached data due to a network or rate limit error. Data may be outdated.");
          }
          // Paginate manually since API returns all coins
          const perPage = 12;
          const start = (page - 1) * perPage;
          const paginated = allCoins.slice(start, start + perPage);
          setCoins(paginated);
          // Calculate totals for stats
          const marketCapSum = allCoins.reduce((sum, coin) => sum + coin.market_cap, 0);
          const volumeSum = allCoins.reduce((sum, coin) => sum + coin.total_volume, 0);
          setTotalMarketCap(marketCapSum);
          setTotalVolume(volumeSum);
          setIsLoading(false);
        } else {
          setError("Failed to load data. Please check your connection or try again later.");
          setIsLoading(false);
        }
      } catch (error) {
        setError("Failed to load data. Please check your connection or try again later.");
        setIsLoading(false);
      }
    })();
  }, [page]);

  return (
    <div className="dashboard-container">
      <Header />
      <MovingNav/>
      
      {/* Enhanced Dashboard Header */}
      <div className="dashboard-header">
        <div className="dashboard-hero">
          <div className="hero-content">
            <h1 className="dashboard-title">
              <span className="title-icon">📊</span>
              Crypto Market Dashboard
            </h1>
            <p className="dashboard-subtitle">
              Explore the world's top cryptocurrencies with real-time data and insights
            </p>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <span className="stat-value">${(totalMarketCap / 1e12).toFixed(2)}T</span>
                <span className="stat-label">Total Market Cap</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📈</div>
              <div className="stat-content">
                <span className="stat-value">${(totalVolume / 1e9).toFixed(2)}B</span>
                <span className="stat-label">24h Volume</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🪙</div>
              <div className="stat-content">
                <span className="stat-value">{coins.length}</span>
                <span className="stat-label">Active Coins</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-section">
          <LoaderComponent />
          <p className="loading-text">Loading market data...</p>
        </div>
      ) : error ? (
        <div className="error-section">
          <div className="error-card">
            <div className="error-icon">⚠️</div>
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button className="retry-btn" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <div className="dashboard-content">
          {/* Enhanced Search Section */}
          <div className="search-section">
            <Search search={search} onSearchChange={onSearchChange} />
            {search && (
              <div className="search-results">
                <span className="results-count">
                  Found {filterCoins.length} result{filterCoins.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>

          {/* Enhanced Tabs Section */}
          <div className="tabs-section">
            {coins.length === 0 ? (
              <div className="no-data-section">
                <div className="no-data-card">
                  <div className="no-data-icon">🔍</div>
                  <h3>No data found</h3>
                  <p>Try adjusting your search criteria or check back later.</p>
                </div>
              </div>
            ) : (
              <TabComponent coins={search ? filterCoins : coins} />
            )}
          </div>

          {/* Enhanced Pagination */}
          {!search && (
            <div className="pagination-section">
              <PaginationComponent
                page={page}
                handlePageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      )}
      
      <BackToTopComponent />
    </div>
  );
}

export default DashboardPage;
