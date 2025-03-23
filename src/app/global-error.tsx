"use client";

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="zh">
      <head>
        <title>严重错误 | 情侣网站</title>
      </head>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-days-yellow">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-days-red mb-4">严重错误</h1>
            <p className="text-gray-700 mb-6">应用程序发生了无法恢复的错误。</p>
            <button
              onClick={() => reset()}
              className="bg-days-blue text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition"
            >
              重试
            </button>
          </div>
        </div>
      </body>
    </html>
  );
} 