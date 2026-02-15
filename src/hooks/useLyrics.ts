import { useState, useEffect } from 'react';

export const useLyrics = (lyricsPath: string) => {
  const [lyrics, setLyrics] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!lyricsPath) return;
    setLoading(true);
    fetch(lyricsPath)
      .then((res) => res.text())
      .then((text) => setLyrics(text))
      .catch(() => setLyrics('Lyrics not available'))
      .finally(() => setLoading(false));
  }, [lyricsPath]);

  return { lyrics, loading };
};