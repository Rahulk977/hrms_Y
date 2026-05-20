import { Metric } from "./Metric";

export function BroadcastPanel() {
  return (
    <section className="timeline-panel">
      <div className="panel-heading">
        <div>
          <p>Broadcast</p>
          <h2>Send team message</h2>
        </div>
        <div className="metric-row">
          <Metric label="Likes" value="45" icon="♡" />
          <Metric label="Messages" value="0" icon="✉" />
        </div>
      </div>
      <textarea placeholder="Write a message for selected employees" />
      <input placeholder="Select employees to send message" />
      <button className="primary">Send Message</button>
    </section>
  );
}
