
import { CloudSun } from "lucide-react";

export function WeatherWidget() {
  return (
    <div className="flex items-center justify-center gap-3 py-2 bg-black border-b border-[#003300]">
      <CloudSun size={16} className="text-[#00ff00]" />
      <span className="text-sm font-bold text-[#00ff00]">24°C</span>
      <span className="text-sm text-[#00ff00] opacity-80">CASABLANCA</span>
    </div>
  );
}
