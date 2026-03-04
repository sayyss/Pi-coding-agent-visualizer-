import type { MessageTokenBlock } from '../types';

export const preCompactionBlocks: MessageTokenBlock[] = [
  { messageId: 'sys', role: 'system', tokens: 10450, label: 'System Prompt' },
  { messageId: 'msg-user-1', role: 'user', tokens: 120, label: 'User: formatDate request' },
  { messageId: 'msg-asst-1a', role: 'assistant', tokens: 280, label: 'Asst: Read file' },
  { messageId: 'msg-tool-1a', role: 'tool_result', tokens: 350, label: 'Tool: read result' },
  { messageId: 'msg-asst-2a', role: 'assistant', tokens: 420, label: 'Asst: Edit file' },
  { messageId: 'msg-tool-2a', role: 'tool_result', tokens: 80, label: 'Tool: edit result' },
  { messageId: 'msg-asst-3', role: 'assistant', tokens: 450, label: 'Asst: Summary' },
  { messageId: 'msg-user-4', role: 'user', tokens: 80, label: 'User: Write tests' },
  { messageId: 'msg-asst-4a', role: 'assistant', tokens: 600, label: 'Asst: Create tests' },
  { messageId: 'msg-tool-4a', role: 'tool_result', tokens: 80, label: 'Tool: write result' },
  { messageId: 'msg-asst-5a', role: 'assistant', tokens: 180, label: 'Asst: Run tests' },
  { messageId: 'msg-tool-5a', role: 'tool_result', tokens: 250, label: 'Tool: bash result' },
  { messageId: 'msg-asst-5b', role: 'assistant', tokens: 200, label: 'Asst: Tests pass' },
  { messageId: 'msg-user-6', role: 'user', tokens: 60, label: 'User: Update Header' },
  { messageId: 'msg-asst-6a', role: 'assistant', tokens: 200, label: 'Asst: Search' },
  { messageId: 'msg-tool-6a', role: 'tool_result', tokens: 120, label: 'Tool: grep result' },
  { messageId: 'msg-asst-7a', role: 'assistant', tokens: 180, label: 'Asst: Find components' },
  { messageId: 'msg-tool-7a', role: 'tool_result', tokens: 150, label: 'Tool: find result' },
  { messageId: 'msg-asst-7b', role: 'assistant', tokens: 160, label: 'Asst: Read Header' },
  { messageId: 'msg-tool-7b', role: 'tool_result', tokens: 280, label: 'Tool: read result' },
  { messageId: 'msg-asst-7c', role: 'assistant', tokens: 320, label: 'Asst: Edit Header' },
  { messageId: 'msg-tool-7c', role: 'tool_result', tokens: 80, label: 'Tool: edit result' },
  { messageId: 'msg-asst-8a', role: 'assistant', tokens: 140, label: 'Asst: Check structure' },
  { messageId: 'msg-tool-8a', role: 'tool_result', tokens: 200, label: 'Tool: ls result' },
  { messageId: 'msg-asst-8b', role: 'assistant', tokens: 120, label: 'Asst: Run lint' },
  { messageId: 'msg-tool-8b', role: 'tool_result', tokens: 150, label: 'Tool: bash result' },
  { messageId: 'msg-asst-8c', role: 'assistant', tokens: 350, label: 'Asst: All done' },
  // Padding to simulate context filling to ~110K
  { messageId: 'pad-1', role: 'user', tokens: 15000, label: 'User: Large request (padded)' },
  { messageId: 'pad-2', role: 'assistant', tokens: 25000, label: 'Asst: Long response (padded)' },
  { messageId: 'pad-3', role: 'tool_result', tokens: 20000, label: 'Tool: Large file read (padded)' },
  { messageId: 'pad-4', role: 'assistant', tokens: 18000, label: 'Asst: Analysis (padded)' },
  { messageId: 'pad-5', role: 'tool_result', tokens: 16000, label: 'Tool: Search results (padded)' },
];

export const postCompactionBlocks: MessageTokenBlock[] = [
  { messageId: 'sys', role: 'system', tokens: 10450, label: 'System Prompt' },
  { messageId: 'msg-compaction', role: 'compaction_summary', tokens: 800, label: 'Compaction Summary' },
  { messageId: 'msg-user-post', role: 'user', tokens: 80, label: 'User: Add formatTime' },
  { messageId: 'msg-asst-post', role: 'assistant', tokens: 300, label: 'Asst: Will add formatTime' },
];

export const preCompactionTotal = preCompactionBlocks.reduce((s, b) => s + b.tokens, 0);
export const postCompactionTotal = postCompactionBlocks.reduce((s, b) => s + b.tokens, 0);
