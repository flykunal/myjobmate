import { useEffect, useState } from "react";
import { SectionCard, StatCard } from "../components/Cards";
import { api } from "../services/api";

export function ReadinessPage() {
  const [readiness, setReadiness] = useState<Record<string, any> | null>(null);
  const [skillGap, setSkillGap] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    api.getJobReadiness().then(setReadiness);
    api.getSkillGap().then(setSkillGap);
  }, []);

  return (
    <div className="page two-column">
      <SectionCard title="Job readiness score">
        <div className="stats-grid single">
          <StatCard label="Readiness" value={`${readiness?.score ?? 0}%`} hint="Weighted score across roadmap, projects, resume, and consistency" />
        </div>
        <div className="list-stack">
          {(readiness?.nextBestActions ?? []).map((item: string) => <div key={item} className="list-item"><span>{item}</span></div>)}
        </div>
      </SectionCard>
      <SectionCard title="Skill gap analyzer">
        <div className="list-stack">
          {(skillGap?.missingSkills ?? []).map((item: string) => <div key={item} className="list-item"><span>{item}</span></div>)}
        </div>
      </SectionCard>
    </div>
  );
}
