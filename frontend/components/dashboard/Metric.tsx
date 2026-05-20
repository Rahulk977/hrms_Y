type MetricProps = {
  icon: string;
  label: string;
  value: string;
};

export function Metric({ icon, label, value }: MetricProps) {
  return (
    <div className="metric" title={label}>
      <span>{icon}</span>
      <strong>{value}</strong>
    </div>
  );
}
