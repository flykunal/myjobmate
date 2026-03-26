import { SectionCard } from "../components/Cards";

const candidateFilters = ["Role fit", "Verified level", "Consistency", "Readiness score", "Skill tags", "Language"];
const candidateProfiles = [
  {
    name: "Ananya Patel",
    role: "Java Developer",
    readiness: 84,
    level: 5,
    streak: 18,
    skills: ["Core Java", "Spring Boot", "REST APIs"],
    note: "High consistency and strong backend project momentum."
  },
  {
    name: "Rahul Singh",
    role: "Data Analyst",
    readiness: 76,
    level: 4,
    streak: 11,
    skills: ["SQL", "Python", "Power BI"],
    note: "Strong task completion and resume quality score."
  },
  {
    name: "Megha Joshi",
    role: "Frontend Developer",
    readiness: 71,
    level: 4,
    streak: 9,
    skills: ["React", "TypeScript", "UI Systems"],
    note: "Improving quickly with verified project milestones."
  }
];

const recruiterSignals = [
  "Verified task completion instead of unchecked self-reporting",
  "Profile level built from real activity, not manual labels",
  "Consistency, projects, and readiness all support trust"
];

export function RecruiterPage() {
  return (
    <div className="page recruiter-page">
      <header className="hero recruiter-hero">
        <div>
          <p className="eyebrow">Recruiter trust layer</p>
          <h2>Discover learners through verified growth, not inflated claims.</h2>
          <p className="muted">
            The recruiter vision for MyJobMate is a trust-first discovery system built on activity, consistency, verified progress, and role-aligned readiness.
          </p>
        </div>
      </header>

      <div className="recruiter-grid">
        <SectionCard title="Candidate filters">
          <div className="chip-row recruiter-chip-row">
            {candidateFilters.map((filter) => (
              <span key={filter} className="pill recruiter-filter-chip">{filter}</span>
            ))}
          </div>
          <div className="value-points-list">
            {recruiterSignals.map((signal) => (
              <div key={signal} className="value-point">
                <strong>Trust signal</strong>
                <p>{signal}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Recruiter-ready candidate preview">
          <div className="recruiter-candidate-list">
            {candidateProfiles.map((candidate) => (
              <article key={candidate.name} className="recruiter-candidate-card">
                <div className="recruiter-candidate-head">
                  <div>
                    <strong>{candidate.name}</strong>
                    <p>{candidate.role}</p>
                  </div>
                  <span className="recruiter-readiness-pill">{candidate.readiness}% ready</span>
                </div>
                <div className="recruiter-candidate-metrics">
                  <span>Level {candidate.level}</span>
                  <span>{candidate.streak} day streak</span>
                </div>
                <div className="chip-row">
                  {candidate.skills.map((skill) => (
                    <span key={skill} className="roadmap-focus-chip">{skill}</span>
                  ))}
                </div>
                <p className="muted">{candidate.note}</p>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
