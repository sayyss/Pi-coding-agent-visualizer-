import type { Message } from '../types';

export const messages: Record<string, Message> = {
  // Turn 1: User asks to read + add formatDate
  'msg-user-1': {
    id: 'msg-user-1',
    role: 'user',
    turnIndex: 1,
    tokens: 120,
    content: 'Read src/utils.ts and add a formatDate helper function that formats dates using Intl.DateTimeFormat.',
  },
  'msg-asst-1a': {
    id: 'msg-asst-1a',
    role: 'assistant',
    turnIndex: 1,
    tokens: 280,
    content: "I'll read the file first to see the current contents.",
    toolCallIds: ['tc-read-utils'],
    stopReason: 'tool_use',
  },
  'msg-tool-1a': {
    id: 'msg-tool-1a',
    role: 'tool_result',
    turnIndex: 1,
    tokens: 350,
    toolCallId: 'tc-read-utils',
    toolName: 'read',
    content: '(file contents of src/utils.ts)',
  },

  // Turn 2: Agent edits the file
  'msg-asst-2a': {
    id: 'msg-asst-2a',
    role: 'assistant',
    turnIndex: 2,
    tokens: 420,
    content: "The file has three utility functions. I'll add the `formatDate` helper after the `truncate` function.",
    toolCallIds: ['tc-edit-utils'],
    stopReason: 'tool_use',
  },
  'msg-tool-2a': {
    id: 'msg-tool-2a',
    role: 'tool_result',
    turnIndex: 2,
    tokens: 80,
    toolCallId: 'tc-edit-utils',
    toolName: 'edit',
    content: 'Successfully edited src/utils.ts',
  },

  // Turn 3: Summary turn (no tools)
  'msg-asst-3': {
    id: 'msg-asst-3',
    role: 'assistant',
    turnIndex: 3,
    tokens: 450,
    content: `Done! I've added the \`formatDate\` helper to \`src/utils.ts\`. It uses \`Intl.DateTimeFormat\` with a configurable locale (defaults to \`en-US\`) and formats dates as "Mar 4, 2026".

The function signature:
\`\`\`typescript
function formatDate(date: Date, locale?: string): string
\`\`\``,
    stopReason: 'end_turn',
  },

  // Turn 4: User asks to write tests
  'msg-user-4': {
    id: 'msg-user-4',
    role: 'user',
    turnIndex: 4,
    tokens: 80,
    content: 'Write a test file for the utils module.',
  },
  'msg-asst-4a': {
    id: 'msg-asst-4a',
    role: 'assistant',
    turnIndex: 4,
    tokens: 600,
    content: "I'll create a test file covering all four utility functions.",
    toolCallIds: ['tc-write-test'],
    stopReason: 'tool_use',
  },
  'msg-tool-4a': {
    id: 'msg-tool-4a',
    role: 'tool_result',
    turnIndex: 4,
    tokens: 80,
    toolCallId: 'tc-write-test',
    toolName: 'write',
    content: 'Successfully wrote src/utils.test.ts',
  },

  // Turn 5: Run tests
  'msg-asst-5a': {
    id: 'msg-asst-5a',
    role: 'assistant',
    turnIndex: 5,
    tokens: 180,
    content: "Let me run the tests to verify they pass.",
    toolCallIds: ['tc-bash-test'],
    stopReason: 'tool_use',
  },
  'msg-tool-5a': {
    id: 'msg-tool-5a',
    role: 'tool_result',
    turnIndex: 5,
    tokens: 250,
    toolCallId: 'tc-bash-test',
    toolName: 'bash',
    content: 'All 4 tests passed.',
  },
  'msg-asst-5b': {
    id: 'msg-asst-5b',
    role: 'assistant',
    turnIndex: 5,
    tokens: 200,
    content: 'All 4 tests pass. The test file covers `capitalize`, `slugify`, `truncate`, and `formatDate`.',
    stopReason: 'end_turn',
  },

  // Turn 6: Context-filling turns - grep
  'msg-user-6': {
    id: 'msg-user-6',
    role: 'user',
    turnIndex: 6,
    tokens: 60,
    content: 'Find all files that import from utils and update the Header component to show the formatted date.',
  },
  'msg-asst-6a': {
    id: 'msg-asst-6a',
    role: 'assistant',
    turnIndex: 6,
    tokens: 200,
    content: "I'll search for formatDate usage and find the components first.",
    toolCallIds: ['tc-grep-imports'],
    stopReason: 'tool_use',
  },
  'msg-tool-6a': {
    id: 'msg-tool-6a',
    role: 'tool_result',
    turnIndex: 6,
    tokens: 120,
    toolCallId: 'tc-grep-imports',
    toolName: 'grep',
    content: 'src/utils.ts:18:export function formatDate',
  },

  // Turn 7: find + read + edit
  'msg-asst-7a': {
    id: 'msg-asst-7a',
    role: 'assistant',
    turnIndex: 7,
    tokens: 180,
    content: "Let me find the component files.",
    toolCallIds: ['tc-find-components'],
    stopReason: 'tool_use',
  },
  'msg-tool-7a': {
    id: 'msg-tool-7a',
    role: 'tool_result',
    turnIndex: 7,
    tokens: 150,
    toolCallId: 'tc-find-components',
    toolName: 'find',
    content: '4 component files found.',
  },
  'msg-asst-7b': {
    id: 'msg-asst-7b',
    role: 'assistant',
    turnIndex: 7,
    tokens: 160,
    content: "I'll read the Header component.",
    toolCallIds: ['tc-read-header'],
    stopReason: 'tool_use',
  },
  'msg-tool-7b': {
    id: 'msg-tool-7b',
    role: 'tool_result',
    turnIndex: 7,
    tokens: 280,
    toolCallId: 'tc-read-header',
    toolName: 'read',
    content: '(Header.tsx contents)',
  },
  'msg-asst-7c': {
    id: 'msg-asst-7c',
    role: 'assistant',
    turnIndex: 7,
    tokens: 320,
    content: "I'll add the date display to the Header.",
    toolCallIds: ['tc-edit-header'],
    stopReason: 'tool_use',
  },
  'msg-tool-7c': {
    id: 'msg-tool-7c',
    role: 'tool_result',
    turnIndex: 7,
    tokens: 80,
    toolCallId: 'tc-edit-header',
    toolName: 'edit',
    content: 'Successfully edited Header.tsx',
  },

  // Turn 8: ls + lint
  'msg-asst-8a': {
    id: 'msg-asst-8a',
    role: 'assistant',
    turnIndex: 8,
    tokens: 140,
    content: "Let me check the project structure and run lint.",
    toolCallIds: ['tc-ls-src'],
    stopReason: 'tool_use',
  },
  'msg-tool-8a': {
    id: 'msg-tool-8a',
    role: 'tool_result',
    turnIndex: 8,
    tokens: 200,
    toolCallId: 'tc-ls-src',
    toolName: 'ls',
    content: '(directory listing)',
  },
  'msg-asst-8b': {
    id: 'msg-asst-8b',
    role: 'assistant',
    turnIndex: 8,
    tokens: 120,
    content: "Running lint to verify no issues.",
    toolCallIds: ['tc-bash-lint'],
    stopReason: 'tool_use',
  },
  'msg-tool-8b': {
    id: 'msg-tool-8b',
    role: 'tool_result',
    turnIndex: 8,
    tokens: 150,
    toolCallId: 'tc-bash-lint',
    toolName: 'bash',
    content: 'No lint issues found.',
  },
  'msg-asst-8c': {
    id: 'msg-asst-8c',
    role: 'assistant',
    turnIndex: 8,
    tokens: 350,
    content: "I've updated the Header component to display the formatted date. The project lints cleanly and all tests pass.",
    stopReason: 'end_turn',
  },

  // Compaction summary
  'msg-compaction': {
    id: 'msg-compaction',
    role: 'compaction_summary',
    turnIndex: 0,
    tokens: 800,
    content: `Conversation summary (turns 1-8):
- User requested adding a formatDate helper to src/utils.ts using Intl.DateTimeFormat
- Read src/utils.ts, added formatDate function after truncate
- Created src/utils.test.ts with tests for all 4 utility functions
- All tests passing
- Searched for formatDate usage, found components, updated Header.tsx to display formatted date
- Project lints cleanly

Files modified: src/utils.ts, src/utils.test.ts, src/components/Header.tsx
Key decisions: Used Intl.DateTimeFormat with en-US default locale`,
    originalMessageCount: 22,
    originalTokens: 105000,
  },

  // Post-compaction messages
  'msg-user-post': {
    id: 'msg-user-post',
    role: 'user',
    turnIndex: 9,
    tokens: 80,
    content: 'Can you also add a formatTime helper next to formatDate?',
  },
  'msg-asst-post': {
    id: 'msg-asst-post',
    role: 'assistant',
    turnIndex: 9,
    tokens: 300,
    content: "Based on the previous work, I'll add a `formatTime` helper right after `formatDate` in `src/utils.ts`. It will also use `Intl.DateTimeFormat` for consistency.",
    stopReason: 'end_turn',
  },
};
