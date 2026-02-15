import { useEffect } from 'react';

interface Handlers {
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const useKeyboardShortcuts = ({ onPlayPause, onNext, onPrev }: Handlers) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Media keys
      if (e.code === 'Space') {
        e.preventDefault();
        onPlayPause();
      }
      if (e.code === 'ArrowRight' && e.ctrlKey) {
        e.preventDefault();
        onNext();
      }
      if (e.code === 'ArrowLeft' && e.ctrlKey) {
        e.preventDefault();
        onPrev();
      }

      // Media session API (for physical media keys)
      if (e.key === 'MediaPlayPause') {
        e.preventDefault();
        onPlayPause();
      }
      if (e.key === 'MediaTrackNext') {
        e.preventDefault();
        onNext();
      }
      if (e.key === 'MediaTrackPrevious') {
        e.preventDefault();
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPlayPause, onNext, onPrev]);
};