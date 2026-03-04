import type { ToolCall, ToolDefinition } from '../types';

export const toolDefinitions: ToolDefinition[] = [
  { name: 'read', description: 'Read file contents', icon: 'FileText', parameterNames: ['file_path', 'offset', 'limit'] },
  { name: 'write', description: 'Write content to file', icon: 'FilePlus', parameterNames: ['file_path', 'content'] },
  { name: 'edit', description: 'Edit file with text replacement', icon: 'FileEdit', parameterNames: ['file_path', 'old_text', 'new_text'] },
  { name: 'bash', description: 'Execute shell command', icon: 'Terminal', parameterNames: ['command', 'timeout'] },
  { name: 'grep', description: 'Search file contents', icon: 'Search', parameterNames: ['pattern', 'path', 'include'] },
  { name: 'find', description: 'Find files by pattern', icon: 'FolderSearch', parameterNames: ['pattern', 'path', 'type'] },
  { name: 'ls', description: 'List directory contents', icon: 'List', parameterNames: ['path'] },
];

export const toolCalls: Record<string, ToolCall> = {
  'tc-find-utils-file': {
    id: 'tc-find-utils-file',
    toolName: 'find',
    arguments: { pattern: 'utils*', path: 'src/' },
    result: 'src/utils.ts',
    execPhase: 'complete',
    durationMs: 28,
  },
  'tc-read-utils': {
    id: 'tc-read-utils',
    toolName: 'read',
    arguments: { file_path: 'src/utils.ts' },
    result: `import { clamp } from './math';

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + '...';
}`,
    execPhase: 'complete',
    durationMs: 45,
  },
  'tc-edit-utils': {
    id: 'tc-edit-utils',
    toolName: 'edit',
    arguments: {
      file_path: 'src/utils.ts',
      old_text: `export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + '...';
}`,
      new_text: `export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + '...';
}

export function formatDate(date: Date, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}`,
    },
    result: 'Successfully edited src/utils.ts',
    execPhase: 'complete',
    durationMs: 32,
  },
  'tc-grep-imports': {
    id: 'tc-grep-imports',
    toolName: 'grep',
    arguments: { pattern: 'formatDate', path: 'src/', include: '*.ts' },
    result: `src/utils.ts:18:export function formatDate(date: Date, locale = 'en-US'): string {`,
    execPhase: 'complete',
    durationMs: 120,
  },
  'tc-bash-test': {
    id: 'tc-bash-test',
    toolName: 'bash',
    arguments: { command: 'npm test -- --run src/utils.test.ts' },
    result: ` ✓ src/utils.test.ts (4 tests) 12ms
   ✓ capitalize
   ✓ slugify
   ✓ truncate
   ✓ formatDate

 Test Files  1 passed (1)
      Tests  4 passed (4)
   Start at  14:23:01
   Duration  245ms`,
    execPhase: 'complete',
    durationMs: 1250,
  },
  'tc-write-test': {
    id: 'tc-write-test',
    toolName: 'write',
    arguments: {
      file_path: 'src/utils.test.ts',
      content: `import { describe, it, expect } from 'vitest';
import { capitalize, slugify, truncate, formatDate } from './utils';

describe('utils', () => {
  it('capitalize', () => {
    expect(capitalize('hello')).toBe('Hello');
  });
  it('slugify', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });
  it('truncate', () => {
    expect(truncate('abcdef', 5)).toBe('ab...');
  });
  it('formatDate', () => {
    const d = new Date('2026-03-04');
    expect(formatDate(d)).toBe('Mar 4, 2026');
  });
});`,
    },
    result: 'Successfully wrote src/utils.test.ts',
    execPhase: 'complete',
    durationMs: 18,
  },
  'tc-find-components': {
    id: 'tc-find-components',
    toolName: 'find',
    arguments: { pattern: '*.tsx', path: 'src/components' },
    result: `src/components/App.tsx
src/components/Header.tsx
src/components/DateDisplay.tsx
src/components/UserProfile.tsx`,
    execPhase: 'complete',
    durationMs: 35,
  },
  'tc-read-header': {
    id: 'tc-read-header',
    toolName: 'read',
    arguments: { file_path: 'src/components/Header.tsx' },
    result: `import React from 'react';

export function Header({ title }: { title: string }) {
  return (
    <header className="bg-gray-900 p-4">
      <h1 className="text-xl font-bold">{title}</h1>
    </header>
  );
}`,
    execPhase: 'complete',
    durationMs: 28,
  },
  'tc-edit-header': {
    id: 'tc-edit-header',
    toolName: 'edit',
    arguments: {
      file_path: 'src/components/Header.tsx',
      old_text: `<h1 className="text-xl font-bold">{title}</h1>`,
      new_text: `<h1 className="text-xl font-bold">{title}</h1>
      <span className="text-sm text-gray-400">{new Date().toLocaleDateString()}</span>`,
    },
    result: 'Successfully edited src/components/Header.tsx',
    execPhase: 'complete',
    durationMs: 22,
  },
  'tc-bash-lint': {
    id: 'tc-bash-lint',
    toolName: 'bash',
    arguments: { command: 'npm run lint' },
    result: `> demo-app@1.0.0 lint
> eslint src/

✨ No issues found.`,
    execPhase: 'complete',
    durationMs: 890,
  },
  'tc-ls-src': {
    id: 'tc-ls-src',
    toolName: 'ls',
    arguments: { path: 'src/' },
    result: `total 24
drwxr-xr-x 3 user user 4096 Mar  4 14:20 components
-rw-r--r-- 1 user user  520 Mar  4 14:22 utils.ts
-rw-r--r-- 1 user user  380 Mar  4 14:23 utils.test.ts
-rw-r--r-- 1 user user  210 Mar  4 14:20 main.ts
-rw-r--r-- 1 user user  150 Mar  4 14:20 math.ts`,
    execPhase: 'complete',
    durationMs: 15,
  },
};
