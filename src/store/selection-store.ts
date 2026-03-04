import { create } from 'zustand';

interface SelectionState {
  selectedMessageId: string | null;
  selectedToolCallId: string | null;
  selectedSessionEntryId: string | null;

  selectMessage: (id: string | null) => void;
  selectToolCall: (id: string | null) => void;
  selectSessionEntry: (id: string | null) => void;
  clearSelection: () => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
  selectedMessageId: null,
  selectedToolCallId: null,
  selectedSessionEntryId: null,

  selectMessage: (id) => set({ selectedMessageId: id }),
  selectToolCall: (id) => set({ selectedToolCallId: id }),
  selectSessionEntry: (id) => set({ selectedSessionEntryId: id }),
  clearSelection: () =>
    set({
      selectedMessageId: null,
      selectedToolCallId: null,
      selectedSessionEntryId: null,
    }),
}));
