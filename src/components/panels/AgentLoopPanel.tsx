import { PanelContainer } from '../layout/PanelContainer';
import { useCurrentStep } from '../../hooks/useCurrentStep';
import type { LoopPhase } from '../../types';
import { RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { Badge } from '../shared/Badge';

const phases: { id: LoopPhase; label: string; short: string }[] = [
  { id: 'input', label: 'User Input', short: 'IN' },
  { id: 'expansion', label: 'Expansion', short: 'EX' },
  { id: 'context_prep', label: 'Context Prep', short: 'CP' },
  { id: 'system_prompt', label: 'System Prompt', short: 'SP' },
  { id: 'llm_call', label: 'LLM Call', short: 'LM' },
  { id: 'tool_execution', label: 'Tool Execution', short: 'TE' },
  { id: 'turn_complete', label: 'Turn Complete', short: 'TC' },
  { id: 'compaction_check', label: 'Compaction Check', short: 'CC' },
];

const specialPhases: LoopPhase[] = ['idle', 'compaction', 'agent_end'];

export function AgentLoopPanel() {
  const { step } = useCurrentStep();
  const activePhase = step.loopPhase;
  const isSpecial = specialPhases.includes(activePhase);

  const cx = 130;
  const cy = 115;
  const radius = 85;

  return (
    <PanelContainer
      title="Agent Loop"
      icon={<RefreshCw size={12} className="text-slate-400" />}
      className="h-full"
    >
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 260 240" className="w-full max-w-[240px]">
          {/* Connection lines */}
          {phases.map((_, i) => {
            const nextI = (i + 1) % phases.length;
            const angle1 = (i / phases.length) * Math.PI * 2 - Math.PI / 2;
            const angle2 = (nextI / phases.length) * Math.PI * 2 - Math.PI / 2;
            const x1 = cx + Math.cos(angle1) * radius;
            const y1 = cy + Math.sin(angle1) * radius;
            const x2 = cx + Math.cos(angle2) * radius;
            const y2 = cy + Math.sin(angle2) * radius;
            return (
              <line
                key={`line-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#334155"
                strokeWidth={1.5}
              />
            );
          })}

          {/* Phase nodes */}
          {phases.map((phase, i) => {
            const angle = (i / phases.length) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            const isActive = phase.id === activePhase;

            return (
              <g key={phase.id}>
                {isActive && (
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={22}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={18}
                  fill={isActive ? '#1e3a5f' : '#0f172a'}
                  stroke={isActive ? '#3b82f6' : '#334155'}
                  strokeWidth={isActive ? 2 : 1}
                />
                <text
                  x={x}
                  y={y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={9}
                  fontWeight={isActive ? 700 : 400}
                  fill={isActive ? '#60a5fa' : '#64748b'}
                  fontFamily="ui-monospace, monospace"
                >
                  {phase.short}
                </text>
              </g>
            );
          })}

          {/* Center label */}
          <text x={cx} y={cy - 6} textAnchor="middle" fontSize={10} fill="#94a3b8" fontWeight={600}>
            {isSpecial ? activePhase.toUpperCase() : 'AGENT'}
          </text>
          <text x={cx} y={cy + 8} textAnchor="middle" fontSize={8} fill="#64748b">
            {isSpecial ? '' : 'LOOP'}
          </text>
        </svg>

        {/* Active phase label */}
        <div className="mt-1 text-center">
          <div className="text-xs font-semibold text-blue-400">
            {isSpecial
              ? activePhase === 'idle'
                ? 'Idle'
                : activePhase === 'compaction'
                  ? 'Compaction'
                  : 'Agent End'
              : phases.find((p) => p.id === activePhase)?.label}
          </div>

          {/* Events */}
          {step.events.length > 0 && (
            <div className="mt-2 flex flex-wrap justify-center gap-1">
              {step.events.map((ev, i) => (
                <motion.div
                  key={`${ev.type}-${i}`}
                  initial={{ opacity: 0, scale: 0.8, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Badge color="#60a5fa">{ev.label}</Badge>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PanelContainer>
  );
}
