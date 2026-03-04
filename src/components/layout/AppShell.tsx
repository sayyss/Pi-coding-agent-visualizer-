import { PlaybackControls } from './PlaybackControls';
import { AgentLoopPanel } from '../panels/AgentLoopPanel';
import { MessageTimelinePanel } from '../panels/MessageTimelinePanel';
import { SystemPromptPanel } from '../panels/SystemPromptPanel';
import { ContextWindowPanel } from '../panels/ContextWindowPanel';
import { ToolCallPanel } from '../panels/ToolCallPanel';
import { SessionTreePanel } from '../panels/SessionTreePanel';
import { Cpu } from 'lucide-react';

export function AppShell() {
  return (
    <div className="flex h-screen flex-col bg-surface">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-panel-border bg-panel-bg px-4 py-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600">
          <Cpu size={14} className="text-white" />
        </div>
        <h1 className="text-sm font-semibold text-white">Pi Agent Harness Visualizer</h1>
        <span className="text-xs text-slate-500">Interactive Architecture Walkthrough</span>
      </header>

      {/* Main grid */}
      <div className="grid flex-1 grid-cols-[280px_1fr_320px] grid-rows-[1fr_1fr_auto] gap-2 overflow-hidden p-2">
        {/* Left column */}
        <div className="row-span-1">
          <AgentLoopPanel />
        </div>
        <div className="row-span-1">
          <ToolCallPanel />
        </div>

        {/* Center column */}
        <div className="row-span-2">
          <MessageTimelinePanel />
        </div>

        {/* Right column */}
        <div className="row-span-1">
          <SystemPromptPanel />
        </div>
        <div className="row-span-1">
          <SessionTreePanel />
        </div>

        {/* Bottom: Context Window spans all columns */}
        <div className="col-span-3">
          <ContextWindowPanel />
        </div>
      </div>

      {/* Playback footer */}
      <PlaybackControls />
    </div>
  );
}
