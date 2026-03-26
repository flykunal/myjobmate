import type { PropsWithChildren, ReactNode } from "react";

// Shared stat card used across dashboard-style surfaces.
export function StatCard({
  label,
  value,
  hint,
  icon,
  tone = "teal"
}: {
  label: string;
  value: string | number;
  hint: string;
  icon?: ReactNode;
  tone?: "teal" | "amber" | "rose" | "violet";
}) {
  return (
    <article className={`card stat-card stat-card-${tone}`}>
      <div className="stat-card-top">
        <span className="eyebrow">{label}</span>
        {icon ? <span className="stat-card-icon">{icon}</span> : null}
      </div>
      <strong>{value}</strong>
      <p>{hint}</p>
    </article>
  );
}

export function SectionCard({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <section className="card section-card">
      <div className="section-head"><h2>{title}</h2></div>
      {children}
    </section>
  );
}

export function PlanGate({ plan, children }: PropsWithChildren<{ plan: string }>) {
  return (
    <div className="plan-gate">
      <div>
        <p className="eyebrow">{plan} Feature</p>
        <h3>Upgrade to unlock the full workflow</h3>
      </div>
      {children}
    </div>
  );
}