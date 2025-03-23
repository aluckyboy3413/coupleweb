import React from 'react';
import styled from 'styled-components';

// 导出渐变值作为常量，便于其他组件复用
export const LOVE_GRADIENT = 'linear-gradient(45deg, rgba(247, 84, 84, 0.3) 25%, transparent 25%, transparent 75%, rgba(247, 84, 84, 0.3) 75%), linear-gradient(-45deg, rgba(247, 84, 84, 0.3) 25%, transparent 25%, transparent 75%, rgba(247, 84, 84, 0.3) 75%)';
export const LOVE_BACKGROUND_COLOR = '#f7e5e5';

const LovePattern = () => {
  return (
    <StyledPattern>
      <div className="pattern-inner" />
    </StyledPattern>
  );
}

// 完全覆盖页面的样式
const StyledPattern = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: -10;
  
  .pattern-inner {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: ${LOVE_BACKGROUND_COLOR};
    
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      background: ${LOVE_GRADIENT};
      background-size: 50px 50px, 50px 50px;
      background-position: 0 0, 25px 25px;
    }
  }

  @media (prefers-contrast: more) {
    .pattern-inner {
      background-color: #f7d5d5;
    }
    .pattern-inner::before {
      opacity: 0.9;
    }
  }
`;

export default LovePattern; 