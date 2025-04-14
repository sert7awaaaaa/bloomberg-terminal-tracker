
import { useState, useEffect } from "react";
import { CloudSun } from "lucide-react";

interface WeatherData {
  temperature: number;
  location: string;
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData>({ temperature: 24, location: "CASABLANCA" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        // In a production app, this would call the Weatherstack API directly
        // Since we can't use API keys securely in the client, this is mocked
        // const response = await fetch(`http://api.weatherstack.com/current?access_key=YOUR_API_KEY&query=Casablanca`);
        // const data = await response.json();
        
        // For now, we'll simulate a successful API response
        // In a real app with backend support, you would make this call from a server
        setWeather({
          temperature: Math.floor(20 + Math.random() * 10), // Random temp between 20-30
          location: "CASABLANCA"
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
    // Set up an interval to refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-3 py-2 bg-black border-b border-[#003300]">
      <CloudSun size={16} className="text-[#00ff00]" />
      <span className="text-sm font-bold text-[#00ff00]">
        {isLoading ? "--" : `${weather.temperature}°C`}
      </span>
      <span className="text-sm text-[#00ff00] opacity-80">{weather.location}</span>
    </div>
  );
}
