"use client";

import React, { useState } from 'react';
import styled from 'styled-components';

interface MovieCardProps {
  title: string;
  englishTitle: string;
  date: string;
  posterUrl: string;
}

const MovieCard = ({ title, englishTitle, date, posterUrl }: MovieCardProps) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <StyledWrapper>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <p className="english-title">{englishTitle}</p>
            <p className="title">{title}</p>
            <p className="date">{date}</p>
          </div>
          <div className="flip-card-back">
            {!imageError ? (
              <img 
                src={posterUrl} 
                alt={title} 
                className="poster-image"
                onError={handleImageError}
              />
            ) : (
              <div className="poster-placeholder">
                <p className="placeholder-title">{englishTitle}</p>
                <p className="placeholder-subtitle">{title}</p>
                <p className="placeholder-text">海报即将上线</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .flip-card {
    background-color: transparent;
    width: 190px;
    height: 254px;
    perspective: 1000px;
    font-family: sans-serif;
    margin: 10px;
  }

  .english-title {
    font-size: 1.2em;
    font-weight: 900;
    text-align: center;
    margin: 0;
    padding: 10px;
  }

  .title {
    font-size: 0.9em;
    text-align: center;
    margin: 5px 0;
    font-weight: 600;
  }

  .date {
    font-size: 0.8em;
    text-align: center;
    margin-top: 10px;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front, .flip-card-back {
    box-shadow: 0 8px 14px 0 rgba(0,0,0,0.2);
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border: 1px solid #e0f2fe;
    border-radius: 1rem;
  }

  .flip-card-front {
    background: linear-gradient(120deg, #bfdbfe 60%, #93c5fd 88%,
       #60a5fa 40%, rgba(96, 165, 250, 0.6) 48%);
    color: #1e3a8a;
  }

  .flip-card-back {
    background: #1a1a1a;
    color: white;
    transform: rotateY(180deg);
    padding: 0;
  }

  .poster-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
  }
  
  .poster-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #2c3e50, #4a5568);
    border-radius: 1rem;
    padding: 1rem;
  }
  
  .placeholder-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #e0f2fe;
  }
  
  .placeholder-subtitle {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    color: #bfdbfe;
  }
  
  .placeholder-text {
    font-size: 0.8rem;
    color: #93c5fd;
    border: 1px dashed #60a5fa;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
  }
`;

export default MovieCard; 