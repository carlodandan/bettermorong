import { useState, useEffect, useCallback } from 'react';

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  condition: string;
  isDay: boolean;
  time: string;
}

export interface DailyForecast {
  date: string;
  dayLabel: string;
  weatherCode: number;
  condition: string;
  tempMax: number;
  tempMin: number;
  rainProbability: number;
}

export interface WeatherData {
  location: string;
  coordinates: { lat: number; lon: number };
  current: CurrentWeather;
  daily: DailyForecast[];
  lastUpdated: string;
}

export function getWeatherCondition(code: number): string {
  switch (code) {
    case 0:
      return 'Clear Sky';
    case 1:
      return 'Mainly Clear';
    case 2:
      return 'Partly Cloudy';
    case 3:
      return 'Overcast';
    case 45:
    case 48:
      return 'Fog & Mist';
    case 51:
    case 53:
    case 55:
      return 'Light Drizzle';
    case 61:
      return 'Slight Rain';
    case 63:
      return 'Moderate Rain';
    case 65:
      return 'Heavy Rain';
    case 80:
    case 81:
    case 82:
      return 'Rain Showers';
    case 95:
      return 'Thunderstorm';
    case 96:
    case 99:
      return 'Thunderstorm with Hail';
    default:
      return 'Fair Weather';
  }
}

const MORONG_LAT = 14.5128;
const MORONG_LON = 121.2386;
const CACHE_KEY = 'bettermorong_weather_cache';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

// Fallback baseline weather for Morong in case of network issue
const FALLBACK_WEATHER: WeatherData = {
  location: 'Morong, Rizal',
  coordinates: { lat: MORONG_LAT, lon: MORONG_LON },
  current: {
    temperature: 28,
    feelsLike: 31,
    humidity: 78,
    windSpeed: 6,
    weatherCode: 2,
    condition: 'Partly Cloudy',
    isDay: true,
    time: new Date().toISOString(),
  },
  daily: [
    {
      date: new Date().toISOString().split('T')[0],
      dayLabel: 'Today',
      weatherCode: 2,
      condition: 'Partly Cloudy',
      tempMax: 32,
      tempMin: 24,
      rainProbability: 25,
    },
  ],
  lastUpdated: new Date().toISOString(),
};

export function useMorongWeather() {
  const [data, setData] = useState<WeatherData>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
          return parsed.data;
        }
      }
    } catch {
      // Ignore localStorage errors
    }
    return FALLBACK_WEATHER;
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async () => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${MORONG_LAT}&longitude=${MORONG_LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FManila`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Weather service responded with status ${response.status}`
        );
      }

      const json = await response.json();

      const currentData: CurrentWeather = {
        temperature: Math.round(json.current.temperature_2m),
        feelsLike: Math.round(json.current.apparent_temperature),
        humidity: json.current.relative_humidity_2m,
        windSpeed: Math.round(json.current.wind_speed_10m),
        weatherCode: json.current.weather_code,
        condition: getWeatherCondition(json.current.weather_code),
        isDay: json.current.is_day === 1,
        time: json.current.time,
      };

      const dailyData: DailyForecast[] = (json.daily.time || [])
        .slice(0, 5)
        .map((dateStr: string, idx: number) => {
          const dateObj = new Date(dateStr + 'T12:00:00+08:00');
          const dayLabel =
            idx === 0
              ? 'Today'
              : idx === 1
                ? 'Tomorrow'
                : dateObj.toLocaleDateString('en-US', { weekday: 'short' });

          return {
            date: dateStr,
            dayLabel,
            weatherCode: json.daily.weather_code[idx] ?? 0,
            condition: getWeatherCondition(json.daily.weather_code[idx] ?? 0),
            tempMax: Math.round(
              json.daily.temperature_2m_max[idx] ?? currentData.temperature
            ),
            tempMin: Math.round(
              json.daily.temperature_2m_min[idx] ?? currentData.temperature
            ),
            rainProbability: Math.round(
              json.daily.precipitation_probability_max[idx] ?? 0
            ),
          };
        });

      const weatherResult: WeatherData = {
        location: 'Morong, Rizal',
        coordinates: { lat: MORONG_LAT, lon: MORONG_LON },
        current: currentData,
        daily: dailyData,
        lastUpdated: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
      };

      setData(weatherResult);
      try {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), data: weatherResult })
        );
      } catch {
        // Ignore localStorage quota
      }
    } catch (err) {
      console.warn('Failed to fetch live weather from Open-Meteo:', err);
      setError(
        err instanceof Error ? err.message : 'Unable to load live weather'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
    // Refresh weather every 15 minutes
    const interval = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchWeather]);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    void fetchWeather();
  }, [fetchWeather]);

  return {
    data,
    loading,
    error,
    refetch,
  };
}
