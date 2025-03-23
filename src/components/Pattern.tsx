import React from 'react';
import styled from 'styled-components';

const Pattern = () => {
  return (
    <StyledWrapper>
      <div className="container" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: -100;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    #ffe8f3,
    #d9f3ff
  );

  .container {
    position: absolute;
    top: 0;
    left: 0;
    width: 300%;
    height: 280%;
    transform: translate(-25%, -25%);
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.2),
      rgba(0, 0, 0, 0.1)
    );
  }

  .container::before,
  .container::after {
    content: "";
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: conic-gradient(
      from 0deg at 50% 50%,
      #ff9aa2,
      #ffb7b2,
      #ffdac1,
      #e2f0cb,
      #a2e4ff,
      #c9afff,
      #ffb7b2,
      #ff9aa2
    );
    animation: rotate 20s linear infinite;
    filter: blur(60px);
    opacity: 0.6;
  }

  .container::after {
    animation: rotate-reverse 23s linear infinite;
    opacity: 0.4;
    transform: scale(0.9);
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes rotate-reverse {
    0% {
      transform: rotate(360deg) scale(0.9);
    }
    100% {
      transform: rotate(0deg) scale(0.9);
    }
  }
`;

export default Pattern; 