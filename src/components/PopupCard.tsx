import React from 'react';
import styled from 'styled-components';

interface PopupCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const PopupCard: React.FC<PopupCardProps> = ({ children, style }) => {
  return (
    <StyledWrapper>
      <div className="popup-content" style={style}>
        {children}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .popup-content {
    background: white;
    padding: 20px;
    border-radius: 15px;
    width: 400px;
    height: 300px;
    position: absolute;
    z-index: 1000;
    animation: popIn 0.3s ease-out;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  @keyframes popIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export default PopupCard; 