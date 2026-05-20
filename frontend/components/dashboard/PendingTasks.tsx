type PendingTasksProps = {
  tasks?: string[];
};

export function PendingTasks({ tasks = [] }: PendingTasksProps) {
  return (
    <aside className="tasks panel-card">
      <div className="task-tabs">
        <button className="active">Tasks</button>
        <button>Info</button>
        <button>Events</button>
        <button>Mail</button>
      </div>
      <h2>Pending Tasks</h2>
      {tasks.length === 0 ? (
        <div style={{ color: "var(--muted)", padding: "10px 0" }}>No pending administrative tasks.</div>
      ) : (
        tasks.map((task) => (
          <div className="task-row" key={task}>
            <strong>{task}</strong>
            <span style={{ backgroundColor: "var(--accent)" }}>!</span>
          </div>
        ))
      )}
    </aside>
  );
}
