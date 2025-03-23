"use client";

import React from 'react';

interface LanguageSwitchProps {
  isEnglish: boolean;
  onToggle: () => void;
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ isEnglish, onToggle }) => {
  return (
    <div className="w-36 aspect-video rounded-xl has-[:checked]:bg-days-blue bg-days-yellow border-4 border-black">
      <div className="flex h-full w-full px-2 items-center gap-x-2">
        <div className="w-6 h-6 flex-shrink-0 rounded-full border-4 border-black" />
        <label htmlFor="language-switch" className="has-[:checked]:scale-x-[-1] w-full h-10 border-4 border-black rounded cursor-pointer">
          <input 
            type="checkbox" 
            id="language-switch" 
            className="hidden" 
            checked={isEnglish}
            onChange={onToggle}
          />
          <div className="w-full h-full bg-days-red relative">
            <div className="w-0 h-0 z-20 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-t-[20px] border-t-black relative">
              <div className="w-0 h-0 absolute border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[15px] border-t-days-red -top-5 -left-[18px]" />
            </div>
            <div className="w-[24px] h-9 z-10 absolute top-[9px] left-0 bg-days-red border-r-2 border-b-4 border-black transform skew-y-[39deg]" />
            <div className="w-[25px] h-9 z-10 absolute top-[9px] left-[24px] bg-[#c44002] border-r-4 border-l-2 border-b-4 border-black transform skew-y-[-39deg]" />
          </div>
        </label>
        <div className="w-6 h-1 flex-shrink-0 bg-black rounded-full" />
      </div>
      <div className="flex justify-between px-3 -mt-2 text-xs font-bold text-black">
        <span>EN</span>
        <span>中文</span>
      </div>
    </div>
  );
}

export default LanguageSwitch; 