import React from 'react';
import styled from 'styled-components';

// 导出渐变值作为常量，便于其他组件复用
export const GRADIENT_PATTERN = 'repeating-linear-gradient(45deg, #92c9b1, #92c9b1 20px, #b3e0d2 20px, #b3e0d2 40px)';
// 导出统一的不透明度
export const PATTERN_OPACITY = 0.7;

const Pattern = () => {
  return <StyledPattern />;
}

const StyledPattern = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${GRADIENT_PATTERN};
  opacity: ${PATTERN_OPACITY};
  z-index: -100;
`;

export default Pattern; 