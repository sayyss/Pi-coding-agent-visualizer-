import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PanelContainer } from '../layout/PanelContainer';
import { useCurrentStep } from '../../hooks/useCurrentStep';
import { GitBranch, MessageSquare, Wrench, Archive, Settings, GitFork, FileCode2 } from 'lucide-react';
import type { SessionEntryType } from '../../types';

const entryIcons: Record<SessionEntryType, React.ReactNode> = {
  message: <MessageSquare size={10} />,
  tool_result: <Wrench size={10} />,
  compaction: <Archive size={10} />,
  model_change: <Settings size={10} />,
  branch_point: <GitFork size={10} />,
  metadata: <FileCode2 size={10} />,
};

const entryColors: Record<SessionEntryType, string> = {
  message: '#60a5fa',
  tool_result: '#fbbf24',
  compaction: '#c084fc',
  model_change: '#94a3b8',
  branch_point: '#f472b6',
  metadata: '#64748b',
};

export function SessionTreePanel() {
  const { visibleSessionEntries } = useCurrentStep();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleSessionEntries.length]);

  return (
    <PanelContainer
      title="Session Tree (JSONL)"
      icon={<GitBranch size={12} className="text-slate-400" />}
      className="h-full"
    >
      <div ref={scrollRef} className="flex flex-col gap-0.5 overflow-auto" style={{ maxHeight: '100%' }}>
        <AnimatePresence mode="popLayout">
          {visibleSessionEntries.map((entry, i) => {
            const color = entryColors[entry.type];
            const isBranch = entry.type === 'branch_point';
            const indent = entry.parentId ? (isBranch ? 24 : 12) : 0;

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: entry.isActiveBranch ? 1 : 0.4, x: 0 }}
                transition={{ duration: 0.2 }}
                layout
                className="flex items-start gap-1.5"
                style={{ marginLeft: indent }}
              >
                {/* Tree connector line */}
                <div className="flex flex-col items-center pt-1.5">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: color,
                      boxShadow: entry.isActiveBranch ? `0 0 6px ${color}40` : 'none',
                    }}
                  />
                  {i < visibleSessionEntries.length - 1 && (
                    <div className="w-px flex-1 bg-slate-700" style={{ minHeight: 8 }} />
                  )}
                </div>

                <div
                  className={`flex-1 rounded px-2 py-1 text-[10px] ${
                    entry.isActiveBranch ? 'bg-surface' : 'bg-transparent'
                  }`}
                  style={{
                    borderLeft: `2px solid ${entry.isActiveBranch ? color : '#334155'}`,
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <span style={{ color }}>{entryIcons[entry.type]}</span>
                    <span
                      className="font-medium"
                      style={{ color: entry.isActiveBranch ? '#e2e8f0' : '#475569' }}
                    >
                      {entry.label}
                    </span>
                  </div>
                  <div className="mt-0.5 text-slate-600 truncate" title={entry.preview}>
                    {entry.preview}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {visibleSessionEntries.length === 0 && (
          <div className="py-4 text-center text-xs text-slate-600">
            Session tree empty — advance to see entries.
          </div>
        )}
      </div>
    </PanelContainer>
  );
}
