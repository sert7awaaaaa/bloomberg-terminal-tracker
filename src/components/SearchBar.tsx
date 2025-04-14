
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SearchBarProps {
  onSearch: (symbol: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [symbol, setSymbol] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (symbol.trim()) {
      onSearch(symbol.trim().toUpperCase());
      setSymbol("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-black border border-[#003300]">
      <Input
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="flex-1 bg-[#001100] border-[#003300] text-[#00ff00] placeholder:text-[#004400]"
        placeholder="Enter stock symbol (e.g., AAPL)"
        disabled={isLoading}
      />
      <Button 
        type="submit"
        className="bg-[#001100] text-[#00ff00] border border-[#003300] hover:bg-[#002200] hover:border-[#00ff00]"
        disabled={isLoading}
      >
        {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
      </Button>
    </form>
  );
}
