import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PanelContainer } from '../layout/PanelContainer';
import { useCurrentStep } from '../../hooks/useCurrentStep';
import { formatTokenCount } from '../../utils/tokens';
import { FileText, ChevronDown, ChevronRight } from 'lucide-react';

export function SystemPromptPanel() {
  const { visibleLayers } = useCurrentStep();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const totalTokens = visibleLayers.reduce((s, l) => s + l.tokens, 0);

  return (
    <PanelContainer
      title="System Prompt"
      icon={<FileText size={12} className="text-slate-400" />}
      className="h-full"
    >
      <div className="flex flex-col gap-1.5">
        {visibleLayers.length === 0 && (
          <div className="py-4 text-center text-xs text-slate-600">
            System prompt not yet assembled...
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {visibleLayers.map((layer, i) => {
            const isExpanded = expandedId === layer.id;

            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                layout
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : layer.id)}
                  className="flex w-full items-center gap-2 rounded-md border border-panel-border bg-surface px-2.5 py-2 text-left transition hover:border-slate-600"
                  style={{ borderLeftWidth: 3, borderLeftColor: layer.color }}
                >
                  {isExpanded ? (
                    <ChevronDown size={11} className="text-slate-500" />
                  ) : (
                    <ChevronRight size={11} className="text-slate-500" />
                  )}
                  <span className="flex-1 text-[11px] font-medium text-slate-300">
                    {layer.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-600">
                    {formatTokenCount(layer.tokens)}
                  </span>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <pre className="mt-1 max-h-32 overflow-auto rounded-md bg-[#0d1117] p-2.5 text-[10px] leading-relaxed text-slate-400">
                        {layer.content}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Token total */}
        {visibleLayers.length > 0 && (
          <div className="mt-1 flex items-center justify-between border-t border-panel-border pt-2 text-[10px]">
            <span className="text-slate-500">
              {visibleLayers.length}/7 layers
            </span>
            <span className="font-mono text-slate-400">
              Total: {formatTokenCount(totalTokens)} tokens
            </span>
          </div>
        )}
      </div>
    </PanelContainer>
  );
}
