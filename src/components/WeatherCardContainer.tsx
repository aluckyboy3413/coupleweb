"use client";

import React, { useEffect, useState } from 'react';
import WeatherCard from './WeatherCard';

interface WeatherCardContainerProps {
  locationId: string;
  cityName: string;
  country: string;
  personName: string;
  colorTheme: 'warm' | 'cool';
  timezone?: number;
}

interface WeatherData {
  temp: string;
  text: string;
  windDir: string;
  windScale: string;
  humidity: string;
  icon: string;
}

interface ForecastItem {
  fxDate: string;
  tempMax: string;
  tempMin: string;
  textDay: string;
  iconDay: string;
}

const WeatherCardContainer: React.FC<WeatherCardContainerProps> = ({
  locationId,
  cityName,
  country,
  personName,
  colorTheme,
  timezone
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState('');
  
  useEffect(() => {
    // 设置当前日期
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    setCurrentDate(date.toLocaleDateString('en-US', options));
    
    // 检查是否存在缓存数据及其是否过期
    const checkAndFetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      
      const storageKey = `weather_${locationId}`;
      const forecastKey = `forecast_${locationId}`;
      const timestampKey = `weather_timestamp_${locationId}`;
      
      // 尝试从localStorage获取数据
      try {
        const cachedTimestamp = localStorage.getItem(timestampKey);
        const currentTime = new Date().getTime();
        
        // 如果缓存存在且未过期（24小时内的数据视为有效）
        if (cachedTimestamp && (currentTime - parseInt(cachedTimestamp)) < 24 * 60 * 60 * 1000) {
          const cachedWeather = localStorage.getItem(storageKey);
          const cachedForecast = localStorage.getItem(forecastKey);
          
          if (cachedWeather && cachedForecast) {
            setWeather(JSON.parse(cachedWeather));
            setForecast(JSON.parse(cachedForecast));
            setLoading(false);
            console.log('Using cached weather data');
            return; // 使用缓存数据，不进行API调用
          }
        }
        
        // 缓存不存在或已过期，从API获取新数据
        const response = await fetch(`/api/weather?location=${locationId}&lang=en`);
        const data = await response.json();
        
        if (data.now) {
          // 设置状态
          setWeather(data.now);
          // 将天气数据存入缓存
          localStorage.setItem(storageKey, JSON.stringify(data.now));
          
          if (data.forecast && data.forecast.length > 0) {
            const forecastData = data.forecast.slice(0, 3);
            setForecast(forecastData);
            // 将预报数据存入缓存
            localStorage.setItem(forecastKey, JSON.stringify(forecastData));
          }
          
          // 记录数据获取时间
          localStorage.setItem(timestampKey, currentTime.toString());
        } else if (data.error) {
          setError(`${data.error}: Code ${data.weatherCode || 'Unknown'}`);
          console.error('Weather API Error:', data);
        } else {
          setError('Unable to fetch weather data');
        }
      } catch (err) {
        // 如果API请求失败但有缓存，尝试使用缓存数据（即使已过期）
        const cachedWeather = localStorage.getItem(storageKey);
        const cachedForecast = localStorage.getItem(forecastKey);
        
        if (cachedWeather && cachedForecast) {
          setWeather(JSON.parse(cachedWeather));
          setForecast(JSON.parse(cachedForecast));
          setError('Using cached data (API request failed)');
          console.warn('Using expired cached data due to API error');
        } else {
          setError('Error fetching weather data');
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };
    
    checkAndFetchWeatherData();
    
    // 每24小时刷新一次天气数据，极大减少API调用次数
    const interval = setInterval(checkAndFetchWeatherData, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [locationId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white text-xl">Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white text-xl">
          <p>{error}</p>
          <p>City ID: {locationId}</p>
        </div>
      </div>
    );
  }

  return (
    <WeatherCard
      city={cityName}
      country={country}
      date={currentDate}
      temperature={weather?.temp || '23'}
      weatherText={weather?.text || 'Sunny'}
      humidity={weather?.humidity ? `${weather.humidity}%` : '50%'}
      windDir={weather?.windDir || 'N'}
      windScale={weather?.windScale || '3'}
      colorTheme={colorTheme}
      personName={personName}
      forecast={forecast}
      timezone={timezone}
    />
  );
};

export default WeatherCardContainer; 