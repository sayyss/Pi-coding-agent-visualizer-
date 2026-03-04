import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PanelContainer } from '../layout/PanelContainer';
import { useCurrentStep } from '../../hooks/useCurrentStep';
import { roleColors, roleBorderColors } from '../../utils/colors';
import { formatTokenCount } from '../../utils/tokens';
import { MessageSquare, User, Bot, Wrench, Archive } from 'lucide-react';
import type { Message } from '../../types';

function MessageIcon({ role }: { role: Message['role'] }) {
  switch (role) {
    case 'user':
      return <User size={12} />;
    case 'assistant':
      return <Bot size={12} />;
    case 'tool_result':
      return <Wrench size={12} />;
    case 'compaction_summary':
      return <Archive size={12} />;
  }
}

function roleLabel(msg: Message): string {
  switch (msg.role) {
    case 'user':
      return 'User';
    case 'assistant':
      return `Assistant${msg.stopReason === 'tool_use' ? ' → tool_use' : ''}`;
    case 'tool_result':
      return `Tool: ${msg.toolName}`;
    case 'compaction_summary':
      return `Compaction Summary (${msg.originalMessageCount} msgs → ${formatTokenCount(msg.tokens)})`;
  }
}

export function MessageTimelinePanel() {
  const { visibleMessages, step } = useCurrentStep();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleMessages.length]);

  // Group by turn
  let lastTurn = -1;

  return (
    <PanelContainer
      title="Message Timeline"
      icon={<MessageSquare size={12} className="text-slate-400" />}
      className="h-full"
    >
      <div ref={scrollRef} className="flex flex-col gap-2 overflow-auto pr-1" style={{ maxHeight: '100%' }}>
        {visibleMessages.length === 0 && (
          <div className="py-8 text-center text-xs text-slate-600">
            No messages yet — advance the timeline to see the conversation.
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {visibleMessages.map((msg) => {
            const showTurnSep = msg.turnIndex !== lastTurn && msg.turnIndex > 0 && lastTurn !== -1;
            lastTurn = msg.turnIndex;
            const color = roleColors[msg.role];
            const borderClass = roleBorderColors[msg.role];

            return (
              <motion.div key={msg.id} layout>
                {showTurnSep && (
                  <div className="my-2 flex items-center gap-2">
                    <div className="h-px flex-1 bg-slate-700" />
                    <span className="text-[10px] text-slate-600">Turn {msg.turnIndex}</span>
                    <div className="h-px flex-1 bg-slate-700" />
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className={`rounded-md border border-panel-border bg-surface p-2.5 ${borderClass} border-l-[3px]`}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <span style={{ color }}>
                      <MessageIcon role={msg.role} />
                    </span>
                    <span className="text-[11px] font-medium" style={{ color }}>
                      {roleLabel(msg)}
                    </span>
                    <span className="ml-auto text-[10px] text-slate-600">
                      {formatTokenCount(msg.tokens)} tokens
                    </span>
                  </div>
                  <div className="text-xs leading-relaxed text-slate-300 whitespace-pre-wrap">
                    {msg.content.length > 300 ? msg.content.slice(0, 300) + '...' : msg.content}
                  </div>

                  {msg.role === 'assistant' && msg.toolCallIds && msg.toolCallIds.length > 0 && (
                    <div className="mt-1.5 flex gap-1">
                      {msg.toolCallIds.map((tcId) => (
                        <span
                          key={tcId}
                          className="inline-flex items-center gap-1 rounded bg-amber-400/10 px-1.5 py-0.5 text-[10px] text-amber-400"
                        >
                          <Wrench size={9} />
                          {tcId.replace('tc-', '')}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Compaction indicator */}
        {step.isCompacting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="my-2 flex items-center gap-2 rounded-md border border-purple-500/30 bg-purple-500/10 px-3 py-2 text-xs text-purple-400"
          >
            <Archive size={12} />
            <span>Compacting context...</span>
            <motion.div
              className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-400"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        )}
      </div>
    </PanelContainer>
  );
}
