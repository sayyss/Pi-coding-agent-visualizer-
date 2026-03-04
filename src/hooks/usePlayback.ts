import { useEffect, useRef } from 'react';
import { usePlaybackStore } from '../store/playback-store';
import { totalSteps } from '../data/scenario';

export function usePlayback() {
  const { isPlaying, speed, stepForward, togglePlay, stepBack, cycleSpeed, pause } =
    usePlaybackStore();
  const currentStepIndex = usePlaybackStore((s) => s.currentStepIndex);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance when playing
  useEffect(() => {
    if (isPlaying) {
      const ms = 1500 / speed;
      intervalRef.current = setInterval(() => {
        const idx = usePlaybackStore.getState().currentStepIndex;
        if (idx >= totalSteps - 1) {
          usePlaybackStore.getState().pause();
        } else {
          stepForward();
        }
      }, ms);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, speed, stepForward]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          e.preventDefault();
          pause();
          stepForward();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          pause();
          stepBack();
          break;
        case '+':
        case '=':
          e.preventDefault();
          cycleSpeed();
          break;
        case '-':
          e.preventDefault();
          cycleSpeed();
          break;
        case 'Home':
          e.preventDefault();
          pause();
          usePlaybackStore.getState().seekTo(0);
          break;
        case 'End':
          e.preventDefault();
          pause();
          usePlaybackStore.getState().seekTo(totalSteps - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [togglePlay, stepForward, stepBack, cycleSpeed, pause]);

  return { isPlaying, speed, currentStepIndex };
}
