import React from 'react';
import styled from 'styled-components';

interface StrokesShadowsHalftoneEffectsProps {
  children: React.ReactNode;
  className?: string;
}

const StyledText = styled.div`
  .stroke-shadow {
    color: #fef3c7;
    text-shadow: -2px 0 #111827, 0 -2px #111827, 2px 0 #111827, 0 2px #111827,
      2px 2px #111827, -2px -2px #111827, -2px 2px #111827, 2px -2px #111827;
    font-weight: bold;
    letter-spacing: 5px;
    text-align: center;
  }
`;

const StrokesShadowsHalftoneEffects: React.FC<StrokesShadowsHalftoneEffectsProps> = ({ 
  children,
  className
}) => {
  return (
    <StyledText className={className}>
      <div className="stroke-shadow">
        {children}
      </div>
    </StyledText>
  );
};

export default StrokesShadowsHalftoneEffects; 