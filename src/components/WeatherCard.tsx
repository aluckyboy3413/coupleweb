"use client";

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ForecastItem {
  fxDate: string;
  tempMax: string;
  tempMin: string;
  textDay: string;
  iconDay: string;
}

interface WeatherCardProps {
  city: string;
  country: string;
  date: string;
  temperature: string;
  colorTheme: 'warm' | 'cool';
  personName: string;
  weatherText?: string;
  humidity?: string;
  windDir?: string;
  windScale?: string;
  forecast?: ForecastItem[];
  timezone?: number;
}

const CardWrapper = styled.div<{ colorTheme: 'warm' | 'cool' }>`
  width: 100%;
  height: 100%;
  max-height: 320px;
  border-radius: 20px;
  perspective: 5000px;
  font-family: "Arial", sans-serif;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  .card {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transform: translateZ(0);
    transition: transform 0.3s ease-out;
    background: ${props => props.colorTheme === 'warm' 
      ? 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 100%)'
      : 'linear-gradient(45deg, #a8edea 0%, #fed6e3 100%)'};
    border-radius: 20px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    
    &:hover {
      transform: translateZ(10px) rotateX(2deg) rotateY(2deg);
    }
  }
  
  .cloud {
    width: 250px;
    height: 100px;
    background: #fff;
    background: linear-gradient(top, #fff 5%, #f1f1f1);
    position: absolute;
    border-radius: 100px;
    top: 120px;
    transform: scale(0.4);
    animation: cloud-movement 30s linear infinite;
    opacity: 0.9;
    
    &:before,
    &:after {
      content: '';
      background: #fff;
      width: 100px;
      height: 80px;
      position: absolute;
      top: -15px;
      left: 10px;
      border-radius: 100px;
      transform: rotate(30deg);
    }
    
    &:after {
      width: 120px;
      height: 120px;
      top: -55px;
      left: auto;
      right: 15px;
    }
    
    &:nth-child(1) {
      left: -50px;
      transform: scale(0.3);
      opacity: 0.7;
      animation-duration: 45s;
      animation-delay: -2s;
    }
    
    &:nth-child(2) {
      left: 150px;
      top: 50px;
      transform: scale(0.2);
      opacity: 0.5;
      animation-duration: 60s;
      animation-delay: -6s;
    }
  }
  
  @keyframes cloud-movement {
    0% {
      left: -250px;
    }
    100% {
      left: 100%;
    }
  }
  
  .sun {
    width: 80px;
    height: 80px;
    background: ${props => props.colorTheme === 'warm' ? '#ffcc33' : '#fdfd96'};
    border-radius: 100%;
    position: absolute;
    right: 40px;
    top: 40px;
    transform: rotate(0deg);
    animation: sun-rotation 40s linear infinite;
    box-shadow: 0 0 50px rgba(255, 204, 51, 0.4);
    
    &:after {
      content: '';
      width: 120%;
      height: 120%;
      border-radius: 100%;
      background: transparent;
      position: absolute;
      top: -10%;
      left: -10%;
      border: 20px solid ${props => props.colorTheme === 'warm' ? 'rgba(255, 204, 51, 0.2)' : 'rgba(253, 253, 150, 0.2)'};
      box-sizing: border-box;
    }
  }
  
  @keyframes sun-rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  .card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 25px;
    color: ${props => props.colorTheme === 'warm' ? '#442525' : '#2c3e50'};
    z-index: 2;
    
    h2 {
      margin: 0;
      font-size: 1.75rem;
      font-weight: 700;
    }
    
    h1 {
      margin: 8px 0 8px;
      font-size: 4rem;
      font-weight: 800;
      line-height: 1;
    }
    
    p {
      margin: 8px 0;
      font-size: 1.1rem;
      opacity: 0.8;
    }
    
    .location {
      display: flex;
      align-items: center;
      font-size: 1.25rem;
      margin-bottom: 6px;
      font-weight: 600;
      
      svg {
        margin-right: 8px;
        opacity: 0.8;
        width: 18px;
        height: 18px;
      }
    }
    
    .person-tag {
      position: absolute;
      top: 18px;
      right: 18px;
      background: ${props => props.colorTheme === 'warm' 
        ? 'rgba(255, 77, 77, 0.7)' 
        : 'rgba(76, 175, 80, 0.8)'};
      color: white;
      padding: 5px 12px;
      border-radius: 18px;
      font-size: 1rem;
      font-weight: 600;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
      letter-spacing: 0.5px;
    }
    
    .weather-details {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-top: 12px;

      .detail-item {
        display: flex;
        align-items: center;
        font-size: 0.9rem;
        
        svg {
          margin-right: 6px;
          opacity: 0.7;
          width: 16px;
          height: 16px;
        }
      }
      
      .weather-description {
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 5px;
        color: ${props => props.colorTheme === 'warm' ? '#6B2B29' : '#1B5E20'};
      }
    }
    
    .forecast-panel {
      position: absolute;
      bottom: 15px;
      right: 15px;
      display: flex;
      gap: 10px;
      
      .forecast-day {
        background-color: ${props => props.colorTheme === 'warm' 
          ? 'rgba(255, 255, 255, 0.25)' 
          : 'rgba(255, 255, 255, 0.3)'};
        border-radius: 12px;
        padding: 8px;
        width: 70px;
        display: flex;
        flex-direction: column;
        align-items: center;
        backdrop-filter: blur(2px);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        
        .day-name {
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 2px;
        }
        
        .day-temp {
          font-size: 0.9rem;
          font-weight: 700;
          margin: 2px 0;
        }
        
        .day-condition {
          font-size: 0.8rem;
          opacity: 0.9;
        }
      }
    }
    
    .local-time {
      position: absolute;
      bottom: 130px;
      right: 15px;
      display: flex;
      align-items: center;
      gap: 6px;
      background-color: ${props => props.colorTheme === 'warm' 
        ? 'rgba(255, 77, 77, 0.2)' 
        : 'rgba(76, 175, 80, 0.2)'};
      padding: 4px 10px;
      border-radius: 15px;
      backdrop-filter: blur(2px);
      
      svg {
        width: 16px;
        height: 16px;
        opacity: 0.8;
      }
      
      span {
        font-size: 0.9rem;
        font-weight: 600;
        letter-spacing: 0.5px;
      }
    }
  }
`;

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  country,
  date,
  temperature,
  colorTheme,
  personName,
  weatherText = 'Sunny',
  humidity = '50%',
  windDir = 'N',
  windScale = '3',
  forecast = [],
  timezone = colorTheme === 'warm' ? 0 : 8
}) => {
  
  // 格式化日期为周几
  const formatDayOfWeek = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
    } catch (e) {
      return 'N/A';
    }
  };
  
  // 计算当地时间
  const getLocalTime = () => {
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const localTime = new Date(utcTime + (3600000 * timezone));
    
    return localTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };
  
  const [localTime, setLocalTime] = useState(getLocalTime());
  
  // 每分钟更新一次时间
  useEffect(() => {
    const timer = setInterval(() => {
      setLocalTime(getLocalTime());
    }, 60000);
    
    return () => clearInterval(timer);
  }, [timezone]);
  
  return (
    <CardWrapper colorTheme={colorTheme}>
      <div className="card">
        <div className="cloud"></div>
        <div className="cloud"></div>
        <div className="sun"></div>
        
        <div className="card-content">
          <div className="local-time">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z" fill="currentColor"/>
            </svg>
            <span>{localTime}</span>
          </div>
          
          <div className="person-tag">{personName}</div>
          <div className="location">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" 
                fill="currentColor" />
            </svg>
            {city}, {country}
          </div>
          <p>{date}</p>
          <h1>{temperature}°</h1>
          
          <div className="weather-details">
            <div className="weather-description">{weatherText}</div>
            
            <div className="detail-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3.75C7.99594 3.75 4.75 7.02297 4.75 11.05C4.75 14.3563 10.1422 21.1016 11.233 22.425C11.5812 22.8344 12.4203 22.8328 12.7672 22.425C13.8578 21.1016 19.25 14.3563 19.25 11.05C19.25 7.02297 16.0041 3.75 12 3.75ZM12 13.75C10.5188 13.75 9.3 12.5313 9.3 11.05C9.3 9.56875 10.5188 8.35 12 8.35C13.4812 8.35 14.7 9.56875 14.7 11.05C14.7 12.5313 13.4812 13.75 12 13.75Z" fill="currentColor"/>
              </svg>
              Wind: {windDir} {windScale} level
            </div>
            
            <div className="detail-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.9999 3.07C12.9999 1.93 11.9999 1.01 10.9999 1.01C9.99985 1.01 8.99985 1.93 8.99985 3.07C8.99985 4.17 9.81985 5.09 10.9999 5.09C12.1799 5.09 12.9999 4.17 12.9999 3.07ZM9.49985 18.17V22H12.4999V18.17L15.5299 7.32C15.6999 6.67 15.2699 6 14.6299 6H7.36985C6.72985 6 6.29985 6.67 6.46985 7.32L9.49985 18.17Z" fill="currentColor"/>
              </svg>
              Humidity: {humidity}
            </div>
          </div>
          
          {forecast && forecast.length > 0 && (
            <div className="forecast-panel">
              {forecast.slice(1, 3).map((day, index) => (
                <div key={index} className="forecast-day">
                  <span className="day-name">{formatDayOfWeek(day.fxDate)}</span>
                  <span className="day-temp">{day.tempMin}°-{day.tempMax}°</span>
                  <span className="day-condition">{day.textDay}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </CardWrapper>
  );
};

export default WeatherCard; 