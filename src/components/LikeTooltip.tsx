import React from 'react';
import styled from 'styled-components';

interface LikeTooltipProps {
  title: string;
  description?: string;
  imagePath?: string;
}

const LikeTooltip: React.FC<LikeTooltipProps> = ({ title, description = "", imagePath = "/images/likes/placeholder.jpg" }) => {
  return (
    <StyledWrapper>
      <div className="card absolute">
        <div className="inner-card">
          <img 
            src={imagePath} 
            alt={title} 
            className="bg-image" 
            onError={(e) => {
              // 图片加载失败时使用占位图
              const target = e.target as HTMLImageElement;
              target.src = "/images/likes/placeholder.jpg";
            }}
          />
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    top: -150px;
    left: 50%;
    transform: translateX(-50%) scale(0.95);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    width: 230px;
    height: 140px;
    will-change: transform, opacity;
    transform-origin: 50% 100%;
    opacity: 0;
    visibility: hidden;
    background: transparent;
    border-radius: 12px;
    box-shadow: 0 0 0 2px #f9c4d2, 0 6px 20px rgba(0, 0, 0, 0.4);
    overflow: hidden;
    z-index: 1000;
  }

  .inner-card {
    position: relative;
    border-radius: 10px;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.5s ease;
    border-radius: 10px;
  }

  .inner-card:hover .bg-image {
    transform: scale(1.1);
  }

  .relative {
    position: relative;
  }

  .absolute {
    position: absolute;
  }
`;

export default LikeTooltip; 