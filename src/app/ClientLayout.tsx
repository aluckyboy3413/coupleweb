"use client";

import React, { useState, useEffect } from 'react';
import MusicPlayer from '@/components/MusicPlayer';
import CustomCursor from '@/components/CustomCursor';

// 使用React Context来跨页面共享音乐播放状态
export const MusicContext = React.createContext({
  isPlaying: false,
  setIsPlaying: (playing: boolean) => {},
  currentSong: 0,
  setCurrentSong: (song: number) => {},
  volume: 0.8,
  setVolume: (vol: number) => {}
});

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  // 创建全局音乐状态
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [volume, setVolume] = useState(0.8);

  return (
    <MusicContext.Provider value={{ 
      isPlaying, 
      setIsPlaying, 
      currentSong, 
      setCurrentSong,
      volume,
      setVolume
    }}>
      <div className="min-h-screen relative">
        {children}
        <MusicPlayer />
        <CustomCursor />
      </div>
    </MusicContext.Provider>
  );
} 