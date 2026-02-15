import React, { useState, useRef, MouseEvent } from 'react';
import './VolumeControl.css';

interface Props {
  volume: number;
  onChange: (volume: number) => void;
}

const VolumeControl: React.FC<Props> = ({ volume, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    let newVol = Math.min(1, Math.max(0, x / width));
    onChange(newVol);
  };

  const handleClick = (e: MouseEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    let newVol = Math.min(1, Math.max(0, x / width));
    onChange(newVol);
  };

  React.useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div className="volume-control">
      <svg className="volume-control__icon" viewBox="0 0 24 24" width="20" height="20">
        <path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3z" />
      </svg>
      <div
        className="volume-control__slider"
        ref={sliderRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="volume-control__fill" style={{ width: `${volume * 100}%` }} />
      </div>
    </div>
  );
};

export default VolumeControl;