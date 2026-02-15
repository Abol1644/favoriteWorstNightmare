import React from 'react';
import { Track } from '../types';
import './TrackList.css';

interface Props {
  tracks: Track[];
  currentTrackId: number;
  onTrackSelect: (index: number) => void;
}

const TrackList: React.FC<Props> = ({ tracks, currentTrackId, onTrackSelect }) => {
  return (
    <div className="track-list">
      <h3 className="track-list__header">Tracks</h3>
      <ul className="track-list__items">
        {tracks.map((track, index) => (
          <li
            key={track.id}
            className={`track-list__item ${track.id === currentTrackId ? 'track-list__item--active' : ''}`}
            onClick={() => onTrackSelect(index)}
          >
            <span className="track-list__title">{track.title}</span>
            <span className="track-list__duration">{track.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackList;