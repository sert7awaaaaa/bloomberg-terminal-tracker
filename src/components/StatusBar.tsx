
import { BatteryFull, Signal, Clock } from "lucide-react";

export function StatusBar() {
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 h-6 bg-black border-b border-[#003300]">
      <div className="flex items-center gap-1 text-[#00ff00]">
        <Signal size={12} />
        <span className="text-xs">5G</span>
      </div>
      <span className="text-xs font-medium text-[#00ff00]">{getCurrentTime()}</span>
      <div className="flex items-center text-[#00ff00]">
        <BatteryFull size={14} />
      </div>
    </div>
  );
}
