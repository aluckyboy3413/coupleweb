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
      
      try {
        const cachedTimestamp = localStorage.getItem(timestampKey);
        const currentTime = new Date().getTime();
        
        // 如果缓存存在且未过期（1小时内的数据视为有效）
        if (cachedTimestamp && (currentTime - parseInt(cachedTimestamp)) < 1 * 60 * 60 * 1000) {
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
        
        // 调试信息：获取位置信息
        console.log(`Fetching weather data for location: ${locationId}, city: ${cityName}`);
        
        // 缓存不存在或已过期，从API获取新数据
        // 设置超时以避免长时间等待
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时
        
        try {
          const response = await fetch(`/api/weather?location=${encodeURIComponent(locationId)}&lang=en`, {
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('Weather API response:', data);
          
          if (data.now) {
            // 成功获取天气数据
            setWeather(data.now);
            localStorage.setItem(storageKey, JSON.stringify(data.now));
            
            if (data.forecast && data.forecast.length > 0) {
              const forecastData = data.forecast.slice(0, 3);
              setForecast(forecastData);
              localStorage.setItem(forecastKey, JSON.stringify(forecastData));
            }
            
            // 记录数据获取时间
            localStorage.setItem(timestampKey, currentTime.toString());
          } else if (data.error) {
            // API返回错误
            console.error('Weather API Error:', data);
            throw new Error(`${data.error}: Code ${data.weatherCode || 'Unknown'}`);
          } else {
            // API响应格式不正确
            throw new Error('Invalid API response format');
          }
        } catch (fetchError) {
          if (fetchError.name === 'AbortError') {
            throw new Error('Request timeout after 5 seconds');
          }
          throw fetchError;
        }
      } catch (err) {
        console.error('Error in weather data fetch:', err);
        
        // 尝试使用缓存数据（即使已过期）
        const cachedWeather = localStorage.getItem(storageKey);
        const cachedForecast = localStorage.getItem(forecastKey);
        
        if (cachedWeather && cachedForecast) {
          setWeather(JSON.parse(cachedWeather));
          setForecast(JSON.parse(cachedForecast));
          setError('Using expired cached data (API request failed)');
          console.warn('Using expired cached data due to API error');
        } else {
          setError(`${err.message || 'Failed to fetch weather data'}`);
        }
      } finally {
        setLoading(false);
      }
    };
    
    checkAndFetchWeatherData();
    
    // 每小时刷新一次天气数据
    const interval = setInterval(checkAndFetchWeatherData, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [locationId, cityName]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white text-xl">Loading weather data...</div>
      </div>
    );
  }

  if (error && !weather) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white text-xl">
          <p>{error}</p>
          <p>City ID: {locationId}</p>
        </div>
      </div>
    );
  }

  // 即使有错误，只要有天气数据（来自缓存），也展示卡片
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