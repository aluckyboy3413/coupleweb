import React from 'react';
import styled from 'styled-components';

interface FlipCardProps {
  frontTitle: string;
  frontContent: string;
  backTitle: string;
  backContent: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ frontTitle, frontContent, backTitle, backContent }) => {
  return (
    <StyledWrapper>
      <div className="container">
        <div className="card">
          <div className="front">
            <p className="front-heading">{frontTitle}</p>
            <p>{frontContent}</p>
          </div>
          <div className="back">
            <p className="back-heading">{backTitle}</p>
            <p>{backContent}</p>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    width: 100%;
    height: 160px;
    perspective: 900px;
  }

  .card {
    height: 100%;
    width: 100%;
    background-color: aliceblue;
    position: relative;
    transition: transform 1500ms;
    transform-style: preserve-3d;
    border-radius: 1rem;
  }

  .container:hover > .card {
    cursor: pointer;
    transform: rotateY(180deg);
  }

  .front, .back {
    height: 100%;
    width: 100%;
    border-radius: 1rem;
    position: absolute;
    box-shadow: 0 0 10px 2px rgba(50, 50, 50, 0.25);
    backface-visibility: hidden;
    color: aliceblue;
    background: linear-gradient(-135deg, #F80A4A, #0AA4F8);
    padding: 1.5rem;
  }

  .front, .back {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .back {
    transform: rotateY(180deg);
  }

  .front-heading {
    font-size: 32px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    letter-spacing: 2px;
  }

  .back-heading {
    font-size: 24px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
  }

  p:not(.front-heading):not(.back-heading) {
    text-align: center;
    line-height: 1.5;
    font-size: 18px;
    opacity: 0.9;
  }

  .front p:not(.front-heading) {
    font-style: italic;
  }
`;

export default FlipCard; 