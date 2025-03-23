"use client";

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Shop按钮组件 - 网站LOGO位置使用
const ShopButton = () => {
  const pathname = usePathname();
  const isPatternedPage = pathname === '/special' || pathname === '/memory';
  
  return (
    <StyledWrapper $isPatternedPage={isPatternedPage}>
      <Link href="/" className="no-underline">
        <button className="btn">
          LOVE DAYS
        </button>
      </Link>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div<{ $isPatternedPage: boolean }>`
  .btn {
   padding: 0.8em 1.5em;
   background: none;
   border: 2px solid ${props => props.$isPatternedPage ? '#000' : '#fff'};
   font-size: 18px;
   color: #000000; /* 使用黑色文字 */
   cursor: pointer;
   position: relative;
   overflow: hidden;
   transition: all 0.3s;
   border-radius: 12px;
   background-color: ${props => props.$isPatternedPage ? 'rgba(255, 255, 255, 0.7)' : '#FFDD00'};
   font-weight: bolder;
   box-shadow: 0 2px 0 2px #000;
   text-transform: uppercase;
  }

  .btn:before {
   content: "";
   position: absolute;
   width: 100px;
   height: 120%;
   background-color: ${props => props.$isPatternedPage ? 'rgba(144, 238, 144, 0.5)' : '#5D7BFA'};
   top: 50%;
   transform: skewX(30deg) translate(-150%, -50%);
   transition: all 0.5s;
  }

  .btn:hover {
   background-color: #00C27A; /* 使用网站的绿色作为悬停背景 */
   color: #fff;
   box-shadow: 0 2px 0 2px #0d3b66;
  }

  .btn:hover::before {
   transform: skewX(30deg) translate(150%, -50%);
   transition-delay: 0.1s;
  }

  .btn:active {
   transform: scale(0.9);
  }
`;

export default ShopButton; 