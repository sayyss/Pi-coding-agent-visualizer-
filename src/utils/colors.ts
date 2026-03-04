import type { MessageRole } from '../types';

export const roleColors: Record<MessageRole | 'system', string> = {
  user: '#60a5fa',
  assistant: '#4ade80',
  tool_result: '#fbbf24',
  compaction_summary: '#c084fc',
  system: '#94a3b8',
};

export const roleBgColors: Record<MessageRole | 'system', string> = {
  user: 'rgba(96, 165, 250, 0.1)',
  assistant: 'rgba(74, 222, 128, 0.1)',
  tool_result: 'rgba(251, 191, 36, 0.1)',
  compaction_summary: 'rgba(192, 132, 252, 0.1)',
  system: 'rgba(148, 163, 184, 0.1)',
};

export const roleBorderColors: Record<MessageRole | 'system', string> = {
  user: 'border-l-blue-400',
  assistant: 'border-l-green-400',
  tool_result: 'border-l-amber-400',
  compaction_summary: 'border-l-purple-400',
  system: 'border-l-slate-400',
};

export const phaseColors: Record<string, string> = {
  startup: '#94a3b8',
  first_turn: '#60a5fa',
  second_turn: '#4ade80',
  summary_turn: '#4ade80',
  context_fills: '#fbbf24',
  compaction: '#c084fc',
  post_compaction: '#f472b6',
};
