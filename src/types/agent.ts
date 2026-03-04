export type LoopPhase =
  | 'idle'
  | 'input'
  | 'expansion'
  | 'context_prep'
  | 'system_prompt'
  | 'llm_call'
  | 'tool_execution'
  | 'turn_complete'
  | 'compaction_check'
  | 'compaction'
  | 'agent_end';

export type AgentEventType =
  | 'agent:start'
  | 'agent:turn:start'
  | 'agent:message:start'
  | 'agent:message:delta'
  | 'agent:message:complete'
  | 'agent:tool_call:start'
  | 'agent:tool_call:complete'
  | 'agent:turn:complete'
  | 'agent:compaction:start'
  | 'agent:compaction:complete'
  | 'agent:end';

export interface AgentEvent {
  type: AgentEventType;
  label: string;
}

export type Phase =
  | 'startup'
  | 'first_turn'
  | 'second_turn'
  | 'summary_turn'
  | 'context_fills'
  | 'compaction'
  | 'post_compaction';

export interface TimelineStep {
  id: number;
  phase: Phase;
  loopPhase: LoopPhase;
  title: string;
  description: string;
  events: AgentEvent[];
  /** IDs of messages visible at this step */
  visibleMessageIds: string[];
  /** ID of the active tool call, if any */
  activeToolCallId?: string;
  /** Number of system prompt layers visible (0-7) */
  systemPromptLayers: number;
  /** Session entry IDs visible */
  visibleSessionEntryIds: string[];
  /** Context window state at this step */
  contextTokens: number;
  /** Whether compaction is happening */
  isCompacting?: boolean;
  /** Post-compaction token count */
  postCompactionTokens?: number;
}
