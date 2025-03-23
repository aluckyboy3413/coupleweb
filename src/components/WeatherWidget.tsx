"use client";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getWeatherIcon } from '@/utils/weatherIcons';

interface WeatherData {
  temp: string;
  text: string;
  windDir: string;
  windScale: string;
  humidity: string;
  icon: string;
}

interface ForecastData {
  tempMax: string;
  tempMin: string;
  textDay: string;
  iconDay: string;
  fxDate: string;
}

interface WeatherWidgetProps {
  locationId: string;
  cityName: string;
  personName: string;
  className?: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ 
  locationId, 
  cityName, 
  personName, 
  className 
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchWeatherData() {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/weather?location=${locationId}&lang=en`);
        const data = await response.json();
        
        if (data.now) {
          setWeather(data.now);
          setForecast(data.forecast);
        } else if (data.error) {
          // 处理API返回的错误
          setError(`${data.error}: Code ${data.weatherCode || 'Unknown'}`);
          console.error('Weather API Error:', data);
        } else {
          setError('Unable to fetch weather data');
        }
      } catch (err) {
        setError('Error fetching weather data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchWeatherData();
    
    // 每30分钟刷新一次天气数据
    const interval = setInterval(fetchWeatherData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [locationId]);
  
  // 格式化日期显示
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };
  
  return (
    <StyledWidget className={className}>
      <div className="weather-card">
        <h3 className="location">{personName}'s City - {cityName}</h3>
        
        {loading && <div className="loading">Loading...</div>}
        
        {error && (
          <div className="error">
            <p>{error}</p>
            <p className="debug-info">City ID: {locationId}</p>
          </div>
        )}
        
        {weather && !loading && (
          <>
            <div className="weather-icon">
              {getWeatherIcon(weather.icon)}
            </div>
            <div className="weather-info">
              <div className="temperature">{weather.temp}°C</div>
              <div className="weather-desc">{weather.text}</div>
              <div className="details">
                <div>Humidity: {weather.humidity}%</div>
                <div>Wind: {weather.windDir}</div>
                <div>Wind Force: {weather.windScale} level</div>
              </div>
            </div>
            
            {forecast && forecast.length > 0 && (
              <div className="forecast">
                {forecast.slice(0, 3).map((day, index) => (
                  <div key={index} className="forecast-day">
                    <div className="forecast-date">{index === 0 ? 'Today' : formatDate(day.fxDate)}</div>
                    <div className="forecast-icon">{getWeatherIcon(day.iconDay)}</div>
                    <div className="forecast-temp">{day.tempMin}°~{day.tempMax}°</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </StyledWidget>
  );
};

const StyledWidget = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  
  .weather-card {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    backdrop-filter: blur(5px);
    padding: 1.5rem;
    color: white;
    text-align: center;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 350px;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    }
  }
  
  .location {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    font-weight: bold;
  }
  
  .weather-icon {
    font-size: 3.5rem;
    margin-bottom: 0.5rem;
  }
  
  .temperature {
    font-size: 2.2rem;
    font-weight: bold;
  }
  
  .weather-desc {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  
  .details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    opacity: 0.9;
  }
  
  .forecast {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 1rem;
  }
  
  .forecast-day {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33%;
  }
  
  .forecast-date {
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
  }
  
  .forecast-icon {
    font-size: 1.5rem;
    margin: 0.25rem 0;
  }
  
  .forecast-temp {
    font-size: 0.8rem;
  }
  
  .loading, .error {
    padding: 2rem;
    font-size: 1.2rem;
  }
  
  .error {
    color: #ffcccc;
  }
  
  @media (max-width: 768px) {
    .weather-card {
      padding: 1rem;
    }
    
    .weather-icon {
      font-size: 2.8rem;
    }
    
    .temperature {
      font-size: 1.8rem;
    }
  }
`;

export default WeatherWidget; 