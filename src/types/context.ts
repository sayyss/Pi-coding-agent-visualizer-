export interface MessageTokenBlock {
  messageId: string;
  role: 'system' | 'user' | 'assistant' | 'tool_result' | 'compaction_summary';
  tokens: number;
  label: string;
}

export interface ContextWindowState {
  maxTokens: number;
  reserveTokens: number;
  thresholdTokens: number;
  blocks: MessageTokenBlock[];
  totalTokens: number;
  isCompacting: boolean;
}
