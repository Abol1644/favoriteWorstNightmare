import React, { useRef, useState, useEffect, MouseEvent } from 'react';
import { formatTime } from '../utils/formatTime';
import './ProgressBar.css';

interface Props {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const ProgressBar: React.FC<Props> = ({ currentTime, duration, onSeek }) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const clickRatio = Math.min(1, Math.max(0, x / width));
    onSeek(clickRatio * duration);
  };

  const handleClick = (e: MouseEvent) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const clickRatio = Math.min(1, Math.max(0, x / width));
    onSeek(clickRatio * duration);
  };

  // Attach global mouse up listener
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="progress-bar-container">
      <span className="progress-bar__time">{formatTime(currentTime)}</span>
      <div
        className="progress-bar"
        ref={progressRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="progress-bar__fill" style={{ width: `${progressPercent}%` }}>
          <div className="progress-bar__handle" />
        </div>
      </div>
      <span className="progress-bar__time">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;