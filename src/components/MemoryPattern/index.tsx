import React from 'react';
import styled from 'styled-components';

// 导出渐变值作为常量，便于其他组件复用
export const MEMORY_GRADIENT = 'linear-gradient(90deg, #009ffd, #2a2a72)';
export const MEMORY_PATTERN_OVERLAY = 'repeating-linear-gradient(45deg, transparent 0, transparent 35px, rgba(255, 255, 255, 0.15) 35px, rgba(255, 255, 255, 0.15) 70px), repeating-linear-gradient(-45deg, transparent 0, transparent 35px, rgba(255, 255, 255, 0.15) 35px, rgba(255, 255, 255, 0.15) 70px)';
export const MEMORY_RADIAL_OVERLAY = 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0.5) 100%)';

// 这是Memory页面的花纹背景组件
// 目前为空，以后会实现不同的花纹样式
const MemoryPattern = () => {
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
    background-color: #2a2a72;
    
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      background: ${MEMORY_PATTERN_OVERLAY}, ${MEMORY_GRADIENT};
    }
    
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      background: ${MEMORY_RADIAL_OVERLAY};
      mix-blend-mode: overlay;
      z-index: 1;
    }
  }

  @media (prefers-contrast: more) {
    .pattern-inner {
      background-color: #1a1a4a;
    }
    .pattern-inner::before {
      opacity: 0.9;
    }
  }
`;

export default MemoryPattern; 