"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Pattern from '@/components/Pattern';
import dynamic from 'next/dynamic';

// 动态导入客户端组件，不在服务器端预渲染
const HomeContent = dynamic(() => import('@/components/HomeContent'), {
  ssr: false, // 禁用服务器端渲染
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-2xl font-bold">加载中...</div>
    </div>
  )
});

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen overflow-hidden">
      <Pattern />
      <Navbar />
      <HomeContent />
    </main>
  );
} 