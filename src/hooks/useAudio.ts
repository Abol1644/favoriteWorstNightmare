import { useRef, useState, useEffect, useCallback } from 'react';
import { Track } from '../types';

export const useAudio = (tracks: Track[], initialIndex: number) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isFading, setIsFading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  const currentTrack = tracks[currentTrackIndex];

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio(currentTrack.file);
    audioRef.current.volume = volume;
    audioRef.current.preload = 'metadata';

    const audio = audioRef.current;

    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => nextTrack();

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [currentTrack]);

  // Play/Pause
  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Fade in new track on change
  const fadeIn = useCallback((targetVolume: number, durationMs = 200) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    setIsFading(true);
    const startVolume = 0;
    const step = 0.01;
    const increment = (targetVolume - startVolume) / (durationMs / 10);
    let currentVol = startVolume;
    audioRef.current.volume = currentVol;

    fadeIntervalRef.current = setInterval(() => {
      currentVol += increment;
      if (currentVol >= targetVolume) {
        if (audioRef.current) audioRef.current.volume = targetVolume;
        setIsFading(false);
        clearInterval(fadeIntervalRef.current!);
        fadeIntervalRef.current = null;
      } else {
        if (audioRef.current) audioRef.current.volume = currentVol;
      }
    }, 10);
  }, []);

  const changeTrack = useCallback(
    (newIndex: number) => {
      if (newIndex < 0 || newIndex >= tracks.length) return;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = tracks[newIndex].file;
        audioRef.current.load();
        if (isPlaying) {
          audioRef.current.play().then(() => {
            fadeIn(volume);
          });
        }
      }
      setCurrentTrackIndex(newIndex);
      setCurrentTime(0);
    },
    [tracks, isPlaying, volume, fadeIn]
  );

  const nextTrack = useCallback(() => {
    changeTrack((currentTrackIndex + 1) % tracks.length);
  }, [currentTrackIndex, tracks.length, changeTrack]);

  const prevTrack = useCallback(() => {
    changeTrack((currentTrackIndex - 1 + tracks.length) % tracks.length);
  }, [currentTrackIndex, tracks.length, changeTrack]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const changeVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current && !isFading) {
      audioRef.current.volume = newVolume;
    }
  }, [isFading]);

  // Update volume when slider changes (if not fading)
  useEffect(() => {
    if (audioRef.current && !isFading) {
      audioRef.current.volume = volume;
    }
  }, [volume, isFading]);

  return {
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
  };
};