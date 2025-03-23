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

// 添加模拟测试数据用于开发环境或API失败时
const MOCK_WEATHER_DATA = {
  Agadir: {
    weather: {
      temp: "25",
      text: "Sunny",
      windDir: "NE",
      windScale: "3",
      humidity: "60"
    },
    forecast: [
      { fxDate: "2023-10-20", tempMax: "26", tempMin: "18", textDay: "Sunny", iconDay: "100" },
      { fxDate: "2023-10-21", tempMax: "27", tempMin: "19", textDay: "Cloudy", iconDay: "101" },
      { fxDate: "2023-10-22", tempMax: "25", tempMin: "17", textDay: "Partly Cloudy", iconDay: "102" }
    ]
  },
  Guigang: {
    weather: {
      temp: "20",
      text: "Cloudy",
      windDir: "S",
      windScale: "2",
      humidity: "75"
    },
    forecast: [
      { fxDate: "2023-10-20", tempMax: "22", tempMin: "15", textDay: "Cloudy", iconDay: "101" },
      { fxDate: "2023-10-21", tempMax: "23", tempMin: "16", textDay: "Rain", iconDay: "300" },
      { fxDate: "2023-10-22", tempMax: "21", tempMin: "14", textDay: "Light Rain", iconDay: "305" }
    ]
  }
};

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
  const [useMockData, setUseMockData] = useState(false);
  
  useEffect(() => {
    // 设置当前日期
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    setCurrentDate(date.toLocaleDateString('en-US', options));
    
    // 检查是否存在缓存数据及其是否过期
    const checkAndFetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      setUseMockData(false);
      
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
          console.error('Weather API Error:', data);
          // 如果API请求失败，使用模拟数据
          if (cityName.includes("Agadir")) {
            setWeather(MOCK_WEATHER_DATA.Agadir.weather as WeatherData);
            setForecast(MOCK_WEATHER_DATA.Agadir.forecast);
            setUseMockData(true);
          } else if (cityName.includes("Guigang")) {
            setWeather(MOCK_WEATHER_DATA.Guigang.weather as WeatherData);
            setForecast(MOCK_WEATHER_DATA.Guigang.forecast);
            setUseMockData(true);
          } else {
            setError(`${data.error}: Code ${data.weatherCode || 'Unknown'}`);
          }
        } else {
          // 如果API响应格式不正确，也使用模拟数据
          if (cityName.includes("Agadir")) {
            setWeather(MOCK_WEATHER_DATA.Agadir.weather as WeatherData);
            setForecast(MOCK_WEATHER_DATA.Agadir.forecast);
            setUseMockData(true);
          } else if (cityName.includes("Guigang")) {
            setWeather(MOCK_WEATHER_DATA.Guigang.weather as WeatherData);
            setForecast(MOCK_WEATHER_DATA.Guigang.forecast);
            setUseMockData(true);
          } else {
            setError('Unable to fetch weather data');
          }
        }
      } catch (err) {
        console.error('Error in weather data fetch:', err);
        // 如果API请求失败但有缓存，尝试使用缓存数据（即使已过期）
        const cachedWeather = localStorage.getItem(storageKey);
        const cachedForecast = localStorage.getItem(forecastKey);
        
        if (cachedWeather && cachedForecast) {
          setWeather(JSON.parse(cachedWeather));
          setForecast(JSON.parse(cachedForecast));
          setError('Using cached data (API request failed)');
          console.warn('Using expired cached data due to API error');
        } else {
          // 使用测试数据
          if (cityName.includes("Agadir")) {
            setWeather(MOCK_WEATHER_DATA.Agadir.weather as WeatherData);
            setForecast(MOCK_WEATHER_DATA.Agadir.forecast);
            setUseMockData(true);
          } else if (cityName.includes("Guigang")) {
            setWeather(MOCK_WEATHER_DATA.Guigang.weather as WeatherData);
            setForecast(MOCK_WEATHER_DATA.Guigang.forecast);
            setUseMockData(true);
          } else {
            setError(`Error fetching weather data: ${err}`);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    
    checkAndFetchWeatherData();
    
    // 每24小时刷新一次天气数据，极大减少API调用次数
    const interval = setInterval(checkAndFetchWeatherData, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [locationId, cityName]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white text-xl">Loading weather data...</div>
      </div>
    );
  }

  if (error && !useMockData) {
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