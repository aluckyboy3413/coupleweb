"use client";

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  speed: number;
}

const CustomCursor = () => {
  // 跟踪鼠标位置状态
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // 爱心粒子状态
  const [particles, setParticles] = useState<Particle[]>([]);
  // 追踪点击状态用于光标动画
  const [isClicking, setIsClicking] = useState(false);
  
  // 鼠标跟踪效果
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handleClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // 创建10-15个新粒子
      const newParticles: Particle[] = [];
      const particleCount = Math.floor(Math.random() * 6) + 10;
      
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2; // 随机角度
        newParticles.push({
          id: Date.now() + i,
          x,
          y,
          size: Math.random() * 15 + 10,
          color: `hsl(${Math.random() * 60 + 330}, 100%, 70%)`, // 粉色到紫色
          angle,
          speed: Math.random() * 4 + 2,
        });
      }
      
      setParticles(prev => [...prev, ...newParticles]);
      
      // 定时清除粒子
      setTimeout(() => {
        setParticles(prevParticles => 
          prevParticles.filter(p => !newParticles.find(np => np.id === p.id))
        );
      }, 1000);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {/* 自定义光标 */}
      <div 
        className="custom-cursor"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: isClicking ? 'translate(-50%, -50%) scale(0.8)' : 'translate(-50%, -50%)',
          filter: isClicking ? 'drop-shadow(0 0 5px rgba(255,107,149,0.8))' : 'drop-shadow(0 0 2px rgba(255,255,255,0.5))'
        }}
      />
      
      {/* 光晕效果 */}
      <div 
        className="glow-effect" 
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`
        }}
      />
      
      {/* 爱心粒子 */}
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
            '--dx': Math.cos(particle.angle) * particle.speed,
            '--dy': Math.sin(particle.angle) * particle.speed,
          } as React.CSSProperties}
        />
      ))}
      
      <style jsx global>{`
        /* 隐藏默认光标 */
        body, button, a, input {
          cursor: none !important;
        }
        
        /* 自定义光标样式 */
        .custom-cursor {
          position: fixed;
          width: 24px;
          height: 24px;
          pointer-events: none;
          z-index: 10000;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ff6b95'%3E%3Cpath d='M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z'/%3E%3C/svg%3E");
          transition: transform 0.1s ease, filter 0.1s ease;
          animation: cursor-float 2s infinite alternate ease-in-out;
        }
        
        @keyframes cursor-float {
          0% { transform: translate(-50%, -50%) rotate(-5deg); }
          100% { transform: translate(-50%, -50%) rotate(5deg); }
        }
        
        /* 光晕效果 */
        .glow-effect {
          position: fixed;
          pointer-events: none; 
          width: 250px;
          height: 250px;
          border-radius: 50%;
          background: radial-gradient(
            circle, 
            rgba(255,255,255,0.3) 0%, 
            rgba(255,255,255,0.1) 30%, 
            rgba(255,255,255,0) 70%
          );
          transform: translate(-50%, -50%);
          z-index: 9999;
          mix-blend-mode: screen;
          filter: blur(15px);
        }
        
        /* 爱心粒子效果 */
        .heart-particle {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          animation: float-away 1s forwards;
          /* 爱心形状 */
          clip-path: path('M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z');
          transform-origin: center;
        }
        
        @keyframes float-away {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.2) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate(
              calc(-50% + var(--dx) * 100px), 
              calc(-50% + var(--dy) * 100px)
            ) scale(1) rotate(calc(var(--dx) * 360deg));
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor; 