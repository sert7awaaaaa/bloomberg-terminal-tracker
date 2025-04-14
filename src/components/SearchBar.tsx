
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SearchBarProps {
  onSearch: (symbol: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("symbol") as HTMLInputElement;
    if (input.value.trim()) {
      onSearch(input.value.trim().toUpperCase());
      input.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-black border border-[#003300]">
      <Input
        name="symbol"
        className="flex-1 bg-[#001100] border-[#003300] text-[#00ff00] placeholder:text-[#004400]"
        placeholder="Enter stock symbol (e.g., AAPL)"
      />
      <Button 
        type="submit"
        className="bg-[#001100] text-[#00ff00] border border-[#003300] hover:bg-[#002200] hover:border-[#00ff00]"
      >
        <Search size={18} />
      </Button>
    </form>
  );
}
