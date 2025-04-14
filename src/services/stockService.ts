
// Constants
const API_KEY = "d655f228ca6cf8d390a7319c52b3ce486a5b085a"; // Tiingo API key

export interface StockData {
  symbol: string;
  price: number;
  prevClose: number;
  percentChange: number;
  high: number;
  low: number;
  volume: number;
  timestamp: string;
}

// Function to get the current time
export const getCurrentTime = (): string => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
};

// Format large numbers (K, M, B)
export const formatLargeNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)}B`;
  } else if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  } else {
    return num.toString();
  }
};

// Fetch stock data from Tiingo API
export const fetchStockData = async (symbol: string): Promise<StockData | null> => {
  try {
    // In a production app with backend support, you would make this API call from a server
    // to avoid exposing your API key in client-side code
    const url = `https://api.tiingo.com/iex/${symbol}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (Array.isArray(data) && data.length > 0) {
      const item = data[0];
      const realTimePrice = item.tngoLast || 0;
      const prevClose = item.prevClose || 0;
      const percentChange = prevClose ? ((realTimePrice - prevClose) / prevClose) * 100 : 0;
      
      return {
        symbol,
        price: realTimePrice,
        prevClose,
        percentChange,
        high: item.high || 0,
        low: item.low || 0,
        volume: item.volume || 0,
        timestamp: getCurrentTime()
      };
    }
    
    // If API call fails or returns empty data, use mock data for testing
    return getMockStockData(symbol);
    
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    // Return mock data for testing/fallback
    return getMockStockData(symbol);
  }
};

// Mock stock data generator for testing or API failures
export const getMockStockData = (symbol: string): StockData => {
  const basePrice = 100 + Math.random() * 200;
  const prevClose = basePrice * (0.98 + Math.random() * 0.04);
  const percentChange = ((basePrice - prevClose) / prevClose) * 100;
  
  return {
    symbol,
    price: basePrice,
    prevClose,
    percentChange,
    high: basePrice * 1.02,
    low: basePrice * 0.98,
    volume: Math.floor(1000000 + Math.random() * 10000000),
    timestamp: getCurrentTime()
  };
};
