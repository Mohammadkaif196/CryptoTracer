// Utility function to handle axios errors consistently
export const handleAxiosError = (error, context = 'API request') => {
  console.error(`Error in ${context}:`, error);
  
  let errorMessage = 'An unexpected error occurred.';
  
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const data = error.response.data;
    
    switch (status) {
      case 404:
        errorMessage = 'The requested data was not found.';
        break;
      case 429:
        errorMessage = 'Too many requests. Please wait a moment and try again.';
        break;
      case 500:
        errorMessage = 'Server error. Please try again later.';
        break;
      case 503:
        errorMessage = 'Service temporarily unavailable. Please try again later.';
        break;
      default:
        errorMessage = data?.error || `Server error (${status}). Please try again.`;
    }
    
    console.error(`Server error ${status}:`, data);
  } else if (error.request) {
    // Network error
    errorMessage = 'Network error. Please check your internet connection and try again.';
    console.error('Network error:', error.request);
  } else {
    // Other error
    errorMessage = error.message || 'An unexpected error occurred.';
    console.error('Other error:', error.message);
  }
  
  return errorMessage;
};

// Function to check if we should retry the request
export const shouldRetry = (error, retryCount = 0) => {
  const maxRetries = 3;
  
  if (retryCount >= maxRetries) {
    return false;
  }
  
  // Retry on network errors or 5xx server errors
  if (error.request || (error.response && error.response.status >= 500)) {
    return true;
  }
  
  // Don't retry on 4xx client errors (except 429)
  if (error.response && error.response.status >= 400 && error.response.status < 500) {
    return error.response.status === 429; // Only retry rate limit errors
  }
  
  return false;
};

// Function to delay retry attempts
export const getRetryDelay = (retryCount) => {
  // Exponential backoff: 1s, 2s, 4s
  return Math.min(1000 * Math.pow(2, retryCount), 10000);
}; 