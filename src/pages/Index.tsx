
import { useState } from "react";
import { StatusBar } from "@/components/StatusBar";
import { WeatherWidget } from "@/components/WeatherWidget";
import { SearchBar } from "@/components/SearchBar";
import { StockCard } from "@/components/StockCard";
import { Navigation } from "@/components/Navigation";

const mockStockData = {
  symbol: "AAPL",
  price: 173.75,
  prevClose: 172.50,
  percentChange: 0.72,
  high: 174.20,
  low: 171.80,
  volume: 52500000,
  timestamp: "14:30"
};

export default function Index() {
  const [currentStock, setCurrentStock] = useState(mockStockData);
  const [recentSearches, setRecentSearches] = useState<typeof mockStockData[]>([]);

  const handleSearch = (symbol: string) => {
    // In a real app, this would fetch actual stock data
    const newStock = {
      ...mockStockData,
      symbol,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      })
    };
    
    setCurrentStock(newStock);
    setRecentSearches(prev => {
      const filtered = prev.filter(stock => stock.symbol !== symbol);
      return [currentStock, ...filtered].slice(0, 4);
    });
  };

  return (
    <div className="min-h-screen bg-black font-mono text-[#00ff00]">
      <StatusBar />
      <div className="pt-6">
        <WeatherWidget />
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
            📈 <span className="font-arabic">الأسهم</span>
          </h1>
          <SearchBar onSearch={handleSearch} />
          <div className="mt-6 space-y-4">
            <StockCard {...currentStock} isMain />
            {recentSearches.length > 0 && (
              <div>
                <h2 className="text-xs uppercase mb-2">Recent Searches</h2>
                <div className="space-y-2">
                  {recentSearches.map((stock) => (
                    <StockCard key={stock.symbol} {...stock} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
}
