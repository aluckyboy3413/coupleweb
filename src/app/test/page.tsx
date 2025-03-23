"use client";

import React from 'react';
import Link from 'next/link';

export default function TestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-days-yellow p-8">
      <h1 className="text-4xl font-bold mb-4">测试页面</h1>
      <p className="text-xl mb-8">如果您能看到此内容，说明应用正常工作！</p>
      <Link href="/" className="bg-days-blue text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition">
        返回首页
      </Link>
    </div>
  );
} 