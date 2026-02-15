import React from 'react';
import './Controls.css';

interface Props {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Controls: React.FC<Props> = ({ isPlaying, onPlayPause, onNext, onPrev }) => {
  return (
    <div className="controls">
      <button className="controls__btn" onClick={onPrev} aria-label="Previous">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
        </svg>
      </button>
      <button className="controls__btn controls__btn--play" onClick={onPlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
        {isPlaying ? (
          <svg viewBox="0 0 24 24" width="28" height="28">
            <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="28" height="28">
            <path fill="currentColor" d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      <button className="controls__btn" onClick={onNext} aria-label="Next">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
        </svg>
      </button>
    </div>
  );
};

export default Controls;