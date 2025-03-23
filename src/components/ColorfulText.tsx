"use client";

import React, { useEffect, useRef } from 'react';

interface ColorfulTextProps {
  text: string;
  className?: string;
}

const ColorfulText: React.FC<ColorfulTextProps> = ({ text, className = '' }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // 设置data-heading属性
    if (headingRef.current) {
      headingRef.current.setAttribute('data-heading', text);
    }
  }, [text]);

  return (
    <>
      <h1 ref={headingRef} className={`colorful-text ${className}`} data-heading={text}>
        {text}
      </h1>

      <style jsx global>{`
        @font-face {
          font-family: 'CoreCircus2DDot1';
          src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/333BF4_1_0.eot');
          src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/333BF4_1_0.eot?#iefix') format('embedded-opentype'), 
               url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/333BF4_1_0.woff2') format('woff2'), 
               url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/333BF4_1_0.woff') format('woff'), 
               url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/333BF4_1_0.ttf') format('truetype');
        }

        @font-face {
          font-family: 'CoreCircus';
          src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/333BF4_8_0.eot');
          src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/333BF4_8_0.eot?#iefix') format('embedded-opentype'), 
               url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/333BF4_8_0.woff2') format('woff2'), 
               url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/333BF4_8_0.woff') format('woff'), 
               url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/333BF4_8_0.ttf') format('truetype');
        }

        .colorful-text {	
          --green: #65f283;
          --blue: #4ad9db;
          --red: #f98ca4;
          --orange: #f5b10b;
          --mustard: #dac249;
          --darkblue: #2f3e9c;
          --darkred: #9e132c;
          --purple: #6e1f58;
          --outline: 2px;
          
          font-family: 'CoreCircus', sans-serif;
          text-transform: uppercase;
          font-size: 4.5rem;
          text-align: center;
          line-height: 1;
          margin: -0.5em 0 0.2em 0;
          position: relative;
          color: var(--red);
          text-shadow: 
              -1px -1px 0 var(--purple), 1px -1px 0 var(--purple), -1px 1px 0 var(--purple), 1px 1px 0 var(--purple), 
              1px 0px 0px var(--green), 0px 1px 0px var(--green), 2px 1px 0px var(--green), 1px 2px 0px var(--green), 3px 2px 0px var(--green), 2px 3px 0px var(--green), 4px 3px 0px var(--green), 3px 4px 0px var(--green), 5px 4px 0px var(--green),
              3px 5px 0px var(--purple), 6px 5px 0px var(--purple), 
              -1px 2px 0 black, 0 3px 0 var(--purple), 1px 4px 0 var(--purple), 2px 5px 0px var(--purple),
              2px -1px 0 var(--purple), 3px 0 0 var(--purple), 4px 1px 0 var(--purple), 5px 2px 0px var(--purple), 6px 3px 0 var(--purple), 7px 4px 0 var(--purple),
            10px 10px 4px var(--mustard);
        }
        
        .colorful-text:after,
        .colorful-text:before {
          content: attr(data-heading);
          position: absolute;
          overflow: hidden;
          left: 0;		
          width: 100%;
          top: 0;
          z-index: 5;
        }
        
        .colorful-text::before {
          text-shadow: 
            -1px -1px 0 var(--darkred), 1px -1px 0 var(--darkred), -1px 1px 0 var(--darkred), 1px 1px 0 var(--darkred), 
            1px 0px 0px var(--orange), 0px 1px 0px var(--orange), 2px 1px 0px var(--orange), 1px 2px 0px var(--orange), 3px 2px 0px var(--orange), 2px 3px 0px var(--orange), 4px 3px 0px var(--orange), 3px 4px 0px var(--orange), 5px 4px 0px var(--orange),
            3px 5px 0px var(--darkred), 6px 5px 0px var(--darkred), 
            -1px 2px 0 black, 0 3px 0 var(--darkred), 1px 4px 0 var(--darkred), 2px 5px 0px var(--darkred),
            2px -1px 0 var(--darkred), 3px 0 0 var(--darkred), 4px 1px 0 var(--darkred), 5px 2px 0px var(--darkred), 6px 3px 0 var(--darkred), 7px 4px 0 var(--darkred),
            10px 10px 4px rgba(106, 241, 119, 0.8);
          color: var(--green);
          height: 66%;
        }
        
        .colorful-text::after {
          height: 33%;
          color: var(--blue);
          text-shadow: 
            -1px -1px 0 var(--darkblue), 1px -1px 0 var(--darkblue), -1px 1px 0 var(--darkblue), 1px 1px 0 var(--darkblue),
            1px 0px 0px var(--red), 0px 1px 0px var(--red), 2px 1px 0px var(--red), 1px 2px 0px var(--red), 3px 2px 0px var(--red), 2px 3px 0px var(--red), 4px 3px 0px var(--red), 3px 4px 0px var(--red), 5px 4px 0px var(--red),
            3px 5px 0px var(--darkblue), 6px 5px 0px var(--darkblue), 
            -1px 2px 0 black, 0 3px 0 var(--darkblue), 1px 4px 0 var(--darkblue), 2px 5px 0px var(--darkblue),
            2px -1px 0 var(--darkblue), 3px 0 0 var(--darkblue), 4px 1px 0 var(--darkblue), 5px 2px 0px var(--darkblue), 6px 3px 0 var(--darkblue), 7px 4px 0 var(--darkblue);
        }

        /* 响应式调整 */
        @media (max-width: 768px) {
          .colorful-text {
            font-size: 3rem;
            margin: -0.3em 0 0.2em 0;
            text-shadow: 
              -1px -1px 0 var(--purple), 1px -1px 0 var(--purple), -1px 1px 0 var(--purple), 1px 1px 0 var(--purple), 
              1px 0px 0px var(--green), 0px 1px 0px var(--green), 1px 1px 0px var(--green), 1px 1px 0px var(--green), 2px 1px 0px var(--green), 1px 2px 0px var(--green), 2px 2px 0px var(--green), 2px 2px 0px var(--green), 3px 2px 0px var(--green),
              2px 3px 0px var(--purple), 3px 3px 0px var(--purple), 
              -1px 1px 0 black, 0 2px 0 var(--purple), 1px 2px 0 var(--purple), 1px 3px 0px var(--purple),
              1px -1px 0 var(--purple), 2px 0 0 var(--purple), 2px 1px 0 var(--purple), 3px 1px 0px var(--purple), 3px 2px 0 var(--purple), 4px 2px 0 var(--purple),
            5px 5px 2px var(--mustard);
          }
        }
      `}</style>
    </>
  );
};

export default ColorfulText; 