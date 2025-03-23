import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-days-yellow">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-7xl font-bold text-days-red mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">页面未找到</h2>
        <p className="text-gray-700 mb-6">抱歉，您尝试访问的页面不存在。</p>
        <Link href="/" className="inline-block bg-days-green text-white py-2 px-6 rounded-lg hover:bg-opacity-90 transition">
          返回首页
        </Link>
      </div>
    </div>
  );
} 