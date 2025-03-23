import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface PhotoFrameProps {
  imageSrc: string;
  alt: string;
}

const PhotoFrame: React.FC<PhotoFrameProps> = ({ imageSrc, alt }) => {
  return (
    <StyledWrapper>
      <div className="frame">
        <div className="image-container">
          <Image 
            src={imageSrc} 
            alt={alt} 
            fill
            style={{ objectFit: 'cover' }}
            className="photo"
          />
        </div>
        <div className="frame-border"></div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .frame {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 230px;
    height: 300px;
    border-radius: 5px;
    overflow: hidden;
    background-color: #f2b67b;
  }

  .image-container {
    position: relative;
    width: 90%;
    height: 90%;
    z-index: 1;
    overflow: hidden;
    border-radius: 3px;
  }

  .photo {
    transition: transform 0.3s;
    transition-timing-function: cubic-bezier(0.4, 1.55, 0.74, 0.55);
  }

  .frame-border {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
    border: 2px solid black;
    border-radius: 3px;
    transition: transform 0.3s;
    transition-timing-function: cubic-bezier(0.4, 1.55, 0.74, 0.55);
  }

  .frame:hover .photo {
    transform: scale(1.08);
  }

  .frame:hover .frame-border {
    transform: scale(1.04);
  }
`;

export default PhotoFrame; 