"use client";

import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";

interface AudioContextType {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
}

const AudioCtx = createContext<AudioContextType>({
  isPlaying: false,
  play: () => { },
  pause: () => { },
  toggle: () => { },
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasStartedRef = useRef(false);

  const fadeIn = useCallback((audio: HTMLAudioElement) => {
    let vol = 0;
    const interval = setInterval(() => {
      vol = Math.min(vol + 0.02, 0.5);
      audio.volume = vol;
      if (vol >= 0.5) clearInterval(interval);
    }, 50);
  }, []);

  const tryPlay = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !hasStartedRef.current) {
      audio.play().then(() => {
        hasStartedRef.current = true;
        setIsPlaying(true);
        fadeIn(audio);
      }).catch(() => {
        // Autoplay blocked — will retry on user interaction
      });
    }
  }, [fadeIn]);

  useEffect(() => {
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    // Try to autoplay immediately
    tryPlay();

    // Fallback: play on first user interaction (tap/click/keydown)
    const startOnInteraction = () => {
      if (!hasStartedRef.current) {
        tryPlay();
      }
      // Remove listeners after first successful play
      if (hasStartedRef.current) {
        document.removeEventListener("click", startOnInteraction);
        document.removeEventListener("touchstart", startOnInteraction);
        document.removeEventListener("keydown", startOnInteraction);
      }
    };

    document.addEventListener("click", startOnInteraction);
    document.addEventListener("touchstart", startOnInteraction);
    document.addEventListener("keydown", startOnInteraction);

    return () => {
      audio.pause();
      audio.src = "";
      document.removeEventListener("click", startOnInteraction);
      document.removeEventListener("touchstart", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
    };
  }, [tryPlay]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !isPlaying) {
      audio.play().then(() => {
        setIsPlaying(true);
        fadeIn(audio);
      }).catch(() => { });
    }
  }, [isPlaying, fadeIn]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [isPlaying]);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  return (
    <AudioCtx.Provider value={{ isPlaying, play, pause, toggle }}>
      {children}
    </AudioCtx.Provider>
  );
}

export const useAudio = () => useContext(AudioCtx);
