import { create } from 'zustand';
import { totalSteps } from '../data/scenario';

export type PlaybackSpeed = 0.5 | 1 | 2 | 4;

interface PlaybackState {
  currentStepIndex: number;
  isPlaying: boolean;
  speed: PlaybackSpeed;

  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  stepForward: () => void;
  stepBack: () => void;
  seekTo: (index: number) => void;
  setSpeed: (speed: PlaybackSpeed) => void;
  cycleSpeed: () => void;
}

const speeds: PlaybackSpeed[] = [0.5, 1, 2, 4];

export const usePlaybackStore = create<PlaybackState>((set, get) => ({
  currentStepIndex: 0,
  isPlaying: false,
  speed: 1,

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),

  stepForward: () =>
    set((s) => ({
      currentStepIndex: Math.min(s.currentStepIndex + 1, totalSteps - 1),
    })),

  stepBack: () =>
    set((s) => ({
      currentStepIndex: Math.max(s.currentStepIndex - 1, 0),
    })),

  seekTo: (index: number) =>
    set({ currentStepIndex: Math.max(0, Math.min(index, totalSteps - 1)) }),

  setSpeed: (speed: PlaybackSpeed) => set({ speed }),

  cycleSpeed: () => {
    const current = get().speed;
    const idx = speeds.indexOf(current);
    set({ speed: speeds[(idx + 1) % speeds.length] });
  },
}));
