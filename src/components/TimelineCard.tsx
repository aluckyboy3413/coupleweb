"use client";

import React from 'react';
import styled from 'styled-components';

interface TimelineCardProps {
  title: string;
  date: string;
  description?: string;
  daysCount: number;
  isInPast: boolean;
  colorIndex: number;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  title,
  date,
  daysCount,
  isInPast,
  colorIndex
}) => {
  return (
    <StyledWrapper>
      <div className={`card color-${colorIndex}`}>
        <div className="days-count">
          <span className="number">{daysCount}</span>
          <span className="label">{isInPast ? 'days ago' : 'days to go'}</span>
        </div>
        <div className="content">
          <p className="title">{title}</p>
          <p className="date">{date}</p>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: calc(25% - 12px); // 确保四个卡片等宽并排一行，考虑间距
  
  .card {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    text-align: center;
    padding: 1.2rem 1rem;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    color: white;
    cursor: pointer;
    transition: 400ms;
    position: relative;
    overflow: hidden;
  }

  .card.color-0 { background-color: #059669; }
  .card.color-1 { background-color: #10b981; }
  .card.color-2 { background-color: #34d399; }
  .card.color-3 { background-color: #6ee7b7; }
  .card.color-4 { background-color: #a7f3d0; }

  .days-count {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .days-count .number {
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1;
  }

  .days-count .label {
    font-size: 0.8rem;
    opacity: 0.9;
    margin-top: 0.3rem;
  }
  
  .content {
    text-align: center;
    width: 100%;
  }

  .title {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 0.25rem 0;
  }

  .date {
    font-size: 0.75rem;
    opacity: 0.9;
  }

  .card:hover {
    transform: scale(1.03, 1.03);
  }

  @media (max-width: 1024px) {
    width: calc(50% - 8px); // 平板设备上一行显示两个
  }

  @media (max-width: 768px) {
    width: 100%; // 移动设备上一行显示一个
    
    .card {
      padding: 1rem;
    }

    .days-count .number {
      font-size: 2.8rem;
    }

    .title {
      font-size: 1rem;
    }
  }
`;

export default TimelineCard; 