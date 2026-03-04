import { useMemo } from 'react';
import { usePlaybackStore } from '../store/playback-store';
import { scenario } from '../data/scenario';
import { messages } from '../data/messages';
import { toolCalls } from '../data/tool-calls';
import { sessionEntries } from '../data/session-entries';
import { systemPromptLayers } from '../data/system-prompt-layers';
import type { TimelineStep, Message, ToolCall, SessionEntry, MessageTokenBlock } from '../types';
import type { SystemPromptLayer } from '../data/system-prompt-layers';

interface CurrentStepState {
  step: TimelineStep;
  stepIndex: number;
  visibleMessages: Message[];
  activeToolCall: ToolCall | null;
  visibleLayers: SystemPromptLayer[];
  visibleSessionEntries: SessionEntry[];
  contextBlocks: MessageTokenBlock[];
  maxTokens: number;
  thresholdTokens: number;
}

export function useCurrentStep(): CurrentStepState {
  const stepIndex = usePlaybackStore((s) => s.currentStepIndex);
  const step = scenario[stepIndex];

  return useMemo(() => {
    const visibleMessages = step.visibleMessageIds
      .map((id) => messages[id])
      .filter(Boolean);

    const activeToolCall = step.activeToolCallId
      ? toolCalls[step.activeToolCallId] ?? null
      : null;

    const visibleLayers = systemPromptLayers.slice(0, step.systemPromptLayers);

    const visibleSessionEntries = step.visibleSessionEntryIds
      .map((id) => sessionEntries.find((e) => e.id === id))
      .filter((e): e is SessionEntry => e != null);

    // Build context blocks
    const contextBlocks: MessageTokenBlock[] = [];

    if (step.systemPromptLayers > 0) {
      const sysTokens = visibleLayers.reduce((s, l) => s + l.tokens, 0);
      contextBlocks.push({
        messageId: 'sys',
        role: 'system',
        tokens: sysTokens,
        label: 'System Prompt',
      });
    }

    for (const msg of visibleMessages) {
      contextBlocks.push({
        messageId: msg.id,
        role: msg.role,
        tokens: msg.tokens,
        label:
          msg.role === 'user'
            ? 'User'
            : msg.role === 'assistant'
              ? 'Assistant'
              : msg.role === 'tool_result'
                ? `Tool: ${(msg as { toolName?: string }).toolName ?? 'result'}`
                : 'Summary',
      });
    }

    return {
      step,
      stepIndex,
      visibleMessages,
      activeToolCall,
      visibleLayers,
      visibleSessionEntries,
      contextBlocks,
      maxTokens: 128000,
      thresholdTokens: 112000,
    };
  }, [step, stepIndex]);
}
