// Cache utility using sessionStorage

export function setCache(key, data) {
  try {
    const value = JSON.stringify({ data, timestamp: Date.now() });
    sessionStorage.setItem(key, value);
  } catch (e) {
    // Ignore cache errors
  }
}

export function getCache(key, maxAgeMs = 5 * 60 * 1000) { // default 5 min
  try {
    const value = sessionStorage.getItem(key);
    if (!value) return null;
    const { data, timestamp } = JSON.parse(value);
    if (Date.now() - timestamp > maxAgeMs) {
      sessionStorage.removeItem(key);
      return null;
    }
    return data;
  } catch (e) {
    return null;
  }
}

export function clearCache(key) {
  try {
    sessionStorage.removeItem(key);
  } catch (e) {
    // Ignore cache errors
  }
} 