import { useEffect, useState } from "react";
import { SectionCard, StatCard } from "../components/Cards";
import { api } from "../services/api";
import type { ProgressSummary, Roadmap } from "../types";

export function DashboardPage() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [progress, setProgress] = useState<ProgressSummary | null>(null);

  useEffect(() => {
    api.getRoadmap().then(setRoadmap);
    api.getProgressSummary().then(setProgress);
  }, []);

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Learner Dashboard</p>
          <h2>Build your path to {roadmap?.goal ?? "your next role"}</h2>
          <p className="muted">Track your roadmap, streak, job readiness, and premium growth tools from one workspace.</p>
        </div>
      </header>
      <div className="stats-grid">
        <StatCard label="Progress" value={`${progress?.progressPercent ?? 0}%`} hint="Overall roadmap completion" />
        <StatCard label="Current streak" value={progress?.currentStreak ?? 0} hint="Daily learning consistency" />
        <StatCard label="Points" value={progress?.points ?? 0} hint="Gamified XP earned" />
        <StatCard label="Level" value={progress?.level ?? 1} hint="Learner level based on action" />
      </div>
      <SectionCard title="Today's tasks">
        <div className="list-stack">
          {progress?.todaysTasks.map((task) => (
            <div key={task.taskId} className="list-item">
              <div>
                <strong>{task.title}</strong>
                <p>{task.sourceType} • {task.xpPoints} XP</p>
              </div>
              <span className={`pill ${task.status === "COMPLETED" ? "pill-success" : "pill-warn"}`}>{task.status}</span>
            </div>
          ))}
        </div>
      </SectionCard>
      <SectionCard title="Current roadmap focus">
        {roadmap?.weeklyPlan.slice(0, 2).map((week) => (
          <div key={week.weekNumber} className="timeline-item">
            <strong>{week.title}</strong>
            <p>{week.objective}</p>
          </div>
        ))}
      </SectionCard>
    </div>
  );
}
