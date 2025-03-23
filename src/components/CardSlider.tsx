import React from 'react';
import styled from 'styled-components';

const CardSlider = () => {
  return (
    <StyledWrapper>
      <div className="slider">
        <div className="list">
          <div className="item" style={{"--position": 1} as React.CSSProperties}>
            <div className="card" style={{background: 'linear-gradient(to right, #ff7e5f, #feb47b)'}}>
              <p>FADOUA</p>
              <p>AND JIANWEI</p>
            </div>
          </div>
          <div className="item" style={{"--position": 2} as React.CSSProperties}>
            <div className="card" style={{background: 'linear-gradient(to right, #6a11cb, #2575fc)'}}>
              <p>What's inside you</p>
              <p>You</p>
            </div>
          </div>
          <div className="item" style={{"--position": 3} as React.CSSProperties}>
            <div className="card" style={{background: 'linear-gradient(to right, #00c6ff, #0072ff)'}}>
              <p>Wanna steal my man so bad</p>
              <p>Annoying</p>
            </div>
          </div>
          <div className="item" style={{"--position": 4} as React.CSSProperties}>
            <div className="card" style={{background: 'linear-gradient(to right, #ff512f, #dd2476)'}}>
              <p>You have big butt lemme touch</p>
            
            </div>
          </div>
          <div className="item" style={{"--position": 5} as React.CSSProperties}>
            <div className="card" style={{background: 'linear-gradient(to right, #ffb6c1, #ff69b4)'}}>
              <p>Lemme put my leg on top</p>
              <p>It's comfortable</p>
            </div>
          </div>
          <div className="item" style={{"--position": 6} as React.CSSProperties}>
            <div className="card" style={{background: 'linear-gradient(to right, #ff9a8b, #ffc3a0)'}}>
              <p>Let's kiss then</p>
              <p>Let's kiss</p>
            </div>
          </div>
          <div className="item" style={{"--position": 7} as React.CSSProperties}>
            <div className="card" style={{background: 'linear-gradient(to right, #a1c4fd, #c2e9fb)'}}>
              <p>I'll wear my shorts if I was with you</p>
              <p>No need</p>
            </div>
          </div>
          <div className="item" style={{"--position": 8} as React.CSSProperties}>
            <div className="card" style={{background: 'linear-gradient(to right, #fbc2eb, #a18cd1)'}}>
              <p>You wanna mix DNA with me ?</p>
              <p>Sure</p>
            </div>
          </div>
          <div className="item" style={{"--position": 9} as React.CSSProperties}>
            <div className="card" style={{background: 'linear-gradient(to right, #84fab0, #8fd3f4)'}}>
              <p>Lemme kiss you</p>
              <p>Sir</p>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  height: 100%;
  width: 100%;
  --card-width: 320px;
  --card-height: 120px;
  --quantity: 9;

  .card {
    width: 100%;
    height: 100%;
    padding: 15px 20px;
    border: 3px solid #fff;
    border-radius: 12px;
    box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.2);
    color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Arial', sans-serif;
    transform: rotate(-1deg);
  }

  .card p {
    font-size: 22px;
    font-weight: bold;
    margin: 4px 0;
    color: white;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  }

  .slider {
    width: 100%;
    height: 100%;
    overflow: hidden;
    mask-image: linear-gradient(to right, transparent, #000 5% 95%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, #000 5% 95%, transparent);
  }
  
  .slider .list {
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
  }
  
  .slider .list .item {
    width: var(--card-width);
    height: var(--card-height);
    position: absolute;
    left: -100%;
    top: 50%;
    transform: translateY(-50%);
    animation: autoRun 25s linear infinite;
    transition: all 0.3s ease;
    animation-delay: calc(
      (25s / var(--quantity)) * (var(--position) - 1) - 25s
    ) !important;
  }
  
  @keyframes autoRun {
    from {
      left: -20%;
    }
    to {
      left: 120%;
    }
  }
  
  .slider:hover .item {
    animation-play-state: paused !important;
    filter: brightness(0.9);
  }
  
  .slider .item:hover {
    filter: brightness(1.1);
    transform: translateY(-50%) scale(1.05) rotate(0deg);
    z-index: 100;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
  
  .card:hover {
    transform: rotate(0deg);
    box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    --card-width: 280px;
    --card-height: 100px;
    
    .card p {
      font-size: 18px;
    }
  }
`;

export default CardSlider; 