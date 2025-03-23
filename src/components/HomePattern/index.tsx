import React from 'react';
import styled from 'styled-components';

// 导出渐变值作为常量，便于复用
export const HOME_GRADIENT = 'repeating-linear-gradient(45deg, orange, orange 10px, orangered 10px, orangered 20px)';
export const HOME_PATTERN_OPACITY = 1; // 完全不透明

const HomePattern = () => {
  return <StyledPattern />;
}

const StyledPattern = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${HOME_GRADIENT};
  z-index: -100;
`;

export default HomePattern; 