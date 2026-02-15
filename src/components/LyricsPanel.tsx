import React from 'react';
import { useLyrics } from '../hooks/useLyrics';
import './LyricsPanel.css';

interface Props {
  lyricsPath: string;
}

const LyricsPanel: React.FC<Props> = ({ lyricsPath }) => {
  const { lyrics, loading } = useLyrics(lyricsPath);

  return (
    <div className="lyrics-panel">
      <h3 className="lyrics-panel__header">Lyrics</h3>
      <div className="lyrics-panel__content">
        {loading ? (
          <p className="lyrics-panel__loading">Loading lyrics...</p>
        ) : (
          <pre className="lyrics-panel__text">{lyrics}</pre>
        )}
      </div>
    </div>
  );
};

export default LyricsPanel;