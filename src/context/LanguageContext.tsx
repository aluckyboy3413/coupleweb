"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

// 定义语言上下文的类型
type LanguageContextType = {
  language: 'en' | 'zh';
  isEnglish: boolean;
  toggleLanguage: () => void;
  t: (en: string, zh: string) => string;
};

// 创建上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 语言提供器Props
interface LanguageProviderProps {
  children: ReactNode;
}

// 语言提供器组件
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // 语言状态，默认为英文
  const [language, setLanguage] = useState<'en' | 'zh'>('en');
  
  // 切换语言的函数
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };
  
  // 简易翻译函数
  const t = (en: string, zh: string) => {
    return language === 'en' ? en : zh;
  };
  
  // 上下文值
  const contextValue: LanguageContextType = {
    language,
    isEnglish: language === 'en',
    toggleLanguage,
    t
  };
  
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// 自定义hook，方便在组件中使用语言上下文
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
}; 