"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CardSlider from '@/components/CardSlider';
import ColorfulText from '@/components/ColorfulText';
import WeatherCardContainer from '@/components/WeatherCardContainer';

// 鼠标跟踪的粒子效果
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  speed: number;
  opacity: number;
  life: number;
}

export default function HomeContent() {
  // 跟踪鼠标位置状态用于视差效果
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // 点击心形粒子状态
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // 滑动动画效果
  useEffect(() => {
    // 等待DOM完全加载
    const handleAnimation = () => {
      // 添加延迟效果使各个元素依次进入
      const redPanel = document.querySelector('.red-panel');
      const bluePanel = document.querySelector('.blue-panel');
      const greenPanel = document.querySelector('.green-panel');
      const bottomBanner = document.querySelector('.bottom-banner');
      const mainTitle = document.querySelectorAll('.main-title-container');
      
      // 面板滑入效果
      if (redPanel) redPanel.classList.add('animate-slide-in-left');
      if (bluePanel) bluePanel.classList.add('animate-slide-in-top');
      if (greenPanel) greenPanel.classList.add('animate-slide-in-right');
      if (bottomBanner) bottomBanner.classList.add('animate-slide-in-bottom');
      
      // 文本渐变浮现效果
      mainTitle.forEach((title, index) => {
        setTimeout(() => {
          title.classList.add('animate-fade-in');
        }, 500 + (index * 300)); // 错开时间
      });
    };
    
    // 延迟一些时间后开始动画，让页面有足够时间加载
    const timer = setTimeout(handleAnimation, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // 鼠标跟踪效果用于视差
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 计算相对于窗口中心的偏移量 (-1 到 1 之间)
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // 点击效果
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newParticles: Particle[] = [];
      const particleCount = 12; // 产生的心形粒子数量
      
      for (let i = 0; i < particleCount; i++) {
        // 创建随机特性的心形粒子
        newParticles.push({
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 15 + 10,
          color: `hsl(${(i * 30) % 360}, 100%, 70%)`,
          angle: (Math.PI * 2 * i) / particleCount,
          speed: Math.random() * 3 + 2,
          opacity: 1,
          life: 100
        });
      }
      
      setParticles(prev => [...prev, ...newParticles]);
    };
    
    window.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);
  
  // 更新粒子状态
  useEffect(() => {
    if (particles.length === 0) return;
    
    const timer = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles
          .map(particle => ({
            ...particle,
            x: particle.x + Math.cos(particle.angle) * particle.speed,
            y: particle.y + Math.sin(particle.angle) * particle.speed - 0.5, // 添加向上漂浮的效果
            opacity: particle.opacity - 0.02,
            life: particle.life - 1
          }))
          .filter(particle => particle.life > 0)
      );
    }, 30);
    
    return () => clearInterval(timer);
  }, [particles]);
  
  // 计算视差效果样式，确保仅在客户端执行
  const getParallaxStyles = () => {
    return {
      redPanelStyle: {
        transform: `translate(${(mousePosition.x / window.innerWidth - 0.5) * 2 * -15}px, ${(mousePosition.y / window.innerHeight - 0.5) * 2 * -15}px)`,
        transition: 'transform 0.3s ease-out',
      },
      
      bluePanelStyle: {
        transform: `translate(${(mousePosition.x / window.innerWidth - 0.5) * 2 * -8}px, ${(mousePosition.y / window.innerHeight - 0.5) * 2 * -8}px)`,
        transition: 'transform 0.3s ease-out',
      },
      
      greenPanelStyle: {
        transform: `translate(${(mousePosition.x / window.innerWidth - 0.5) * 2 * -20}px, ${(mousePosition.y / window.innerHeight - 0.5) * 2 * -20}px)`,
        transition: 'transform 0.3s ease-out',
      },
      
      titleStyle: {
        transform: `translate(${(mousePosition.x / window.innerWidth - 0.5) * 2 * 10}px, ${(mousePosition.y / window.innerHeight - 0.5) * 2 * 10}px)`,
        transition: 'transform 0.2s ease-out',
      }
    };
  };
  
  // 获取视差样式
  const { redPanelStyle, bluePanelStyle, greenPanelStyle, titleStyle } = getParallaxStyles();

  return (
    <>
      {/* 心形粒子效果 */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="heart-particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
        ></div>
      ))}
      
      {/* 三栏布局，全屏滑动效果 */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {/* 左侧面板 - 红色背景 - 阿加迪尔的天气 */}
        <div 
          className="red-panel bg-days-red h-full opacity-0 transform translate-x-[-100%] relative flex items-center justify-center"
          style={redPanelStyle}
        >
          <div className="p-6 h-full max-w-[450px] w-full flex items-center justify-center">
            <WeatherCardContainer 
              locationId="31.50,-9.77" 
              cityName="Agadir" 
              country="Morocco"
              personName="Fadoua" 
              colorTheme="warm"
              timezone={1} /* 摩洛哥阿加迪尔(西部时间)为UTC+1 */
            />
          </div>
        </div>
        
        {/* 中间面板 - 蓝色背景，包含人名 */}
        <div 
          className="blue-panel bg-days-blue h-full flex flex-col items-center justify-center text-center p-8 opacity-0 transform translate-y-[-100%]"
          style={bluePanelStyle}
        >
          <div className="w-full max-w-full space-y-4 overflow-hidden" style={titleStyle}>
            <h1 className="main-title-container text-5xl md:text-6xl lg:text-7xl font-bold text-black opacity-0 text-3d">FADOUA</h1>
            <h1 className="main-title-container text-5xl md:text-6xl lg:text-7xl font-bold text-black opacity-0 text-3d">AND</h1>
            <h1 className="main-title-container text-5xl md:text-6xl lg:text-7xl font-bold text-black opacity-0 text-3d">JIANWEI</h1>
          </div>
        </div>
        
        {/* 右侧面板 - 绿色背景 - 贵港的天气 */}
        <div 
          className="green-panel bg-days-green h-full opacity-0 transform translate-x-[100%] relative flex items-center justify-center"
          style={greenPanelStyle}
        >
          <div className="p-6 h-full max-w-[450px] w-full flex items-center justify-center">
            <WeatherCardContainer 
              locationId="CN101300801" 
              cityName="Guigang" 
              country="China"
              personName="Jianwei" 
              colorTheme="cool"
              timezone={8} /* 中国为UTC+8 */
            />
          </div>
        </div>
      </div>
      
      {/* 底部横幅 - 卡片轮播 */}
      <div className="bottom-banner py-8 px-4 flex items-center justify-center opacity-0 transform translate-y-[100%] overflow-hidden" style={{ height: '200px' }}>
        <CardSlider />
      </div>
      
      {/* 添加CSS动画 */}
      <style jsx global>{`        
        .heart-particle {
          position: fixed;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 1000;
          clip-path: path('M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z');
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInTop {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideInBottom {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 1.2s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 1.2s ease-out forwards;
        }
        
        .animate-slide-in-top {
          animation: slideInTop 1.2s ease-out forwards;
        }
        
        .animate-slide-in-bottom {
          animation: slideInBottom 1.2s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 1.5s ease-out forwards;
        }
        
        .text-3d {
          text-shadow: 
            2px 2px 0px #000,
            4px 4px 0px rgba(0,0,0,0.2),
            6px 6px 0px rgba(0,0,0,0.2),
            8px 8px 0px rgba(0,0,0,0.1);
          transform: translateZ(0);
          letter-spacing: 0.1em;
          font-family: 'Arial Black', Gadget, sans-serif;
          font-weight: 900;
        }
      `}</style>
    </>
  );
} 