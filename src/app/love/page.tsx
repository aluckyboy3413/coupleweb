"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import LovePattern from '@/components/LovePattern';
import ColorfulText from '@/components/ColorfulText';
import NotificationCard from '@/components/NotificationCard';
import Button from '@/components/Button';
import FlipCard from '@/components/FlipCard';
import styled from 'styled-components';
import LikeTooltip from '@/components/LikeTooltip';

const StyledLikeItem = styled.div`
  position: relative;
  cursor: pointer;
  z-index: 1;
  
  &:hover {
    z-index: 10;
  }

  .like-button {
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    font-family: inherit;
    font-size: 14px;
    width: 100%;
    font-weight: 600;
    color: #382b22;
    text-transform: uppercase;
    padding: 1em 0.8em;
    background: #fff0f0;
    border: 2px solid #b18597;
    border-radius: 0.75em;
    transform-style: preserve-3d;
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);

    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #f9c4d2;
      border-radius: inherit;
      box-shadow: 0 0 0 2px #b18597, 0 0.625em 0 0 #ffe3e2;
      transform: translate3d(0, 0.75em, -1em);
      transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
    }

    &:hover {
      background: #ffe9e9;
      transform: translate(0, 0.25em);
    }

    &:hover::before {
      box-shadow: 0 0 0 2px #b18597, 0 0.5em 0 0 #ffe3e2;
      transform: translate3d(0, 0.5em, -1em);
    }

    &:active {
      background: #ffe9e9;
      transform: translate(0em, 0.75em);
    }

    &:active::before {
      box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
      transform: translate3d(0, 0, -1em);
    }
  }

  &:hover .card {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) scale(1);
    filter: blur(0px);
  }
`;

const LovePage = () => {
  // Fadoua的喜好列表
  const fadouaLikes = [
    "Iced latte", "Dumplings", "Mango", "Vanilla", "Lego", 
    "Pink and black", "Wave to earth", "Loopy bear", "Aquarium date", 
    "Snail soup", "Cray fish", "Dry noodles", "Good fragrance", 
    "Cute skirt", "Night walk", "Pineapple", "Ifrane", 
    "Handmade gifts", "Fairy dress", "Matching things", 
    "Forehead kiss", "Fake fight", "Hugging kiss", 
    "Cuddling in bed", "Whispering sleep", "Sprite", 
    "Pepsi", "Kuromi", "Avocado juice", "Orange"
  ];

  // 图片扩展名映射
  const imageExtensions = [
    "png", "png", "png", "png", "png", 
    "png", "png", "jpg", "png", 
    "png", "png", "jpeg", "png", 
    "png", "png", "png", "jpg", 
    "png", "png", "png", 
    "jpg", "png", "png", 
    "png", "png", "jpg", 
    "jpeg", "jpg", "png", "png"
  ];

  // 喜好描述
  const likeDescriptions = [
    "冰拿铁，完美的提神饮品",
    "美味的饺子，中式美食经典",
    "甜蜜多汁的芒果",
    "香草的甜美气息",
    "创意无限的乐高积木",
    "粉色和黑色的完美搭配",
    "Wave to earth乐队的音乐",
    "可爱的Loopy熊",
    "浪漫的水族馆约会",
    "独特美味的蜗牛汤",
    "鲜美的小龙虾",
    "干拌面的独特美味",
    "令人愉悦的香水",
    "可爱的短裙",
    "安静的夜晚散步",
    "酸甜可口的菠萝",
    "美丽的伊弗兰",
    "充满心意的手工礼物",
    "梦幻的仙女裙",
    "情侣间的配对物品",
    "额头上温柔的吻",
    "有趣的假装争吵",
    "温暖的拥抱和亲吻",
    "床上温馨的依偎",
    "入睡前的悄悄话",
    "清爽的雪碧",
    "经典的百事可乐",
    "可爱的库洛米",
    "健康的牛油果汁",
    "酸甜可口的橙子"
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <LovePattern />
      <Navbar />
      
      <div className="flex-grow p-8 relative z-10 w-full">
        <div className="container-custom max-w-3xl mx-auto">
          <ColorfulText text="Fadoua" />
          
          <div className="space-y-16">
            {/* About Fadoua Section */}
            <div className="text-white">
              <div className="mb-8">
                <FlipCard 
                  frontTitle="About Fadoua"
                  frontContent=""
                  backTitle="Personality & Interests"
                  backContent="INFJ personality type, Cancer zodiac sign. Enjoys watching movies but gets scared after horror films. Likes vanilla scented body lotions and floral shampoos."
                />
              </div>
              <div>
                <div className="flex justify-center mb-6">
                  <Button text="Fadoua's Traits" />
                </div>
                <NotificationCard />
              </div>
            </div>
            
            {/* Things Fadoua Likes Section */}
            <div>
              <div className="flex justify-center mb-6">
                <Button text="Things Fadoua Likes" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {fadouaLikes.map((item, index) => (
                  <StyledLikeItem key={index}>
                    <button className="like-button">
                      {item}
                    </button>
                    <LikeTooltip 
                      title={item}
                      description={likeDescriptions[index]}
                      imagePath={`/images/likes/${
                        ["iced latte", "dumplings", "mango", "vanilla", "lego", 
                        "pink and black", "Wave to earth", "loopy bear", "aquarium date", 
                        "snail soup", "cray fish", "dry noddles", "ood fragrance", 
                        "cute skirt", "night walk", "pineapple", "ifrane", 
                        "handmade gift", "fairy dress", "matching things", 
                        "forehead kiss", "fake fight", "huggging kiss", 
                        "cuddling in bed", "whisoering sleep", "sprite", 
                        "pepsi", "kuromi", "avocado juice", "orange"][index]
                      }.${imageExtensions[index]}`}
                    />
                  </StyledLikeItem>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/" className="inline-block px-6 py-3 bg-white text-pink-700 rounded-lg font-semibold shadow-lg hover:bg-opacity-90 transition-all">
              Back Home
            </Link>
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
        
        .min-h-screen {
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

export default LovePage; 