import {
  SkipBack,
  ChevronLeft,
  Play,
  Pause,
  ChevronRight,
  SkipForward,
  Gauge,
} from 'lucide-react';
import { usePlaybackStore } from '../../store/playback-store';
import { useCurrentStep } from '../../hooks/useCurrentStep';
import { totalSteps } from '../../data/scenario';
import { Badge } from '../shared/Badge';
import { phaseColors } from '../../utils/colors';

export function PlaybackControls() {
  const { isPlaying, speed, togglePlay, stepForward, stepBack, seekTo, cycleSpeed } =
    usePlaybackStore();
  const { step, stepIndex } = useCurrentStep();

  const phaseColor = phaseColors[step.phase] ?? '#94a3b8';

  return (
    <div className="flex items-center gap-3 border-t border-panel-border bg-panel-bg px-4 py-2.5">
      {/* Transport controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => seekTo(0)}
          className="rounded p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          title="First step (Home)"
        >
          <SkipBack size={14} />
        </button>
        <button
          onClick={stepBack}
          className="rounded p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          title="Previous step (Left)"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={togglePlay}
          className="rounded-full bg-blue-600 p-2 text-white transition hover:bg-blue-500"
          title="Play/Pause (Space)"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <button
          onClick={stepForward}
          className="rounded p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          title="Next step (Right)"
        >
          <ChevronRight size={14} />
        </button>
        <button
          onClick={() => seekTo(totalSteps - 1)}
          className="rounded p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          title="Last step (End)"
        >
          <SkipForward size={14} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="flex-1">
        <input
          type="range"
          min={0}
          max={totalSteps - 1}
          value={stepIndex}
          onChange={(e) => seekTo(Number(e.target.value))}
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-blue-500"
        />
      </div>

      {/* Step info */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span className="font-mono tabular-nums">
          {stepIndex + 1}/{totalSteps}
        </span>
        <Badge color={phaseColor}>{step.phase.replace('_', ' ')}</Badge>
      </div>

      {/* Speed control */}
      <button
        onClick={cycleSpeed}
        className="flex items-center gap-1 rounded px-2 py-1 text-xs text-slate-400 transition hover:bg-slate-800 hover:text-white"
        title="Cycle speed (+/-)"
      >
        <Gauge size={12} />
        <span className="font-mono">{speed}x</span>
      </button>

      {/* Step description */}
      <div className="hidden max-w-xs truncate text-xs text-slate-500 xl:block">
        {step.title}
      </div>
    </div>
  );
}
