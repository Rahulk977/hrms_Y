import type { ModuleItem } from "@/types";

type ModuleCardProps = {
  index: number;
  item: ModuleItem;
  onSelect: (title: string) => void;
};

export function ModuleCard({ index, item, onSelect }: ModuleCardProps) {
  return (
    <article 
      className={`module-card ${item.featured ? "featured" : ""}`}
      onClick={() => onSelect(item.title)}
      style={{ cursor: "pointer" }}
    >
      <span className="monitor-icon">{String(index + 1).padStart(2, "0")}</span>
      <div>
        <h2>{item.title}</h2>
        <p>{item.description ?? "Open module workspace and related actions."}</p>
      </div>
      <button 
        aria-label={`Open ${item.title}`} 
        onClick={(e) => {
          e.stopPropagation();
          onSelect(item.title);
        }}
      >
        ›
      </button>
    </article>
  );
}
