export type MessageRole = 'user' | 'assistant' | 'tool_result' | 'compaction_summary';

export interface BaseMessage {
  id: string;
  role: MessageRole;
  turnIndex: number;
  tokens: number;
}

export interface UserMessage extends BaseMessage {
  role: 'user';
  content: string;
}

export interface AssistantMessage extends BaseMessage {
  role: 'assistant';
  content: string;
  toolCallIds?: string[];
  stopReason: 'end_turn' | 'tool_use';
}

export interface ToolResultMessage extends BaseMessage {
  role: 'tool_result';
  toolCallId: string;
  toolName: string;
  content: string;
  isError?: boolean;
}

export interface CompactionSummaryMessage extends BaseMessage {
  role: 'compaction_summary';
  content: string;
  originalMessageCount: number;
  originalTokens: number;
}

export type Message = UserMessage | AssistantMessage | ToolResultMessage | CompactionSummaryMessage;
