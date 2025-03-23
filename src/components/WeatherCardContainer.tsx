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

interface GeoLocation {
  id: string;
  name: string;
  lat: string;
  lon: string;
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
  const [cityId, setCityId] = useState<string | null>(null);
  
  // 获取城市ID
  useEffect(() => {
    const fetchCityId = async () => {
      // 如果已经是城市ID格式 (以字母开头跟数字的城市代码)，直接使用
      if (typeof locationId === 'string' && /^[A-Z\d]+\d+$/.test(locationId)) {
        console.log(`检测到标准城市ID格式: ${locationId}，直接使用`);
        setCityId(locationId);
        return;
      }
      
      // 如果是经纬度格式，直接用于天气查询而不尝试转换为城市ID
      if (typeof locationId === 'string' && locationId.includes(',')) {
        console.log(`检测到经纬度格式: ${locationId}，直接用于天气查询`);
        setCityId(locationId);
        return;
      }
      
      try {
        // 使用城市查询API获取城市ID
        console.log(`正在查询城市 ${cityName} (${locationId}) 的ID...`);
        const response = await fetch(`/api/geo?location=${encodeURIComponent(locationId)}&lang=en`);
        
        if (!response.ok) {
          throw new Error(`城市查询API返回状态码 ${response.status}`);
        }
        
        const data = await response.json();
        console.log('城市查询结果:', data);
        
        if (data.code === '200' && data.location && data.location.length > 0) {
          // 尝试查找最匹配的城市
          let bestMatch = data.location[0];
          
          // 如果有多个结果，尝试找到确切匹配国家和城市名的
          if (data.location.length > 1) {
            const exactMatch = data.location.find(loc => 
              loc.country.toLowerCase() === country.toLowerCase() && 
              loc.name.toLowerCase() === cityName.toLowerCase()
            );
            
            if (exactMatch) {
              bestMatch = exactMatch;
              console.log(`找到完全匹配的城市: ${bestMatch.name}, ${bestMatch.country}`);
            }
          }
          
          console.log(`使用城市 ${bestMatch.name}，ID: ${bestMatch.id}`);
          setCityId(bestMatch.id);
        } else {
          // 如果查询失败，继续使用原始locationId
          console.warn(`未找到城市 ${cityName} 的ID，将继续使用原始ID: ${locationId}`);
          setCityId(locationId);
        }
      } catch (err) {
        console.error('查询城市ID时出错:', err);
        // 出错时继续使用原始locationId
        setCityId(locationId);
      }
    };
    
    fetchCityId();
  }, [locationId, cityName, country]);
  
  // 获取天气数据
  useEffect(() => {
    // 如果还没有获取到cityId，等待
    if (!cityId) return;
    
    // 设置当前日期
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    setCurrentDate(date.toLocaleDateString('en-US', options));
    
    // 检查是否存在缓存数据及其是否过期
    const checkAndFetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      
      const storageKey = `weather_${cityId}`;
      const forecastKey = `forecast_${cityId}`;
      const timestampKey = `weather_timestamp_${cityId}`;
      
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
            console.log(`使用缓存的天气数据: ${cityId}`);
            return; // 使用缓存数据，不进行API调用
          }
        }
        
        // 调试信息：获取位置信息
        console.log(`正在获取天气数据，地点: ${cityId}, 城市: ${cityName}`);
        
        // 缓存不存在或已过期，从API获取新数据
        // 设置超时以避免长时间等待
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时
        
        try {
          const response = await fetch(`/api/weather?location=${encodeURIComponent(cityId)}&lang=en`, {
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          // API总是返回200状态码，但可能在响应体中包含错误信息
          const data = await response.json();
          console.log(`天气API响应 (${cityId}):`, data);
          
          if (data.error) {
            // API返回错误信息
            throw new Error(`API responded with status: ${data.error}${data.message ? ': ' + data.message : ''}`);
          }
          
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
          } else {
            // API响应格式不正确
            throw new Error('API返回的数据格式不正确');
          }
        } catch (fetchError: unknown) {
          clearTimeout(timeoutId);
          if (fetchError instanceof Error) {
            if (fetchError.name === 'AbortError') {
              throw new Error('请求超时');
            }
            throw fetchError;
          }
          throw new Error('未知的API请求错误');
        }
      } catch (err: unknown) {
        console.error(`获取天气数据时出错 (${cityId}):`, err);
        
        // 尝试使用缓存数据（即使已过期）
        const cachedWeather = localStorage.getItem(storageKey);
        const cachedForecast = localStorage.getItem(forecastKey);
        
        if (cachedWeather && cachedForecast) {
          setWeather(JSON.parse(cachedWeather));
          setForecast(JSON.parse(cachedForecast));
          setError('使用过期的缓存数据 (API请求失败)');
          console.warn(`由于API错误，使用过期的缓存数据: ${cityId}`);
        } else {
          setError(err instanceof Error ? err.message : '无法获取天气数据');
        }
      } finally {
        setLoading(false);
      }
    };
    
    checkAndFetchWeatherData();
    
    // 每小时刷新一次天气数据
    const interval = setInterval(checkAndFetchWeatherData, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [cityId, cityName]);

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
          <p>API responded with status: 500</p>
          <p>City ID: {cityId || locationId}</p>
          <p className="text-xs mt-2 opacity-80">{error}</p>
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