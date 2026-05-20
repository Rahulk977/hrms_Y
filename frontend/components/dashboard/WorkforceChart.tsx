import type { CSSProperties } from "react";

type WorkforceChartProps = {
  weeklyMovement?: number[];
  weekDays?: string[];
};

export function WorkforceChart({ weeklyMovement = [], weekDays = [] }: WorkforceChartProps) {
  return (
    <section className="chart-panel">
      <div className="panel-heading">
        <div>
          <p>Workforce Pulse</p>
          <h2>Weekly HR movement</h2>
        </div>
        <button type="button" className="panel-chip">May 2026 ▾</button>
      </div>
      <div className="bar-chart" aria-label="Monthly HR movement chart">
        {weeklyMovement.map((value, index) => (
          <span key={weekDays[index] || index} style={{ "--bar": `${value}%` } as CSSProperties}>
            <i />
            <b>{weekDays[index] || ""}</b>
          </span>
        ))}
      </div>
    </section>
  );
}
