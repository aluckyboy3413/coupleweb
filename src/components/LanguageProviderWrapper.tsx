"use client";

import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';

// 客户端组件包装器，解决服务器组件中使用LanguageProvider的问题
const LanguageProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <LanguageProvider>{children}</LanguageProvider>;
};

export default LanguageProviderWrapper; 