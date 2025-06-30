import axios from "axios";
import { handleAxiosError, shouldRetry, getRetryDelay } from "./errorHandler";
import { setCache, getCache } from "./cache";

const COINS_CACHE_KEY = "coins_data";
const CACHE_MAX_AGE = 5 * 60 * 1000; // 5 minutes

export const getCoins = async (retryCount = 0) => {
  // Try cache first
  const cached = getCache(COINS_CACHE_KEY, CACHE_MAX_AGE);
  if (cached) {
    return cached;
  }
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    setCache(COINS_CACHE_KEY, response.data);
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error, 'fetching coins');
    
    // Check if we should retry
    if (shouldRetry(error, retryCount)) {
      const delay = getRetryDelay(retryCount);
      console.log(`Retrying in ${delay}ms... (attempt ${retryCount + 1})`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      return getCoins(retryCount + 1);
    }
    
    // If error is too many requests (429) or any error, return cache if available
    const fallback = getCache(COINS_CACHE_KEY, 24 * 60 * 60 * 1000); // allow stale cache up to 24h on error
    if (fallback) {
      // Optionally, you can set a flag or message to show user this is cached data
      return fallback;
    }
    return null; // No cache, return null
  }
};