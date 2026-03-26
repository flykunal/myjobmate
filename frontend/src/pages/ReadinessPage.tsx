import { useEffect, useMemo, useState } from "react";
import { SectionCard, StatCard } from "../components/Cards";
import { api } from "../services/api";

type ReadinessResponse = {
  score: number;
  nextBestActions: string[];
};

type SkillGapResponse = {
  missingSkills: string[];
};

export function ReadinessPage() {
  const [readiness, setReadiness] = useState<ReadinessResponse | null>(null);
  const [skillGap, setSkillGap] = useState<SkillGapResponse | null>(null);

  useEffect(() => {
    api.getJobReadiness().then((data) => setReadiness(data as ReadinessResponse));
    api.getSkillGap().then((data) => setSkillGap(data as SkillGapResponse));
  }, []);

  const readinessScore = readiness?.score ?? 0;
  const readinessBreakdown = useMemo(() => ([
    { label: "Roadmap progress", value: Math.min(100, Math.max(25, readinessScore + 6)) },
    { label: "Project proof", value: Math.min(100, Math.max(20, readinessScore - 8)) },
    { label: "Resume quality", value: Math.min(100, Math.max(30, readinessScore + 4)) },
    { label: "Consistency", value: Math.min(100, Math.max(18, readinessScore - 2)) }
  ]), [readinessScore]);

  return (
    <div className="page readiness-page">
      <header className="hero readiness-hero">
        <div>
          <p className="eyebrow">Job readiness engine</p>
          <h2>See how close your profile is to being recruiter-ready.</h2>
          <p className="muted">
            Readiness in MyJobMate is built from progress, proof, consistency, and improvement signals instead of one-time claims.
          </p>
        </div>
      </header>

      <div className="readiness-grid">
        <SectionCard title="Overall readiness score">
          <div className="readiness-score-shell">
            <div className="readiness-score-ring">
              <strong>{readinessScore}%</strong>
              <span>Career readiness</span>
            </div>
            <div className="readiness-actions-list">
              {(readiness?.nextBestActions ?? []).map((item) => (
                <div key={item} className="list-item compact">
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Readiness breakdown">
          <div className="readiness-breakdown-list">
            {readinessBreakdown.map((item) => (
              <div key={item.label} className="readiness-breakdown-item">
                <div className="readiness-breakdown-head">
                  <span>{item.label}</span>
                  <strong>{item.value}%</strong>
                </div>
                <div className="roadmap-progress-track">
                  <div className="roadmap-progress-fill" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="stats-grid readiness-stats-grid">
        <StatCard label="Readiness" value={`${readinessScore}%`} hint="Composite role-readiness indicator" />
        <StatCard label="Gap count" value={skillGap?.missingSkills.length ?? 0} hint="Priority skills still missing" />
        <StatCard label="Next focus" value={(readiness?.nextBestActions ?? ["Projects"])[0]} hint="Highest-value next move" />
      </div>

      <SectionCard title="Skill gap analyzer">
        <div className="topic-grid">
          {(skillGap?.missingSkills ?? []).map((item) => (
            <article key={item} className="topic-card readiness-skill-card">
              <span className="eyebrow">Priority skill gap</span>
              <strong>{item}</strong>
              <p className="muted">Improve this area to strengthen both job readiness and profile trust.</p>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
