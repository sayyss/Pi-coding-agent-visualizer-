import { motion } from 'motion/react';
import { PanelContainer } from '../layout/PanelContainer';
import { useCurrentStep } from '../../hooks/useCurrentStep';
import { CodeBlock } from '../shared/CodeBlock';
import { Badge } from '../shared/Badge';
import {
  Wrench,
  FileText,
  FilePlus,
  FileEdit,
  Terminal,
  Search,
  FolderSearch,
  List,
  Clock,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import type { ToolName, ToolExecPhase } from '../../types';

const toolIcons: Record<ToolName, React.ReactNode> = {
  read: <FileText size={14} />,
  write: <FilePlus size={14} />,
  edit: <FileEdit size={14} />,
  bash: <Terminal size={14} />,
  grep: <Search size={14} />,
  find: <FolderSearch size={14} />,
  ls: <List size={14} />,
};

const phaseInfo: Record<ToolExecPhase, { icon: React.ReactNode; color: string; label: string }> = {
  pending: { icon: <Clock size={12} />, color: '#94a3b8', label: 'Pending' },
  executing: { icon: <Loader2 size={12} className="animate-spin" />, color: '#fbbf24', label: 'Executing' },
  complete: { icon: <CheckCircle2 size={12} />, color: '#4ade80', label: 'Complete' },
  error: { icon: <AlertCircle size={12} />, color: '#ef4444', label: 'Error' },
};

export function ToolCallPanel() {
  const { activeToolCall, step } = useCurrentStep();

  return (
    <PanelContainer
      title="Tool Call Detail"
      icon={<Wrench size={12} className="text-slate-400" />}
      className="h-full"
    >
      {!activeToolCall ? (
        <div className="flex h-full items-center justify-center py-8 text-center text-xs text-slate-600">
          {step.loopPhase === 'tool_execution'
            ? 'Tool executing...'
            : 'No active tool call at this step.'}
        </div>
      ) : (
        <motion.div
          key={activeToolCall.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-3"
        >
          {/* Tool header */}
          <div className="flex items-center gap-2">
            <span className="text-amber-400">{toolIcons[activeToolCall.toolName]}</span>
            <span className="text-sm font-semibold text-amber-400">{activeToolCall.toolName}</span>
            <Badge color={phaseInfo[activeToolCall.execPhase].color}>
              {phaseInfo[activeToolCall.execPhase].icon}
              {phaseInfo[activeToolCall.execPhase].label}
            </Badge>
            <span className="ml-auto text-[10px] font-mono text-slate-600">
              {activeToolCall.durationMs}ms
            </span>
          </div>

          {/* Execution flow */}
          <div className="flex items-center gap-1 text-[10px]">
            {(['pending', 'executing', 'complete'] as ToolExecPhase[]).map((phase, i) => {
              const reached =
                phase === 'pending'
                  ? true
                  : phase === 'executing'
                    ? ['executing', 'complete'].includes(activeToolCall.execPhase)
                    : activeToolCall.execPhase === 'complete';
              const info = phaseInfo[phase];
              return (
                <div key={phase} className="flex items-center gap-1">
                  {i > 0 && (
                    <div
                      className="h-px w-4"
                      style={{ backgroundColor: reached ? info.color : '#334155' }}
                    />
                  )}
                  <motion.div
                    className="flex items-center gap-1 rounded-full px-2 py-0.5"
                    style={{
                      backgroundColor: reached ? `${info.color}20` : 'transparent',
                      color: reached ? info.color : '#475569',
                      border: `1px solid ${reached ? `${info.color}40` : '#334155'}`,
                    }}
                    animate={
                      reached && phase === activeToolCall.execPhase
                        ? { scale: [1, 1.05, 1] }
                        : undefined
                    }
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {info.icon}
                    <span>{info.label}</span>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Arguments */}
          <div>
            <div className="mb-1 text-[10px] font-semibold uppercase text-slate-500">Arguments</div>
            <CodeBlock
              code={JSON.stringify(activeToolCall.arguments, null, 2)}
              language="json"
              maxHeight="120px"
            />
          </div>

          {/* Result */}
          {activeToolCall.result && activeToolCall.execPhase === 'complete' && (
            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-1 text-[10px] font-semibold uppercase text-slate-500">Result</div>
              <CodeBlock
                code={activeToolCall.result}
                language="typescript"
                maxHeight="140px"
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </PanelContainer>
  );
}
