export type SessionEntryType =
  | 'message'
  | 'tool_result'
  | 'compaction'
  | 'model_change'
  | 'branch_point'
  | 'metadata';

export interface SessionEntry {
  id: string;
  type: SessionEntryType;
  parentId?: string;
  label: string;
  timestamp: number;
  isActiveBranch: boolean;
  /** Brief content preview */
  preview: string;
}

export interface SessionTree {
  entries: SessionEntry[];
  activeBranchIds: string[];
}
