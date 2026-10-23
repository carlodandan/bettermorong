import React from 'react';
import { usePhilippineTime } from '../../hooks/usePhilippineTime';
import {
  useMorongWeather,
  type DailyForecast,
} from '../../hooks/useMorongWeather';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  Clock,
  Droplets,
  Wind,
  Thermometer,
  ShieldCheck,
  RefreshCw,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router';

function getWeatherIcon(code: number, className = 'h-5 w-5') {
  switch (code) {
    case 0:
      return (
        <Sun className={`${className} text-amber-500`} aria-hidden="true" />
      );
    case 1:
    case 2:
      return (
        <CloudSun
          className={`${className} text-amber-500`}
          aria-hidden="true"
        />
      );
    case 3:
      return (
        <Cloud className={`${className} text-slate-500`} aria-hidden="true" />
      );
    case 45:
    case 48:
      return (
        <CloudFog
          className={`${className} text-slate-400`}
          aria-hidden="true"
        />
      );
    case 51:
    case 53:
    case 55:
      return (
        <CloudDrizzle
          className={`${className} text-blue-400`}
          aria-hidden="true"
        />
      );
    case 61:
    case 63:
    case 65:
    case 80:
    case 81:
    case 82:
      return (
        <CloudRain
          className={`${className} text-blue-500`}
          aria-hidden="true"
        />
      );
    case 95:
    case 96:
    case 99:
      return (
        <CloudLightning
          className={`${className} text-purple-600`}
          aria-hidden="true"
        />
      );
    default:
      return (
        <CloudSun
          className={`${className} text-amber-500`}
          aria-hidden="true"
        />
      );
  }
}

export const MorongWeatherWidget: React.FC = () => {
  const pst = usePhilippineTime();
  const { data: weather, loading, refetch } = useMorongWeather();

  return (
    <section className="py-10 md:py-14 bg-slate-50 border-t border-gray-200">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Bar: Philippine Standard Time & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-1">
              <MapPin className="h-3 w-3 text-blue-600" aria-hidden="true" />
              Morong, Rizal (Region IV-A CALABARZON)
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-950 tracking-tight">
              Philippine Standard Time & Morong Weather
            </h2>
          </div>

          {/* Dynamic PST Clock Card */}
          <div className="inline-flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-2xs">
            <div className="p-2 bg-primary-50 rounded-lg text-primary-700 shrink-0">
              <Clock className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary-800">
                Philippine Standard Time (PST / PHT)
              </div>
              <div className="text-sm md:text-base font-mono font-bold text-gray-900 leading-tight">
                {pst.timeString}
              </div>
              <div className="text-xs text-gray-500">
                {pst.dayString}, {pst.dateString} • UTC+8
              </div>
            </div>
          </div>
        </div>

        {/* Main Weather Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Current Conditions Block */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Current Local Weather
                </span>
                <button
                  type="button"
                  onClick={() => refetch()}
                  disabled={loading}
                  className="text-xs text-primary-700 hover:text-primary-800 font-semibold inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  aria-label="Refresh weather data"
                >
                  <RefreshCw
                    className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`}
                    aria-hidden="true"
                  />
                  <span>
                    {loading ? 'Updating...' : `Updated ${weather.lastUpdated}`}
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-5">
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100">
                  {getWeatherIcon(
                    weather.current.weatherCode,
                    'h-12 w-12 md:h-14 md:w-14'
                  )}
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight flex items-baseline">
                    {weather.current.temperature}
                    <span className="text-xl md:text-2xl font-bold text-gray-500 ml-1">
                      °C
                    </span>
                  </div>
                  <div className="text-base font-bold text-gray-800 mt-0.5">
                    {weather.current.condition}
                  </div>
                  <div className="text-xs text-gray-500">
                    Feels like {weather.current.feelsLike}°C
                  </div>
                </div>
              </div>

              {/* Metrics Pill Grid */}
              <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-100 text-center">
                <div className="bg-slate-50 rounded-xl p-2.5">
                  <div className="flex items-center justify-center text-blue-600 mb-1">
                    <Droplets className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="text-xs font-bold text-gray-900">
                    {weather.current.humidity}%
                  </div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Humidity
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-2.5">
                  <div className="flex items-center justify-center text-teal-600 mb-1">
                    <Wind className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="text-xs font-bold text-gray-900">
                    {weather.current.windSpeed} km/h
                  </div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Wind
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-2.5">
                  <div className="flex items-center justify-center text-amber-600 mb-1">
                    <Thermometer className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="text-xs font-bold text-gray-900">
                    {weather.current.feelsLike}°C
                  </div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Heat Index
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Day Outlook Grid */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  5-Day Morong Forecast Outlook
                </span>
                <span className="text-xs text-gray-500">
                  Public Meteorological Model
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {weather.daily.map((day: DailyForecast, index: number) => (
                  <div
                    key={day.date}
                    className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all ${
                      index === 0
                        ? 'bg-primary-50/50 border-primary-200 shadow-2xs'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <span className="text-xs font-bold text-gray-800 mb-1">
                      {day.dayLabel}
                    </span>
                    <div className="my-1.5">
                      {getWeatherIcon(day.weatherCode, 'h-7 w-7')}
                    </div>
                    <span className="text-xs font-medium text-gray-600 line-clamp-1 h-4">
                      {day.condition}
                    </span>
                    <div className="mt-2 text-xs font-bold text-gray-900">
                      <span>{day.tempMax}°</span>
                      <span className="text-gray-400 font-normal ml-1">
                        {day.tempMin}°
                      </span>
                    </div>
                    {day.rainProbability > 0 && (
                      <div className="mt-1.5 inline-flex items-center gap-0.5 text-xs font-semibold text-blue-600">
                        <Droplets className="h-2.5 w-2.5" aria-hidden="true" />
                        <span>{day.rainProbability}%</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Advisory Bridge & Hotlines Link */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-600">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck
                    className="h-4 w-4 text-emerald-600 shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    River and flood monitoring supported by{' '}
                    <strong>MDRRMO Morong</strong> &amp; PAGASA.
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href="https://bagong.pagasa.dost.gov.ph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-700 hover:underline font-semibold inline-flex items-center gap-0.5"
                  >
                    <span>PAGASA Bulletins</span>
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                  <Link
                    to="/philippines-hotlines"
                    className="text-red-700 hover:underline font-bold"
                  >
                    Emergency Hotlines →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MorongWeatherWidget;
