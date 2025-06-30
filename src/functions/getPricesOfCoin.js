import axios from "axios";
import { handleAxiosError, shouldRetry, getRetryDelay } from "./errorHandler";
import { setCache, getCache } from "./cache";

const PRICE_DATA_CACHE_PREFIX = "price_data_";
const CACHE_MAX_AGE = 5 * 60 * 1000; // 5 minutes

export const getPriceData = async (id, days, Type, retryCount = 0) => {
  const cacheKey = `${PRICE_DATA_CACHE_PREFIX}${id}_${days}_${Type}`;
  // Try cache first
  const cached = getCache(cacheKey, CACHE_MAX_AGE);
  if (cached) {
    return cached;
  }
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
    );
    let result;
    if (response.data) {
      if (Type === "market_caps") {
        result = response.data.market_caps;
      } else if (Type === "total_volumes") {
        result = response.data.total_volumes;
      } else {
        result = response.data.prices;
      }
      setCache(cacheKey, result);
      return result;
    }
    return null;
  } catch (error) {
    const errorMessage = handleAxiosError(error, `fetching price data for ${id}`);
    // Check if we should retry
    if (shouldRetry(error, retryCount)) {
      const delay = getRetryDelay(retryCount);
      console.log(`Retrying in ${delay}ms... (attempt ${retryCount + 1})`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return getPriceData(id, days, Type, retryCount + 1);
    }
    // If error is too many requests (429) or any error, return cache if available
    const fallback = getCache(cacheKey, 24 * 60 * 60 * 1000); // allow stale cache up to 24h on error
    if (fallback) {
      return fallback;
    }
    return null; // No cache, return null
  }
};