"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import MemoryPattern from '@/components/MemoryPattern';
import ColorfulText from '@/components/ColorfulText';
import MovieCard from '@/components/MovieCard';
import MemoryCard from '@/components/MemoryCard';
import StrokesShadowsHalftoneEffects from '@/components/strokes-shadows-halftone-effects';
import styled from 'styled-components';

const StyledMemorySection = styled.div`
  position: relative;
  padding: 2rem 0;
  margin-bottom: 4rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  }
  
  .description {
    max-width: 600px;
    margin: 0 auto 2rem;
    text-align: center;
    color: rgba(255,255,255,0.8);
    font-style: italic;
    line-height: 1.6;
  }
  
  .title-wrapper {
    margin-bottom: 2rem;
  }
`;

export default function MemoryPage() {
  // 电影列表数据
  const movies = [
    { id: 1, engTitle: 'You are the apple of my eye', cnTitle: '那些年我们一起追的女孩', date: '2024.8.15', posterUrl: '/images/movies/1.jpg' },
    { id: 2, engTitle: 'The notebook', cnTitle: '恋恋笔记本', date: '2024.8.27', posterUrl: '/images/movies/2.jpg' },
    { id: 3, engTitle: 'Hello, Mr. Billionaire', cnTitle: '西虹市首富', date: '2024.9.4', posterUrl: '/images/movies/3.jpg' },
    { id: 4, engTitle: '18×2 beyond youthful days', cnTitle: '错过你的那些年', date: '2024.9.6', posterUrl: '/images/movies/4.jpg' },
    { id: 5, engTitle: '500 days of summer', cnTitle: '和莎莫的五百天', date: '2024.9.9', posterUrl: '/images/movies/5.jpg' },
    { id: 6, engTitle: 'Gold or shit', cnTitle: '走走停停', date: '2024.9.19', posterUrl: '/images/movies/6.jpg' },
    { id: 7, engTitle: 'White snake', cnTitle: '白蛇', date: '2024.9.19', posterUrl: '/images/movies/7.jpg' },
    { id: 8, engTitle: '10 things I hate about you', cnTitle: '我恨你的10件事', date: '2024.9.20', posterUrl: '/images/movies/8.jpg' },
    { id: 9, engTitle: 'Good bye Mr loser', cnTitle: '夏洛特烦恼', date: '2024.9.26', posterUrl: '/images/movies/9.jpg' },
    { id: 10, engTitle: 'Wandering earth 1', cnTitle: '流浪地球1', date: '2024.12.11', posterUrl: '/images/movies/10.jpg' },
    { id: 11, engTitle: 'Wandering earth 2', cnTitle: '流浪地球2', date: '2024.12.20', posterUrl: '/images/movies/11.jpg' },
    { id: 12, engTitle: 'Nezha 1', cnTitle: '哪吒1', date: '2025.2.8', posterUrl: '/images/movies/12.jpg' },
  ];

  return (
    <div className="memory-page-container">
      <MemoryPattern />
      
      <div className="content-wrapper">
        <Navbar />
        
        <div className="content-container">
          <div className="container-custom relative z-10 max-w-7xl mx-auto">
            <ColorfulText text="Our Memories" className="text-white" />
            
            {/* 电影墙 */}
            <div className="mb-16 max-w-6xl mx-auto">
              <div className="flex flex-wrap justify-center gap-4">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    title={movie.cnTitle}
                    englishTitle={movie.engTitle}
                    date={movie.date}
                    posterUrl={movie.posterUrl}
                  />
                ))}
              </div>
            </div>
            
            {/* 3D 截图轮播 */}
            <StyledMemorySection>
              <div className="title-wrapper">
                <StrokesShadowsHalftoneEffects>
                  <h2 className="text-3xl font-bold mb-4 text-center">Screenshots Gallery</h2>
                </StrokesShadowsHalftoneEffects>
              </div>
              
              <MemoryCard />
            </StyledMemorySection>
            
            <div className="mt-12 text-center">
              <Link href="/" className="inline-block px-6 py-3 bg-white text-blue-800 rounded-lg font-semibold shadow-lg hover:bg-opacity-90 transition-all">
                Back Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        body, html {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          width: 100%;
          height: 100%;
        }
        
        .memory-page-container {
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow-x: hidden;
        }
        
        .content-wrapper {
          width: 100%;
          min-height: 100vh;
          position: relative;
          z-index: 1;
        }
        
        .content-container {
          width: 100%;
          padding: 2rem 1rem;
        }
      `}</style>
    </div>
  );
} 