type ActivityPanelProps = {
  activities?: string[];
};

export function ActivityPanel({ activities = [] }: ActivityPanelProps) {
  return (
    <section className="activity-panel panel-card">
      <div className="panel-heading">
        <div>
          <p>Recent Activity</p>
          <h2>Operational feed</h2>
        </div>
      </div>
      {activities.length === 0 ? (
        <div style={{ color: "var(--muted)", padding: "10px 0" }}>No recent log feeds.</div>
      ) : (
        activities.map((item, index) => (
          <div className="activity-item" key={item}>
            <span className="activity-item__index">{index + 1}</span>
            <p>{item}</p>
          </div>
        ))
      )}
    </section>
  );
}
