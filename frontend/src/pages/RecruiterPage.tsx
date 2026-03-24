import { SectionCard } from "../components/Cards";

export function RecruiterPage() {
  return (
    <div className="page two-column">
      <SectionCard title="Recruiter dashboard">
        <div className="list-stack">
          <div className="list-item"><strong>Demo Learner</strong><span className="muted">Java Developer • readiness 72%</span></div>
          <div className="list-item"><strong>Candidate filters</strong><span className="muted">Role, score, skills, language</span></div>
          <div className="list-item"><strong>Shortlist workflow</strong><span className="muted">Basic portal scaffolded for next iteration</span></div>
        </div>
      </SectionCard>
      <SectionCard title="Company-side roadmap">
        <p className="muted">The current build prepares candidate discovery and shortlist management. Full hiring workflows can layer on top later.</p>
      </SectionCard>
    </div>
  );
}
