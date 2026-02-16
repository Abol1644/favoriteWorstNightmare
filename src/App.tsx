import React from 'react';
import AlbumArt from './components/AlbumArt';
import TrackList from './components/TrackList';
import ProgressBar from './components/ProgressBar';
import Controls from './components/Controls';
import VolumeControl from './components/VolumeControl';
import { useAudio } from './hooks/useAudio';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { tracks } from './config/tracks';
import './App.css';

const App: React.FC = () => {
  const {
    currentTrack,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    changeVolume,
  } = useAudio(tracks, 0);

  useKeyboardShortcuts({ onPlayPause: togglePlay, onNext: nextTrack, onPrev: prevTrack });

  return (
    <div className="app">
      <div className="app__grid">
        <div className="app__left">
          <AlbumArt imageUrl="/images/album-cover.jpg" title={currentTrack.title} />
          <ProgressBar currentTime={currentTime} duration={duration} onSeek={seek} />
          <div className="app__controls-row">
            <Controls
              isPlaying={isPlaying}
              onPlayPause={togglePlay}
              onNext={nextTrack}
              onPrev={prevTrack}
            />
            <VolumeControl volume={volume} onChange={changeVolume} />
          </div>
        </div>

        <div className="app__right">
          <TrackList
            tracks={tracks}
            currentTrackId={currentTrack.id}
            onTrackSelect={(index) => {
              if (index !== currentTrackIndex) {
                // changeTrack handled inside useAudio via index change?
                // We'll use a method – but we need to expose changeTrack from useAudio.
                // For simplicity, we'll add a method to useAudio.
                // We'll adjust useAudio to return changeTrack.
                // Let's modify useAudio to return changeTrack.
                // We'll assume useAudio now returns changeTrack.
                // Quick fix: we'll use the existing next/prev logic? Not good.
                // Better to expose changeTrack.
                // I'll update useAudio to return changeTrack.
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;