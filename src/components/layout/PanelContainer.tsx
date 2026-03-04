interface PanelContainerProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function PanelContainer({ title, icon, children, className = '' }: PanelContainerProps) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-lg border border-panel-border bg-panel-bg ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-panel-border px-3 py-2">
        {icon}
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</h2>
      </div>
      <div className="flex-1 overflow-auto p-3">{children}</div>
    </div>
  );
}
