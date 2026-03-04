import { motion } from 'motion/react';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  delay?: number;
}

export function AnimatedCard({ children, className = '', borderColor, delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay }}
      className={`rounded-lg border border-panel-border bg-panel-bg p-3 ${className}`}
      style={borderColor ? { borderLeftWidth: 3, borderLeftColor: borderColor } : undefined}
    >
      {children}
    </motion.div>
  );
}
