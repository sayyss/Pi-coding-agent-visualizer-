export type ToolName = 'read' | 'write' | 'edit' | 'bash' | 'grep' | 'find' | 'ls';

export type ToolExecPhase = 'pending' | 'executing' | 'complete' | 'error';

export interface ToolCall {
  id: string;
  toolName: ToolName;
  arguments: Record<string, unknown>;
  result?: string;
  isError?: boolean;
  execPhase: ToolExecPhase;
  durationMs: number;
}

export interface ToolDefinition {
  name: ToolName;
  description: string;
  icon: string;
  parameterNames: string[];
}
