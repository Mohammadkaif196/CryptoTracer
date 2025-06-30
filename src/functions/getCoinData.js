import axios from "axios";
import { handleAxiosError, shouldRetry, getRetryDelay } from "./errorHandler";
import { setCache, getCache } from "./cache";

const COIN_DATA_CACHE_PREFIX = "coin_data_";
const CACHE_MAX_AGE = 5 * 60 * 1000; // 5 minutes

export const getCoinData = async (id, retryCount = 0) => {
  const cacheKey = COIN_DATA_CACHE_PREFIX + id;
  // Try cache first
  const cached = getCache(cacheKey, CACHE_MAX_AGE);
  if (cached) {
    return cached;
  }
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
    setCache(cacheKey, response.data);
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error, `fetching coin data for ${id}`);
    
    // Check if we should retry
    if (shouldRetry(error, retryCount)) {
      const delay = getRetryDelay(retryCount);
      console.log(`Retrying in ${delay}ms... (attempt ${retryCount + 1})`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      return getCoinData(id, retryCount + 1);
    }
    
    // If error is too many requests (429) or any error, return cache if available
    const fallback = getCache(cacheKey, 24 * 60 * 60 * 1000); // allow stale cache up to 24h on error
    if (fallback) {
      return fallback;
    }
    return null; // No cache, return null
  }
};