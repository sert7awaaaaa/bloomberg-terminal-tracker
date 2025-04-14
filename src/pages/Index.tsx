
import { useState, useEffect } from "react";
import { StatusBar } from "@/components/StatusBar";
import { WeatherWidget } from "@/components/WeatherWidget";
import { SearchBar } from "@/components/SearchBar";
import { StockCard } from "@/components/StockCard";
import { Navigation } from "@/components/Navigation";
import { fetchStockData, StockData } from "@/services/stockService";
import { useToast } from "@/hooks/use-toast";

export default function Index() {
  const [currentStock, setCurrentStock] = useState<StockData | null>(null);
  const [recentSearches, setRecentSearches] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  // Load default stock on first render
  useEffect(() => {
    const loadDefaultStock = async () => {
      if (!currentStock) {
        setIsLoading(true);
        try {
          const stockData = await fetchStockData("AAPL");
          if (stockData) {
            setCurrentStock(stockData);
          }
        } catch (error) {
          console.error("Error loading default stock:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadDefaultStock();
  }, []);

  const handleSearch = async (symbol: string) => {
    if (!symbol) {
      toast({
        title: "Error",
        description: "Please enter a stock symbol",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const stockData = await fetchStockData(symbol);
      
      if (stockData) {
        // Update recent searches
        if (currentStock) {
          updateRecentSearches(currentStock);
        }
        
        // Set as current stock
        setCurrentStock(stockData);
        
        toast({
          title: "Success",
          description: `Loaded ${symbol} stock data`,
        });
      } else {
        toast({
          title: "Error",
          description: `Could not find stock data for ${symbol}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      toast({
        title: "Error",
        description: `Failed to load stock data for ${symbol}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateRecentSearches = (stock: StockData) => {
    setRecentSearches(prev => {
      // Remove if already exists
      const filtered = prev.filter(item => item.symbol !== stock.symbol);
      // Add to beginning and limit to 4 items
      return [stock, ...filtered].slice(0, 4);
    });
  };

  return (
    <div className="min-h-screen bg-black font-mono text-[#00ff00] font-['JetBrains_Mono',monospace]">
      <StatusBar />
      <div className="pt-6">
        <WeatherWidget />
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
            📈 <span className="font-arabic">الأسهم</span>
          </h1>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          <div className="mt-6 space-y-4">
            {currentStock && <StockCard {...currentStock} isMain />}
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
