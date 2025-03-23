"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ShopButton from './ShopButton';
import StyledNavButton from './StyledNavButton';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';

// 从Pattern组件导入相同的渐变值和不透明度
import { GRADIENT_PATTERN, PATTERN_OPACITY } from '@/components/Pattern';

// 创建一个完全透明的导航容器，用于special页面
const TransparentNavContainer = styled.nav`
  width: 100%;
  padding: 1rem 1rem;
  position: relative;
  background: transparent;
  
  @media (min-width: 768px) {
    padding: 1rem 2rem;
  }
`;

// 普通导航容器，带有黄色背景
const RegularNavContainer = styled.nav`
  width: 100%;
  padding: 1rem 1rem;
  position: relative;
  background-color: #FFDD00; /* 黄色背景 */
  
  @media (min-width: 768px) {
    padding: 1rem 2rem;
  }
`;

const Navbar = () => {
  const pathname = usePathname();
  const isSpecialPage = pathname === '/special';
  const isMemoryPage = pathname === '/memory';
  const isLovePage = pathname === '/love';
  const isHomePage = pathname === '/';
  const isPatternedPage = isSpecialPage || isMemoryPage || isLovePage || isHomePage;
  
  // 根据页面类型选择不同的导航容器
  const NavContainer = isPatternedPage ? TransparentNavContainer : RegularNavContainer;
  
  return (
    <NavContainer>
      <div className="container-custom flex justify-between items-center relative z-10 max-w-7xl mx-auto">
        {/* Logo - 使用新的ShopButton组件 */}
        <div className="flex-shrink-0">
          <ShopButton />
        </div>

        {/* 导航链接 - 居中显示 */}
        <div className="flex items-center space-x-4 justify-center flex-grow">
          <StyledNavButton 
            label="LOVE" 
            href="/love" 
            variant="love" 
          />
          <StyledNavButton 
            label="MEMORY" 
            href="/memory" 
            variant="memory" 
          />
          <StyledNavButton 
            label="SPECIAL" 
            href="/special" 
            variant="special" 
          />
        </div>

        {/* 为了平衡布局，添加一个空的flex元素 */}
        <div className="flex-shrink-0 w-[80px]"></div>
      </div>
    </NavContainer>
  );
};

export default Navbar; 