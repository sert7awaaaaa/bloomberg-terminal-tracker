
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StockCardProps {
  symbol: string;
  price: number;
  prevClose: number;
  percentChange: number;
  high?: number;
  low?: number;
  volume?: number;
  timestamp?: string;
  isMain?: boolean;
}

export function StockCard({
  symbol,
  price,
  prevClose,
  percentChange,
  high,
  low,
  volume,
  timestamp,
  isMain = false
}: StockCardProps) {
  const formatLargeNumber = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toString();
  };

  const isPositive = percentChange >= 0;
  const priceDiff = Math.abs(price - prevClose);

  return (
    <div className={cn(
      "bg-black border border-[#003300] p-4",
      isMain && "border-l-2 border-l-[#00ff00]"
    )}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xl font-bold text-[#00ff00]">{symbol}</span>
        {timestamp && (
          <span className="text-xs text-[#00ff00]">Updated {timestamp}</span>
        )}
      </div>

      <div className="text-2xl font-bold text-[#00ff00] mb-2">
        ${price.toFixed(2)}
      </div>

      <div className={cn(
        "flex items-center gap-1 text-lg font-bold mb-4",
        isPositive ? "text-[#00ff00]" : "text-red-500"
      )}>
        {isPositive ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
        <span>${priceDiff.toFixed(2)}</span>
        <span>({Math.abs(percentChange).toFixed(2)}%)</span>
      </div>

      {isMain && (
        <>
          <div className="h-px bg-[#003300] my-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-2 border border-[#003300]">
              <div className="text-xs text-[#00ff00] mb-1">PREV CLOSE</div>
              <div className="text-sm font-bold text-[#00ff00]">
                ${prevClose.toFixed(2)}
              </div>
            </div>
            {high && (
              <div className="p-2 border border-[#003300]">
                <div className="text-xs text-[#00ff00] mb-1">HIGH</div>
                <div className="text-sm font-bold text-[#00ff00]">
                  ${high.toFixed(2)}
                </div>
              </div>
            )}
            {low && (
              <div className="p-2 border border-[#003300]">
                <div className="text-xs text-[#00ff00] mb-1">LOW</div>
                <div className="text-sm font-bold text-[#00ff00]">
                  ${low.toFixed(2)}
                </div>
              </div>
            )}
            {volume && (
              <div className="p-2 border border-[#003300]">
                <div className="text-xs text-[#00ff00] mb-1">VOLUME</div>
                <div className="text-sm font-bold text-[#00ff00]">
                  {formatLargeNumber(volume)}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
