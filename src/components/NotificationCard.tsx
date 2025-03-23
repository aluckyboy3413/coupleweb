"use client";

import React from 'react';
import styled from 'styled-components';

const NotificationCard: React.FC = () => {
  return (
    <StyledWrapper>
      <ul className="notification-container">
        <li className="notification-item success">
          <div className="notification-content">
            <div className="notification-text">Always replies instantly to messages</div>
          </div>
          <div className="notification-progress-bar" />
        </li>
        <li className="notification-item info">
          <div className="notification-content">
            <div className="notification-text">Likes to be hugged when shy</div>
          </div>
          <div className="notification-progress-bar" />
        </li>
        <li className="notification-item warning">
          <div className="notification-content">
            <div className="notification-text">Doesn't like to be misunderstood</div>
          </div>
          <div className="notification-progress-bar" />
        </li>
        <li className="notification-item error">
          <div className="notification-content">
            <div className="notification-text">Gets upset easily when not feeling well</div>
          </div>
          <div className="notification-progress-bar" />
        </li>
        <li className="notification-item">
          <div className="notification-content">
            <div className="notification-text">Brushes teeth after every meal</div>
          </div>
          <div className="notification-progress-bar" />
        </li>
      </ul>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* Notification container */
  .notification-container {
    --content-color: black;
    --background-color: #f3f3f3;
    --font-size-content: 1rem;
    --icon-size: 1.25em;

    max-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75em;
    list-style-type: none;
    font-family: sans-serif;
    color: var(--content-color);
    padding: 0;
    margin: 0;
  }

  /* Notification Item */
  .notification-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 1em;
    overflow: hidden;
    padding: 1rem 1.25rem;
    border-radius: 0.75rem;
    box-shadow: rgba(111, 111, 111, 0.2) 0px 8px 24px;
    background-color: var(--background-color);
    transition: all 250ms ease;

    /* Background Pattern */
    --grid-color: rgba(225, 225, 225, 0.7);
    background-image: linear-gradient(
        0deg,
        transparent 23%,
        var(--grid-color) 24%,
        var(--grid-color) 25%,
        transparent 26%,
        transparent 73%,
        var(--grid-color) 74%,
        var(--grid-color) 75%,
        transparent 76%,
        transparent
      ),
      linear-gradient(
        90deg,
        transparent 23%,
        var(--grid-color) 24%,
        var(--grid-color) 25%,
        transparent 26%,
        transparent 73%,
        var(--grid-color) 74%,
        var(--grid-color) 75%,
        transparent 76%,
        transparent
      );
    background-size: 55px 55px;
  }

  .notification-item:hover {
    transform: scale(1.01);
  }

  .notification-item:active {
    transform: scale(1.05);
  }

  /* Notification content */
  .notification-content {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
  }

  .notification-text {
    font-size: var(--font-size-content);
    user-select: none;
  }

  /* Success */
  .success {
    color: #047857;
    background-color: #7dffbc;
    --grid-color: rgba(16, 185, 129, 0.25);
  }

  .success:hover {
    background-color: #5bffaa;
  }

  /* Info */
  .info {
    color: #1e3a8a;
    background-color: #7eb8ff;
    --grid-color: rgba(59, 131, 246, 0.25);
  }

  .info:hover {
    background-color: #5ba5ff;
  }

  /* Warning */
  .warning {
    color: #78350f;
    background-color: #ffe57e;
    --grid-color: rgba(245, 159, 11, 0.25);
  }

  .warning:hover {
    background-color: #ffde59;
  }

  /* Error */
  .error {
    color: #7f1d1d;
    background-color: #ff7e7e;
    --grid-color: rgba(239, 68, 68, 0.25);
  }

  .error:hover {
    background-color: #ff5f5f;
  }

  /* Notification progress bar */
  .notification-progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    background: var(--content-color);
    width: 100%;
    transform: translateX(100%);
    animation: progressBar 5s linear forwards infinite;
  }

  /* progressBar Animation */
  @keyframes progressBar {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-100%);
    }
  }
`;

export default NotificationCard; 