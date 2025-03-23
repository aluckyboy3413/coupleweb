import React, { useState } from 'react';
import styled from 'styled-components';

interface InstagramCssFiltersProps {
  images: Array<{
    src: string;
    title: string;
    filter?: string; // 保留参数但不使用
  }>;
}

const StyledWrapper = styled.div`
  .carousel {
    position: relative;
    width: 100%;
    overflow: hidden;
    padding: 2rem 0;
  }

  .carousel-container {
    display: flex;
    transition: transform 0.5s ease;
    gap: 2rem;
    padding: 0 2rem;
  }

  .gallery-item {
    flex: 0 0 300px;
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-5px);
    }
  }

  .gallery-image {
    width: 300px;
    height: 300px;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease;
  }

  .gallery-item:hover .gallery-image {
    transform: scale(1.05);
  }

  /* 图片加载错误占位样式 */
  .image-placeholder {
    width: 300px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f5f7fa, #e2e8f0);
    color: #4a5568;
    font-size: 1.1rem;
    text-align: center;
    padding: 1rem;
  }

  /* 移除所有滤镜效果 */
  /* .filter-normal, .filter-1977, ... 等滤镜定义全部移除 */

  .image-title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 1rem;
    text-align: center;
    font-size: 1.1rem;
    font-weight: 500;
    opacity: 0;
    transform: translateY(100%);
    transition: all 0.3s ease;
  }

  .gallery-item:hover .image-title {
    opacity: 1;
    transform: translateY(0);
  }

  .carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s ease;

    &:hover {
      background: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    &.prev {
      left: 1rem;
    }

    &.next {
      right: 1rem;
    }
  }

  .carousel-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background: rgba(0, 0, 0, 0.6);
      transform: scale(1.2);
    }
  }
`;

const InstagramCssFilters: React.FC<InstagramCssFiltersProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});
  const itemsPerView = 3;
  const maxIndex = Math.max(0, images.length - itemsPerView);

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({...prev, [index]: true}));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  return (
    <StyledWrapper>
      <div className="carousel">
        <button className="carousel-button prev" onClick={handlePrev} disabled={currentIndex === 0}>
          ←
        </button>
        <button className="carousel-button next" onClick={handleNext} disabled={currentIndex === maxIndex}>
          →
        </button>
        <div 
          className="carousel-container"
          style={{ transform: `translateX(-${currentIndex * (300 + 32)}px)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="gallery-item">
              {imageErrors[index] ? (
                <div className="image-placeholder">
                  <span>📷 {image.title}</span>
                </div>
              ) : (
                <img
                  src={image.src}
                  alt={image.title}
                  className="gallery-image"
                  onError={() => handleImageError(index)}
                  loading="lazy"
                />
              )}
              <div className="image-title">{image.title}</div>
            </div>
          ))}
        </div>
        <div className="carousel-dots">
          {Array.from({ length: Math.ceil(images.length / itemsPerView) }).map((_, index) => (
            <div
              key={index}
              className={`dot ${index === Math.floor(currentIndex / itemsPerView) ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index * itemsPerView)}
            />
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};

export default InstagramCssFilters; 