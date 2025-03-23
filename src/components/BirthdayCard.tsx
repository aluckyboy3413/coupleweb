import React from 'react';
import styled from 'styled-components';

interface BirthdayCardProps {
  name: string;
  date: string;
  daysCount: number;
  cardColor: string;
}

const BirthdayCard = ({ name, date, daysCount, cardColor }: BirthdayCardProps) => {
  return (
    <StyledWrapper $cardColor={cardColor}>
      <div className="card">
        <div className="pricing-block-content">
          <div className="card-header">
            <p className="pricing-plan">{name}'s Birthday</p>
            <div className="pricing-note">{date}</div>
          </div>
          
          <div className="card-body">
            <div className="price-value">
              <p className="price-number"><span className="price-integer">{daysCount}</span></p>
              <div id="priceDiscountCent">days to go</div>
            </div>
          </div>
          
          <ul className="check-list" role="list">
            <li className="check-list-item">
              <svg version="1.0" preserveAspectRatio="xMidYMid meet" height="16" viewBox="0 0 30 30.000001" zoomAndPan="magnify" width="16" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <clipPath id="id1">
                    <path clipRule="nonzero" d="M 2.328125 4.222656 L 27.734375 4.222656 L 27.734375 24.542969 L 2.328125 24.542969 Z M 2.328125 4.222656" />
                  </clipPath>
                </defs>
                <g clipPath="url(#id1)">
                  <path fillRule="nonzero" fillOpacity={1} d="M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z M 27.5 7.53125" />
                </g>
              </svg>
              <span>Get ready to celebrate!</span>
            </li>
            <li className="check-list-item">
              <svg version="1.0" preserveAspectRatio="xMidYMid meet" height="16" viewBox="0 0 30 30.000001" zoomAndPan="magnify" width="16" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <clipPath id="id2">
                    <path clipRule="nonzero" d="M 2.328125 4.222656 L 27.734375 4.222656 L 27.734375 24.542969 L 2.328125 24.542969 Z M 2.328125 4.222656" />
                  </clipPath>
                </defs>
                <g clipPath="url(#id2)">
                  <path fillRule="nonzero" fillOpacity={1} d="M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z M 27.5 7.53125" />
                </g>
              </svg>
              <span>Make it special!</span>
            </li>
          </ul>
        </div>
      </div>
    </StyledWrapper>
  );
}

interface StyledWrapperProps {
  $cardColor: string;
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  /*Neo Brutalism横向生日卡片*/
  .card {
    width: 100%;
    height: 160px;
    background: ${props => props.$cardColor || '#00ffa0'};
    padding: 1rem;
    border-radius: 1rem;
    border: 0.5vmin solid #05060f;
    box-shadow: 0.4rem 0.4rem #05060f;
    overflow: hidden;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /*Card content*/
  .pricing-block-content {
    display: flex;
    height: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .card-header {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .card-body {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pricing-plan {
    color: #05060f;
    font-size: 1.3rem;
    line-height: 1.25;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .price-value {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #05060f;
  }
  
  .price-number {
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: 700;
    margin: 0;
  }
  
  .price-integer {
    font-size: 3.5rem;
    font-weight: 900;
  }

  #priceDiscountCent {
    font-size: 1rem;
    font-weight: 500;
    opacity: 0.8;
  }

  .pricing-note {
    opacity: 0.8;
  }

  /*Checklist*/
  .check-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .check-list-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.85rem;
  }
  
  .check-list-item svg {
    fill: #05060f;
  }

  .check-list-item span {
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .card {
      height: auto;
    }
    
    .pricing-block-content {
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .check-list {
      display: none;
    }
  }
`;

export default BirthdayCard; 