import React, { useState } from 'react';
import styled from 'styled-components';

const MemoryCard = () => {
  // Using the complete list of 60 screenshot files
  const screenshotImages = [
    "FBI5$)VWB$0N_6%8X0$B{NW_tmb.jpg",
    "UC3`L56VYGRZ63P63BP`~JQ_tmb.jpg",
    "0X_44`YSU]7)J_2@W8~9~2A_tmb.jpg",
    "`8S])FR@1LAVD02E[9)]QZ6_tmb.jpg",
    "$FMZ4MVP(R[RTA{7H69%T3R_tmb.jpg",
    "H79%WCZ}5S0LDNUL}B}VKQR_tmb.jpg",
    "I5)4797F(VIT}IBMQS{KC$T_tmb.jpg",
    "PTA]08OPJOF}$FBO~]9YZPW_tmb.jpg",
    "[BR[8PZRC9]{NJDO$6RPC8P_tmb.jpg",
    "0Y%D[HQ20JCVBA5)~V(PY`Y_tmb.jpg",
    "76N)M2W5]@Z0{XQ_}E2V`L2_tmb.jpg",
    "TL2KR6$KBVDZ743MM7WQST5_tmb.jpg",
    "ZZW4SUTLZWYZ11YPH{17OCK_tmb.jpg",
    "R{CVMA2KGJER)U7)28I5C]L_tmb.jpg",
    "[WUJN1]WJ59`C~H4V6GKLCF_tmb.jpg",
    "K64R7S4ZW(Y{8Z@_N@3D}RY_tmb.jpg",
    "ISY0BW3]YN00`[0P`SQGUKY_tmb.jpg",
    "O$FN%91S0~4WP55GGK68_W4_tmb.jpg",
    "U9T(0(O~V4G9SY95V~%)%HU_tmb.jpg",
    "5UBOJY)F%B(SK(H_B041ABH_tmb.jpg",
    "RB%A2_XFP}QIL4C{C{5YH%O_tmb.jpg",
    "}I42B20MRF]GH[{}BREVS9H_tmb.jpg",
    "${C2OP}U0QCG4(2CWMJJOPO_tmb.jpg",
    "M8KB0PZ]6QJA6E3LNYHQ3IG_tmb.jpg",
    "SK6ZZ3H$D]0S5_J{CW80BOU_tmb.jpg",
    "J$N7U~D_HCA~YO7VJ{POY7E_tmb.jpg",
    "T[S~AS3T5~YA}L%Y5TG[V84_tmb.jpg",
    "A~A_OFINM4$NCF44~SCD]D2_tmb.jpg",
    "CX_R}AWQW3H)PL{UN9Q5[5Q_tmb.jpg",
    "{$6RSBKJXGHT]DE{9)9WPLA_tmb.jpg",
    "~GC]DZBF15OMT54]DAO]K4C_tmb.jpg",
    "F5KJ6[06WO8FN0273L`21W4_tmb.jpg",
    "_EYPLJ]$B6ET_7~%`1A5(MG_tmb.jpg",
    "FSW7Q[@L}H2L0IYMC[SS{$E_tmb.jpg",
    "DQMBD59P5EGW9$$O6UCZ@%V_tmb.jpg",
    "I~ZKHN)$]`]M}BD{NW72QQ8_tmb.jpg",
    "{$U9@5]MX7S%TQTZ59E2M~8_tmb.jpg",
    "1~AHDZJAZD)@M5){DTO@1AF_tmb.jpg",
    "85{]GFX5I8L4ROFO~S~TE3Y_tmb.jpg",
    "CIKLFZ_L}XVGM}HYVCJMC5Y_tmb.jpg",
    "M%D9`K0L[H7[(ZQ%H6FR188_tmb.jpg",
    "$4GIO]10P88PS6P2%E[}OKB_tmb.jpg",
    "85X{`6H9X]4]8SWFLTTLRMI_tmb.jpg",
    "C%RM~HV$ETN(WR{QI}]]A1B_tmb.jpg",
    "JS%23OL9PQ6_R(H~Q]6{SHV_tmb.jpg",
    "(XTP2@LF4FWTG}L(18G[M8Q_tmb.jpg",
    "6Y{26$PG$QJUH{KB2$W3A$1_tmb.jpg",
    "X)BOO1%ZPBJT0M7YX%_4`YG_tmb.jpg",
    ")Q06V19MLCD3EJ3K_DEE396_tmb.jpg",
    "ST2P}S1DM1N%$9[OQUS1SDI_tmb.jpg",
    "B)P`E@7BOM2[0(3@T3](3I3_tmb.jpg",
    "K%PCB__]Y4V%BWPFFI$8G5G_tmb.jpg",
    "FA6)2UD9N)LXC92RYB~TJHW_tmb.jpg",
    "J@4C(SVRC]DODD[6NTIV9XG_tmb.jpg",
    "X7C5T%ZVU65E12QI`TMOOAW_tmb.jpg",
    "YE(%D9B``U896F1PLO]OJ6C_tmb.jpg",
    "H@ZW3R5KIF)U~3JV8DB$G0O_tmb.jpg",
    "ULH9MRYATD4WB[2{WL{3{E6_tmb.jpg",
    "S733$ZTN`5$O23}O]EA%{GK_tmb.jpg",
    "ZXEO9Q{[PAR971{RKC1]U)3_tmb.jpg"
  ];

  // State: current displayed image set
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 10; // Images per page
  const totalPages = Math.ceil(screenshotImages.length / imagesPerPage);
  
  // Current page images
  const displayImages = screenshotImages.slice(
    currentPage * imagesPerPage, 
    (currentPage + 1) * imagesPerPage
  );
  
  // Define color array
  const cardColors = [
    '142, 249, 252',
    '142, 252, 204',
    '142, 252, 157',
    '215, 252, 142',
    '252, 252, 142',
    '252, 208, 142',
    '252, 142, 142',
    '252, 142, 239',
    '204, 142, 252',
    '142, 202, 252'
  ];
  
  // State: pause animation
  const [isPaused, setIsPaused] = useState(false);
  
  // State: track how many cards are being hovered
  const [hoveredCardsCount, setHoveredCardsCount] = useState(0);
  
  // Handle card mouse enter
  const handleCardMouseEnter = () => {
    setHoveredCardsCount(prev => prev + 1);
    setIsPaused(true);
  };
  
  // Handle card mouse leave
  const handleCardMouseLeave = () => {
    setHoveredCardsCount(prev => Math.max(0, prev - 1));
    // Only unpause if no cards are being hovered
    if (hoveredCardsCount <= 1) {
      setIsPaused(false);
    }
  };
  
  // Next page
  const handleNextPage = () => {
    setCurrentPage(prev => (prev + 1) % totalPages);
  };
  
  // Previous page
  const handlePrevPage = () => {
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
  };
  
  // Jump to specific page
  const handleJumpToPage = (pageNumber: number) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <StyledWrapper isPaused={isPaused}>
      <div className="wrapper">
        <div className="paging-info">
          <span>Group {currentPage + 1} / {totalPages}</span>
          <span>Showing {currentPage * imagesPerPage + 1} - {Math.min((currentPage + 1) * imagesPerPage, screenshotImages.length)} of {screenshotImages.length} screenshots</span>
        </div>
        
        <div 
          className={`inner ${isPaused ? 'paused' : ''}`} 
          style={{
            "--quantity": displayImages.length
          } as React.CSSProperties}
        >
          {displayImages.map((image, index) => (
            <div 
              key={index} 
              className="card" 
              style={{
                "--index": index,
                "--color-card": cardColors[index % cardColors.length]
              } as React.CSSProperties}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
            >
              <div 
                className="img" 
                style={{
                  backgroundImage: `url('/images/screenshot/${encodeURIComponent(image)}')`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat', 
                  backgroundColor: 'rgba(0,0,0,0.2)'
                }}
              />
              <div className="card-number">{index + 1 + (currentPage * imagesPerPage)}</div>
            </div>
          ))}
        </div>
        
        <div className="controls">
          <button className="control-button page-button" onClick={handlePrevPage}>
            ← Previous
          </button>
          <div className="page-jump">
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i} 
                className={`page-number ${currentPage === i ? 'active' : ''}`}
                onClick={() => handleJumpToPage(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button className="control-button page-button" onClick={handleNextPage}>
            Next →
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
}

interface StyledWrapperProps {
  isPaused: boolean;
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  .wrapper {
    width: 100%;
    height: 600px;
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin: 3rem 0;
  }

  .inner {
    --w: 300px;
    --h: 220px;
    --translateZ: calc(var(--w) * 1.3);
    --rotateX: -8deg;
    --perspective: 2500px;
    position: absolute;
    width: var(--w);
    height: var(--h);
    top: 30%;
    left: calc(50% - (var(--w) / 2));
    z-index: 2;
    transform-style: preserve-3d;
    transform: perspective(var(--perspective)) rotateX(var(--rotateX));
    animation: rotating 30s linear infinite;
    
    &.paused {
      animation-play-state: paused;
    }
  }
  
  @keyframes rotating {
    from {
      transform: perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(0deg);
    }
    to {
      transform: perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(360deg);
    }
  }
  
  .paging-info {
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    font-size: 0.9rem;
    opacity: 0.8;
    
    span {
      margin: 2px 0;
      background: rgba(0, 0, 0, 0.6);
      padding: 4px 10px;
      border-radius: 15px;
    }
  }
  
  .controls {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .control-button {
    background: rgba(0, 0, 0, 0.6);
    color: white;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(var(--color-card, 142, 249, 252), 0.8);
    }
    
    &.page-button {
      background: rgba(0, 0, 0, 0.8);
      font-weight: bold;
      
      &:hover {
        background: rgba(252, 142, 142, 0.8);
      }
    }
  }

  .page-jump {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 300px;
    gap: 5px;
    margin: 0 10px;
  }
  
  .page-number {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: none;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 0.8rem;
    padding: 0;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(142, 249, 252, 0.6);
      transform: scale(1.1);
    }
    
    &.active {
      background: rgba(142, 249, 252, 0.8);
      font-weight: bold;
      transform: scale(1.2);
    }
  }

  .card {
    position: absolute;
    border: 4px solid rgba(var(--color-card), 0.8);
    border-radius: 15px;
    overflow: hidden;
    inset: 0;
    transform: rotateY(calc((360deg / var(--quantity)) * var(--index)))
      translateZ(var(--translateZ));
    box-shadow: 0 5px 25px rgba(var(--color-card), 0.7);
    transition: transform 0.3s ease;
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  .card:hover {
    transform: rotateY(calc((360deg / var(--quantity)) * var(--index)))
      translateZ(calc(var(--translateZ) + 30px)) scale(1.1);
    z-index: 5;
  }

  .img {
    width: 100%;
    height: 100%;
    transition: all 0.5s ease;
    padding: 10px;
  }
  
  .card-number {
    position: absolute;
    top: 8px;
    left: 8px;
    background: rgba(var(--color-card), 0.8);
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    z-index: 2;
  }

  .card:hover .img {
    background-color: rgba(0, 0, 0, 0);
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .controls {
      flex-direction: column;
    }
    
    .page-jump {
      width: 100%;
      max-width: 280px;
      margin: 10px 0;
    }
  }
`;

export default MemoryCard; 