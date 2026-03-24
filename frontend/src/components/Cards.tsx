import type { PropsWithChildren } from "react";

export function StatCard({ label, value, hint }: { label: string; value: string | number; hint: string }) {
  return (
    <article className="card stat-card">
      <span className="eyebrow">{label}</span>
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
