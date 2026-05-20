type StatGridProps = {
  stats?: Array<{
    label: string;
    value: string;
    trend: string;
    tone: string;
  }>;
};

const STAT_ICONS: Record<string, string> = {
  Employees: "👥",
  "Attendance Today": "✓",
  "Leave Requests": "📅",
  "Payroll Ready": "💰",
};

export function StatGrid({ stats = [] }: StatGridProps) {
  return (
    <section className="stat-grid" aria-label="HR summary">
      {stats.map((stat) => (
        <article className={`stat-card stat-card--enhanced ${stat.tone}`} key={stat.label}>
          <div className="stat-card__top">
            <span className="stat-card__icon" aria-hidden>
              {STAT_ICONS[stat.label] ?? "◆"}
            </span>
            <span className="stat-card__label">{stat.label}</span>
          </div>
          <strong>{stat.value}</strong>
          <small>{stat.trend}</small>
        </article>
      ))}
    </section>
  );
}
