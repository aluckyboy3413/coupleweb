"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Pattern from '@/components/Pattern/index';
import BirthdayCard from '@/components/BirthdayCard';
import PhotoFrame from '@/components/PhotoFrame';
import ColorfulText from '@/components/ColorfulText';
import TimelineCard from '@/components/TimelineCard';
import StrokesShadowsHalftoneEffects from '@/components/strokes-shadows-halftone-effects';
import InstagramCssFilters from '@/components/instagram-css-filters';

// 定义日期接口，避免类型错误
interface EventItem {
  id: number;
  title: string;
  date: string;
  description: string;
  daysCount: number; // 统一使用daysCount表示天数
  isInPast: boolean; // 标记是否是过去的事件
}

export default function SpecialPage() {
  // WhatsApp添加好友日期
  const whatsAppDate = new Date('2024-04-28');
  const today = new Date();
  const daysSinceWhatsApp = Math.ceil((today.getTime() - whatsAppDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // 辅助函数：计算两个日期之间的天数
  function calculateDays(dateString: string): { days: number, isPast: boolean } {
    const targetDate = new Date(dateString);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return { 
      days: Math.abs(diffDays), // 始终为正数
      isPast: diffDays <= 0 // 是否已经过去
    };
  }
  
  // 计算到生日的天数
  function calculateDaysToBirthday(month: number, day: number): number {
    const currentYear = today.getFullYear();
    let birthdayThisYear = new Date(currentYear, month - 1, day); // 月份是0-11
    
    // 如果今年的生日已经过了，计算到明年生日的天数
    if (birthdayThisYear.getTime() < today.getTime()) {
      birthdayThisYear = new Date(currentYear + 1, month - 1, day);
    }
    
    return Math.ceil((birthdayThisYear.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  }
  
  // 计算生日倒计时
  const daysTillFadouaBirthday = calculateDaysToBirthday(7, 5); // 7月5日
  const daysTillJianweiBirthday = calculateDaysToBirthday(5, 25); // 5月25日
  
  // 事件时间线数据（WhatsApp已在上面展示，这里不再包含）
  const otherDates = [
    { title: 'Confession', date: '2024-07-31', description: 'The day I confessed my feelings to you.' },
    { title: 'Exchange Pictures', date: '2024-10-29', description: 'We shared our pictures with each other, getting to know each other more.' },
    { title: 'First Voice Message from Fadoua', date: '2024-11-18', description: 'The first time I heard your beautiful voice through a voice message.' },
    { title: 'Friended on WeChat', date: '2025-03-01', description: 'We connected on WeChat, expanding our ways to communicate.' },
    { title: 'Be My Girlfriend', date: '2025-03-21', description: 'The beautiful day when you agreed to be my girlfriend. Our love story officially began.' },
  ];
  
  // 构建重要事件数组
  const importantEvents: EventItem[] = [];
  
  // 将其他事件添加到importantEvents数组
  otherDates.forEach((event, index) => {
    const { days, isPast } = calculateDays(event.date);
    importantEvents.push({
      id: index + 1,
      title: event.title,
      date: event.date,
      daysCount: days,
      isInPast: isPast,
      description: event.description
    });
  });

  // "I Will Take Fadoua" 未来计划列表
  const futurePlans = [
    "Try hot pot",
    "Try jiaozi",
    "Give her a beautiful hairpin",
    "Night walk, at park or some quiet places",
    "Go to the beach",
    "Climb a mountain, maybe ZhangJiajie",
    "Hang around in the mall, shopping with her",
    "IKEA date",
    "Private cinema",
    "Go to an English singer concert",
    "Go to a luxury buffet",
    "Try hbaf nut",
    "Aquarium date",
    "To zoo with panda",
    "Cruise ship travel",
    "Clay date",
    "Internet cafe date",
    "Beach restaurant",
    "Watch drone show",
    "Cuddling sleep",
    "Compare hand size",
    "Firework show",
    "Get up early to see sunrise",
    "100 mins of kissing",
    "Lick her face",
    "The escape room",
    "Feed her bobas",
    "Pass food from mouth",
    "Make out from 9:00-24:00",
    "Leave a hickey",
    "Night beach date",
    "Wall kiss",
    "Cuddle and watch tiktok",
    "Star gaze",
    "Kart race",
    "Wake up kiss"
  ];

  // "I Will Take Fadoua" 照片数据
  const futurePlanImages = futurePlans.map((plan) => {
    // 创建计划名称到文件名的映射
    const specialNameMapping: Record<string, string> = {
      "Make out from 9:00-24:00": "Make out from 9002400",
      "Night walk, at park or some quiet places": "Night walk,at park or some quiet places",
      "Climb a mountain, maybe ZhangJiajie": "Climb a mountain,maybe ZhangJiajie",
      "Hang around in the mall, shopping with her": "Hang around in the mall,shopping with her",
      "Go to the beach": "Go to the beach",
      "Go to a luxury buffet": "Go to a luxury buffet",
      "Go to an English singer concert": "Go to an English singer concert"
    };
    
    // 获取文件名，优先使用映射，否则使用原名称
    const fileName = specialNameMapping[plan] || plan;
    
    return {
      src: `/images/future-plans/${fileName}.jpeg`,
      title: plan
    };
  });

  return (
    <div className="min-h-screen pb-32">
      <Pattern />
      <Navbar />
      
      <div className="z-10 p-8 w-full relative">
        <div className="container-custom z-20 relative mx-auto max-w-7xl">
          <ColorfulText text="Our Special Days" />
          
          {/* WhatsApp好友添加纪念 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 relative z-20 mx-auto">
            <div className="hidden md:block">
              <PhotoFrame 
                imageSrc="/images/fadoua.jpg" 
                alt="Fadoua" 
              />
            </div>
            
            <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-lg shadow-lg p-8 text-center flex-1 max-w-2xl mx-auto border-4 border-green-200">
              <h2 className="text-2xl font-bold text-green-800 mb-4">WhatsApp Friendship Anniversary</h2>
              <div className="text-7xl md:text-9xl font-bold text-green-600 mb-6">{daysSinceWhatsApp}</div>
              <p className="text-green-700 text-lg">We've been friends for {daysSinceWhatsApp} days on WhatsApp</p>
            </div>
            
            <div className="hidden md:block">
              <PhotoFrame 
                imageSrc="/images/jianwei.jpg" 
                alt="Jianwei" 
              />
            </div>
          </div>
          
          {/* 生日倒计时 - 使用BirthdayCard组件 */}
          <div className="grid grid-cols-1 gap-6 mb-10 max-w-4xl mx-auto">
            <BirthdayCard 
              name="Fadoua" 
              date="July 5" 
              daysCount={daysTillFadouaBirthday} 
              cardColor="#FFB6C1" // 粉色
            />
            
            <BirthdayCard 
              name="Jianwei" 
              date="May 25" 
              daysCount={daysTillJianweiBirthday} 
              cardColor="#92c9b1" // 绿色
            />
          </div>
          
          {/* 重要事件 - 调整布局 */}
          <div className="mb-16 relative z-20 max-w-4xl mx-auto text-center">
            <StrokesShadowsHalftoneEffects>
              <h2 className="text-3xl font-bold mb-6">Important Milestones</h2>
            </StrokesShadowsHalftoneEffects>
            <div className="flex flex-wrap gap-4 justify-between">
              {importantEvents.map((event, index) => (
                <TimelineCard
                  key={event.id}
                  title={event.title}
                  date={event.date}
                  daysCount={event.daysCount}
                  isInPast={event.isInPast}
                  colorIndex={index % 5}
                />
              ))}
            </div>
          </div>

          {/* I Will Take Fadoua 照片墙 */}
          <div className="mb-16 relative z-20 max-w-7xl mx-auto">
            <StrokesShadowsHalftoneEffects>
              <h2 className="text-3xl font-bold mb-6">I Will Take Fadoua</h2>
            </StrokesShadowsHalftoneEffects>
            <InstagramCssFilters images={futurePlanImages} />
          </div>
          
          <div className="mt-12 text-center relative z-20 mx-auto">
            <Link href="/" className="btn btn-primary">
              Back Home
            </Link>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        body {
          overflow-x: hidden;
          position: relative;
          min-height: 100vh;
          width: 100%;
        }
        
        .min-h-screen {
          min-height: 100vh;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
} 