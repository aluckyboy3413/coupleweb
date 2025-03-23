"use client";

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

// 导航按钮类型定义
interface StyledNavButtonProps {
  label: string;
  href: string;
  variant: 'love' | 'memory' | 'special'; // 三种不同的按钮样式
}

// 带样式的导航按钮组件，可配置不同的颜色主题
const StyledNavButton: React.FC<StyledNavButtonProps> = ({ label, href, variant }) => {
  return (
    <StyledWrapper $variant={variant}>
      <Link href={href} className="no-underline">
        <button className={`btn btn-${variant}`}>
          {label}
        </button>
      </Link>
    </StyledWrapper>
  );
}

// 根据variant属性应用不同的样式
const StyledWrapper = styled.div<{ $variant: string }>`
  .btn {
   padding: 0.8em 1.5em;
   background: none;
   border: 2px solid #fff;
   font-size: 15px;
   cursor: pointer;
   position: relative;
   overflow: hidden;
   transition: all 0.3s;
   border-radius: 12px;
   font-weight: bolder;
   box-shadow: 0 2px 0 2px #000;
  }

  /* 爱情按钮 - 使用红色主题 */
  .btn-love {
   color: #000000;
   background-color: #FF4D4D; /* 红色背景 */
  }

  .btn-love:before {
   content: "";
   position: absolute;
   width: 100px;
   height: 120%;
   background-color: #ff85a2; /* 浅红色滑动效果 */
   top: 50%;
   transform: skewX(30deg) translate(-150%, -50%);
   transition: all 0.5s;
  }

  .btn-love:hover {
   background-color: #ff3366; /* 深红色悬停背景 */
   color: #fff;
   box-shadow: 0 2px 0 2px #660033;
  }

  /* 回忆按钮 - 使用蓝色主题 */
  .btn-memory {
   color: #000000;
   background-color: #5D7BFA; /* 蓝色背景 */
  }

  .btn-memory:before {
   content: "";
   position: absolute;
   width: 100px;
   height: 120%;
   background-color: #8fb8ff; /* 浅蓝色滑动效果 */
   top: 50%;
   transform: skewX(30deg) translate(-150%, -50%);
   transition: all 0.5s;
  }

  .btn-memory:hover {
   background-color: #4169E1; /* 深蓝色悬停背景 */
   color: #fff;
   box-shadow: 0 2px 0 2px #001a66;
  }

  /* 特别按钮 - 使用绿色主题 */
  .btn-special {
   color: #000000;
   background-color: #00C27A; /* 绿色背景 */
  }

  .btn-special:before {
   content: "";
   position: absolute;
   width: 100px;
   height: 120%;
   background-color: #66ffbb; /* 浅绿色滑动效果 */
   top: 50%;
   transform: skewX(30deg) translate(-150%, -50%);
   transition: all 0.5s;
  }

  .btn-special:hover {
   background-color: #00994d; /* 深绿色悬停背景 */
   color: #fff;
   box-shadow: 0 2px 0 2px #004d26;
  }

  /* 所有按钮共享的动画效果 */
  .btn:hover::before {
   transform: skewX(30deg) translate(150%, -50%);
   transition-delay: 0.1s;
  }

  .btn:active {
   transform: scale(0.9);
  }
`;

export default StyledNavButton; 