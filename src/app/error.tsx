"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 可以在这里记录错误到错误报告服务
    console.error('应用发生错误:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-days-yellow">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-days-red mb-4">出错了</h1>
        <p className="text-gray-700 mb-6">抱歉，应用程序遇到了一个问题。</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => reset()}
            className="bg-days-blue text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition"
          >
            重试
          </button>
          <Link href="/" className="bg-days-green text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition text-center">
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
} 