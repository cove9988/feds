type Agent = { name: string; color: string; progress: number };

type Props = {
  title: string;
  subtitle: string;
  osTitle: string;
  online: string;
  statusRunning: string;
  statusStandby: string;
  agents: Agent[];
};

export default function TerminalCard({ title, subtitle, osTitle, online, statusRunning, statusStandby, agents }: Props) {
  return (
    <div className="glass overflow-hidden rounded-lg">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-label-sm tracking-normal text-on-surface-variant">{osTitle}</span>
        <span className="ml-auto flex items-center gap-1.5 text-label-sm tracking-normal text-green">
          <span className="size-1.5 animate-pulse rounded-full bg-green" />
          {online}
        </span>
      </div>
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden w-12 flex-col items-center gap-4 border-r border-white/5 py-4 sm:flex">
          {['dashboard', 'smart_toy', 'hub', 'insights', 'settings'].map((icon, i) => (
            <span key={icon} className={`material-symbols-outlined text-[20px] ${i === 1 ? 'text-primary' : 'text-on-surface-variant/60'}`}>{icon}</span>
          ))}
        </div>
        {/* Agent list */}
        <div className="flex-1 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-label-sm uppercase tracking-wider text-on-surface-variant">{title}</span>
            <span className="rounded-full bg-primary/15 px-2 py-0.5 text-label-sm tracking-normal text-primary">{subtitle}</span>
          </div>
          <div className="space-y-2.5">
            {agents.map((agent, i) => (
              <div key={agent.name} className="rounded-md border border-white/5 bg-white/[0.02] p-2.5">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[13px] text-on-surface">
                    <span className="size-2 rounded-full" style={{ backgroundColor: agent.color }} />
                    {agent.name}
                  </span>
                  <span className="text-label-sm tracking-normal text-on-surface-variant/70">{i < agents.length - 1 ? statusRunning : statusStandby}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full" style={{ width: `${agent.progress}%`, backgroundColor: agent.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
