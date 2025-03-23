import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { MusicContext } from '@/app/ClientLayout';

interface MusicPlayerProps {
  songs?: string[];
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ songs = [
  '/song/fall in love alone.mp3',
  '/song/Listening for the Weather-Bic Runga.mp3',
  '/song/cupid.mp3',
  '/song/play date.mp3', 
  '/song/birds of feather.mp3',
  '/song/tek it.mp3'
] }) => {
  // 使用全局上下文替换局部状态
  const { 
    isPlaying, setIsPlaying,
    currentSong, setCurrentSong,
    volume, setVolume
  } = useContext(MusicContext);
  
  // 保留这些局部状态，因为它们不需要跨页面共享
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showVolume, setShowVolume] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // 歌曲标题映射
  const songTitles = {
    '/song/cupid.mp3': { title: 'Cupid', artist: 'FIFTY FIFTY' },
    '/song/play date.mp3': { title: 'Play Date', artist: 'Melanie Martinez' },
    '/song/birds of feather.mp3': { title: 'Birds of a Feather', artist: 'Billie Eilish' },
    '/song/tek it.mp3': { title: 'Tek It', artist: 'Cafuné' },
    '/song/fall in love alone.mp3': { title: 'Fall In Love Alone', artist: 'Tate McRae' },
    '/song/Listening for the Weather-Bic Runga.mp3': { title: 'Listening for the Weather', artist: 'Bic Runga' }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 设置音频元素事件监听器
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);
    
    // 歌曲结束后自动下一首
    const handleEnded = () => {
      nextSong();
    };

    // 添加事件监听器
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleEnded);

    // 设置初始音量
    audio.volume = volume;
    
    // 如果已设置为播放，则播放音频
    if (isPlaying) audio.play();

    return () => {
      // 移除事件监听器
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong, isPlaying]);

  // 播放/暂停切换
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 上一首歌
  const prevSong = () => {
    setCurrentSong(currentSong === 0 ? songs.length - 1 : currentSong - 1);
    setIsPlaying(true);
  };

  // 下一首歌
  const nextSong = () => {
    setCurrentSong(currentSong === songs.length - 1 ? 0 : currentSong + 1);
    setIsPlaying(true);
  };

  // 设置音量
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  // 格式化时间显示 (秒 -> mm:ss)
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // 获取当前歌曲信息
  const getCurrentSongInfo = () => {
    const currentSongPath = songs[currentSong];
    return songTitles[currentSongPath as keyof typeof songTitles] || { title: "Unknown Song", artist: "Unknown Artist" };
  };

  const songInfo = getCurrentSongInfo();
  const progressPercentage = (currentTime / duration) * 100 || 0;

  return (
    <StyledWrapper>
      <div className="card">
        <audio 
          ref={audioRef} 
          src={songs[currentSong]} 
          onLoadStart={() => setIsPlaying(true)}
        />
        <div className="top">
          <div className="pfp">
            <div className={`playing ${isPlaying ? 'is-playing' : ''}`}>
              <div className="redline line-1" />
              <div className="redline line-2" />
              <div className="redline line-3" />
              <div className="redline line-4" />
              <div className="redline line-5" />
            </div>
          </div>
          <div className="texts">
            <p className="title-1">{songInfo.title}</p>
            <p className="title-2">{songInfo.artist}</p>
          </div>
        </div>
        <div className="controls">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={20} width={24} className="volume_button" onMouseEnter={() => setShowVolume(true)} onMouseLeave={() => setShowVolume(false)}>
            <path clipRule="evenodd" d="M11.26 3.691A1.2 1.2 0 0 1 12 4.8v14.4a1.199 1.199 0 0 1-2.048.848L5.503 15.6H2.4a1.2 1.2 0 0 1-1.2-1.2V9.6a1.2 1.2 0 0 1 1.2-1.2h3.103l4.449-4.448a1.2 1.2 0 0 1 1.308-.26Zm6.328-.176a1.2 1.2 0 0 1 1.697 0A11.967 11.967 0 0 1 22.8 12a11.966 11.966 0 0 1-3.515 8.485 1.2 1.2 0 0 1-1.697-1.697A9.563 9.563 0 0 0 20.4 12a9.565 9.565 0 0 0-2.812-6.788 1.2 1.2 0 0 1 0-1.697Zm-3.394 3.393a1.2 1.2 0 0 1 1.698 0A7.178 7.178 0 0 1 18 12a7.18 7.18 0 0 1-2.108 5.092 1.2 1.2 0 1 1-1.698-1.698A4.782 4.782 0 0 0 15.6 12a4.78 4.78 0 0 0-1.406-3.394 1.2 1.2 0 0 1 0-1.698Z" fillRule="evenodd" />
          </svg>
          <div className={`volume ${showVolume ? 'visible' : ''}`}>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume} 
              onChange={handleVolumeChange}
              className="volume-slider"
            />
            <div className="slider">
              <div className="red" style={{ width: `${volume * 100}%` }} />
            </div>
            <div className="circle" style={{ right: `${100 - (volume * 100)}%` }} />
          </div>
          <svg onClick={prevSong} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={24} width={24}>
            <path clipRule="evenodd" d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Zm.848-12.352a1.2 1.2 0 0 0-1.696-1.696l-3.6 3.6a1.2 1.2 0 0 0 0 1.696l3.6 3.6a1.2 1.2 0 0 0 1.696-1.696L11.297 13.2H15.6a1.2 1.2 0 1 0 0-2.4h-4.303l1.551-1.552Z" fillRule="evenodd" />
          </svg>
          <svg onClick={togglePlay} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={24} width={24}>
            {isPlaying ? (
              <path clipRule="evenodd" d="M21.6 12a9.6 9.6 0 1 1-19.2 0 9.6 9.6 0 0 1 19.2 0ZM8.4 9.6a1.2 1.2 0 1 1 2.4 0v4.8a1.2 1.2 0 1 1-2.4 0V9.6Zm6-1.2a1.2 1.2 0 0 0-1.2 1.2v4.8a1.2 1.2 0 1 0 2.4 0V9.6a1.2 1.2 0 0 0-1.2-1.2Z" fillRule="evenodd" />
            ) : (
              <path clipRule="evenodd" d="M21.6 12a9.6 9.6 0 1 1-19.2 0 9.6 9.6 0 0 1 19.2 0ZM12.6 8.4a1.2 1.2 0 0 1 1.2 1.2v4.8a1.2 1.2 0 1 1-2.4 0V9.6a1.2 1.2 0 0 1 1.2-1.2Zm-2.4 1.2a1.2 1.2 0 1 0-2.4 0v4.8a1.2 1.2 0 1 0 2.4 0V9.6Z" fillRule="evenodd" />
            )}
          </svg>
          <svg onClick={nextSong} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={24} width={24}>
            <path clipRule="evenodd" d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Zm4.448-10.448-3.6-3.6a1.2 1.2 0 0 0-1.696 1.696l1.551 1.552H8.4a1.2 1.2 0 1 0 0 2.4h4.303l-1.551 1.552a1.2 1.2 0 1 0 1.696 1.696l3.6-3.6a1.2 1.2 0 0 0 0-1.696Z" fillRule="evenodd" />
          </svg>
          <div className="air" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" fill="none" height={20} width={24}>
            <path d="M3.343 7.778a4.5 4.5 0 0 1 7.339-1.46L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 20.364l-7.682-7.682a4.501 4.501 0 0 1-.975-4.904Z" />
          </svg>
        </div>
        <div className="time">
          <div className="elapsed" style={{ width: `${progressPercentage}%` }} />
        </div>
        <p className="timetext time_now">{formatTime(currentTime)}</p>
        <p className="timetext time_full">{formatTime(duration)}</p>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* 音乐播放器 */
  position: fixed;
  top: 10px; /* 进一步向上移动 */
  right: 10px; /* 进一步向右移动，更靠近右上角边缘 */
  z-index: 50;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  
  .card {
    position: relative;
    width: 250px;
    height: 120px;
    background: #FFC0CB; /* 将颜色从#FF4D4D改为粉色 */
    border-radius: 10px;
    padding: 10px;
  }

  .top {
    position: relative;
    width: 100%;
    display: flex;
    gap: 10px;
  }

  .pfp {
    position: relative;
    top: 5px;
    left: 5px;
    height: 40px;
    width: 40px;
    background-color: white; /* 改为白色 */
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title-1 {
    color: white;
    font-size: 22px;
    font-weight: bolder;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 170px;
  }

  .title-2 {
    color: white;
    font-size: 12px;
    font-weight: bold;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 170px;
  }

  .time {
    width: 90%;
    background-color: rgba(255,255,255,0.3); /* 改为半透明白色 */
    height: 6px;
    border-radius: 3px;
    position: absolute;
    left: 5%;
    bottom: 22px;
    cursor: pointer;
  }

  .elapsed {
    width: 42%;
    background-color: white; /* 改为白色 */
    height: 100%;
    border-radius: 3px;
  }

  .controls {
    color: white;
    display: flex;
    position: absolute;
    bottom: 30px;
    left: 0;
    width: 100%;
    justify-content: center;
  }

  .volume {
    height: 100%;
    width: 48px;
    opacity: 0;
    transition: 0.2s;
    position: relative;
  }

  .volume.visible {
    opacity: 1;
  }

  .volume-slider {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 2;
    height: 20px;
  }

  .air {
    height: 100%;
    width: 48px;
  }

  .controls svg {
    cursor: pointer;
    transition: 0.1s;
  }

  .controls svg:hover {
    color: black; /* 悬停改为黑色 */
    transform: scale(1.1);
  }

  .volume .slider {
    height: 4px;
    background-color: rgba(255,255,255,0.3); /* 改为半透明白色 */
    width: 80%;
    border-radius: 2px;
    margin-top: 8px;
    margin-left: 10%;
  }

  .volume .slider .red {
    background-color: white; /* 改为白色 */
    height: 100%;
    width: 80%;
    border-radius: 3px;
  }

  .volume .circle {
    background-color: white;
    height: 6px;
    width: 6px;
    border-radius: 3px;
    position: absolute;
    right: 20%;
    top: 60%;
  }

  .volume_button:hover ~ .volume {
    opacity: 1;
  }

  .timetext {
    color: white;
    font-size: 8px;
    position: absolute;
  }

  .time_now {
    bottom: 11px;
    left: 10px;
  }

  .time_full {
    bottom: 11px;
    right: 10px;
  }

  .playing {
    display: flex;
    position: relative;
    justify-content: center;
    gap: 1px;
    width: 30px;
    height: 20px;
  }

  .redline {
    background-color: #FFC0CB; /* 将颜色从#FF4D4D改为粉色 */
    height: 20px;
    width: 2px;
    position: relative;
    transform-origin: bottom;
  }

  .is-playing .line-1 {
    animation: infinite playing 1s ease-in-out;
    animation-delay: 0.2s;
  }

  .is-playing .line-2 {
    animation: infinite playing 1s ease-in-out;
    animation-delay: 0.5s;
  }

  .is-playing .line-3 {
    animation: infinite playing 1s ease-in-out;
    animation-delay: 0.6s;
  }

  .is-playing .line-4 {
    animation: infinite playing 1s ease-in-out;
    animation-delay: 0s;
  }

  .is-playing .line-5 {
    animation: infinite playing 1s ease-in-out;
    animation-delay: 0.4s;
  }

  @keyframes playing {
    0% {
      transform: scaleY(0.1);
    }

    33% {
      transform: scaleY(0.6);
    }

    66% {
      transform: scaleY(0.9);
    }

    100% {
      transform: scaleY(0.1);
    }
  }
`;

export default MusicPlayer; 