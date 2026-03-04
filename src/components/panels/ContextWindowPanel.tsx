import { motion } from 'motion/react';
import { PanelContainer } from '../layout/PanelContainer';
import { useCurrentStep } from '../../hooks/useCurrentStep';
import { roleColors } from '../../utils/colors';
import { formatTokenCount } from '../../utils/tokens';
import { Database } from 'lucide-react';

export function ContextWindowPanel() {
  const { step, contextBlocks, maxTokens, thresholdTokens } = useCurrentStep();
  const totalTokens = step.contextTokens;

  const thresholdPct = (thresholdTokens / maxTokens) * 100;
  const reservePct = 100 - thresholdPct;
  const usedPct = Math.min((totalTokens / maxTokens) * 100, 100);

  const overThreshold = totalTokens > thresholdTokens;

  return (
    <PanelContainer
      title="Context Window"
      icon={<Database size={12} className="text-slate-400" />}
      className="h-full"
    >
      <div className="flex flex-col gap-2">
        {/* Token counts */}
        <div className="flex items-center justify-between text-[10px] text-slate-500">
          <span>
            Used:{' '}
            <span className={`font-mono font-semibold ${overThreshold ? 'text-red-400' : 'text-slate-300'}`}>
              {formatTokenCount(totalTokens)}
            </span>
          </span>
          <span>
            Threshold: <span className="font-mono text-slate-400">{formatTokenCount(thresholdTokens)}</span>
          </span>
          <span>
            Max: <span className="font-mono text-slate-400">{formatTokenCount(maxTokens)}</span>
          </span>
        </div>

        {/* Main bar */}
        <div className="relative h-8 w-full overflow-hidden rounded-md bg-slate-800">
          {/* Message blocks */}
          <div className="absolute inset-y-0 left-0 flex" style={{ width: `${usedPct}%` }}>
            {contextBlocks.map((block, i) => {
              const blockTokens = block.tokens;
              const blockPct = totalTokens > 0 ? (blockTokens / totalTokens) * 100 : 0;
              const color = roleColors[block.role] ?? '#94a3b8';

              return (
                <motion.div
                  key={`${block.messageId}-${i}`}
                  className="relative h-full border-r border-slate-900/50"
                  style={{
                    width: `${blockPct}%`,
                    backgroundColor: `${color}30`,
                    minWidth: blockPct > 0.5 ? 2 : 0,
                    transformOrigin: 'left',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: step.isCompacting && block.role !== 'system' && block.role !== 'compaction_summary'
                      ? [1, 1, 0]
                      : 1,
                    backgroundColor: step.isCompacting && block.role !== 'system' && block.role !== 'compaction_summary'
                      ? [`${color}30`, '#ef444440', '#ef444400']
                      : `${color}30`,
                  }}
                  transition={{
                    duration: step.isCompacting ? 1.5 : 0.3,
                  }}
                  title={`${block.label}: ${formatTokenCount(block.tokens)}`}
                >
                  {blockPct > 8 && (
                    <span className="absolute inset-0 flex items-center justify-center text-[8px] text-slate-300 opacity-80">
                      {block.label.length > 12 ? block.label.slice(0, 10) + '..' : block.label}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Threshold line */}
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{ left: `${thresholdPct}%` }}
          >
            <div className="h-full w-0.5 bg-amber-500/60" />
            <span className="absolute -top-4 left-1 text-[8px] text-amber-500">
              threshold
            </span>
          </div>

          {/* Reserve zone */}
          <div
            className="absolute inset-y-0 right-0"
            style={{
              width: `${reservePct}%`,
              background: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(148,163,184,0.08) 3px, rgba(148,163,184,0.08) 6px)',
            }}
          >
            <span className="absolute inset-0 flex items-center justify-center text-[9px] text-slate-600">
              reserve
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-[9px] text-slate-500">
          {[
            { label: 'System', color: roleColors.system },
            { label: 'User', color: roleColors.user },
            { label: 'Assistant', color: roleColors.assistant },
            { label: 'Tool Result', color: roleColors.tool_result },
            { label: 'Summary', color: roleColors.compaction_summary },
          ].map(({ label, color }) => (
            <span key={label} className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: color }} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </PanelContainer>
  );
}
