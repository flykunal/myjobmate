import { useMemo, useState } from "react";
import { PlanGate, SectionCard, StatCard } from "../components/Cards";

const roleSkillMap: Record<string, string[]> = {
  "Java Developer": ["java", "spring boot", "spring", "sql", "rest api", "hibernate", "git", "microservices"],
  "Frontend Developer": ["javascript", "react", "html", "css", "typescript", "redux", "responsive", "api"],
  "Data Analyst": ["excel", "sql", "python", "power bi", "tableau", "statistics", "dashboard", "data cleaning"],
  "Backend Developer": ["java", "spring boot", "node", "sql", "api", "authentication", "docker", "testing"]
};

const templateCatalog = [
  {
    code: "starter-ats",
    name: "Starter ATS",
    audience: "0-1 years",
    pitch: "Best for freshers and students who need projects, skills, and internships to stand out.",
    strengths: ["Strong skills-first layout", "Project section above education", "Clean ATS parsing"]
  },
  {
    code: "impact-pro",
    name: "Impact Pro",
    audience: "1-4 years",
    pitch: "Best for early-career candidates who want measurable impact and cleaner experience storytelling.",
    strengths: ["Outcome-driven work history", "Balanced skills and achievements", "Strong role alignment"]
  },
  {
    code: "leadership-exec",
    name: "Leadership Exec",
    audience: "4+ years",
    pitch: "Best for experienced professionals with ownership, mentoring, and system-scale impact.",
    strengths: ["Leadership summary section", "Architecture and delivery emphasis", "Senior ATS keyword balance"]
  }
];

type AnalysisResult = {
  atsScore: number;
  extractedPreview: string;
  missingSkills: string[];
  missingSections: string[];
  strengths: string[];
  suggestions: string[];
  recommendedTemplate: string;
  addSkills: string[];
};

function normalizeText(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function getRecommendedTemplate(experience: number) {
  if (experience <= 1) return "starter-ats";
  if (experience <= 4) return "impact-pro";
  return "leadership-exec";
}

function buildFallbackResumeText(role: string, experience: number, fileName?: string) {
  return [
    `Target role: ${role}`,
    `Experience: ${experience} years`,
    fileName ? `Uploaded file: ${fileName}` : "No file uploaded",
    "Skills section needs stronger role-specific keywords.",
    "Projects and measurable impact should be more visible."
  ].join("\n");
}

function analyzeResumeText(text: string, role: string, experience: number): AnalysisResult {
  const normalized = normalizeText(text);
  const roleSkills = roleSkillMap[role] ?? roleSkillMap["Java Developer"];
  const sections = [
    { label: "Professional summary", checks: ["summary", "profile", "objective"] },
    { label: "Projects", checks: ["project", "projects"] },
    { label: "Experience", checks: ["experience", "work experience", "employment"] },
    { label: "Skills", checks: ["skills", "technical skills", "tech stack"] },
    { label: "Education", checks: ["education", "college", "university"] }
  ];

  const missingSkills = roleSkills.filter((skill) => !normalized.includes(skill));
  const missingSections = sections
    .filter((section) => !section.checks.some((check) => normalized.includes(check)))
    .map((section) => section.label);

  const strengths: string[] = [];
  const suggestions: string[] = [];
  const addSkills: string[] = [];
  const hasImpact = /\d+%|\d+\+|\d+ users|\d+ students|\d+ clients/.test(normalized);

  if (normalized.includes("project")) {
    strengths.push("Projects are present, which helps ATS and recruiter review for role-fit.");
  }
  if (normalized.includes("intern") || normalized.includes("developer") || normalized.includes("analyst")) {
    strengths.push("Resume already signals role-oriented experience keywords.");
  }
  if (hasImpact) {
    strengths.push("Quantified impact is present, which usually improves recruiter confidence.");
  }

  if (missingSkills.length > 0) {
    suggestions.push(`Add more ${role}-specific keywords such as ${missingSkills.slice(0, 4).join(", ")}.`);
    addSkills.push(...missingSkills.slice(0, 5));
  }
  if (missingSections.length > 0) {
    suggestions.push(`Your resume is missing key ATS sections: ${missingSections.join(", ")}.`);
  }
  if (!hasImpact) {
    suggestions.push("Add measurable impact to projects or experience, like performance gains, users served, or delivery speed.");
  }
  if (experience <= 1 && !normalized.includes("intern") && !normalized.includes("project")) {
    suggestions.push("As a fresher, add 2-3 strong projects and highlight tools used, role, and outcomes clearly.");
  }
  if (experience >= 2 && !normalized.includes("lead") && !normalized.includes("owned")) {
    suggestions.push("Highlight ownership, delivery responsibility, collaboration, and production impact for your experience level.");
  }

  const scoreBase = 55;
  const sectionScore = Math.max(0, 5 - missingSections.length) * 5;
  const keywordScore = Math.max(0, roleSkills.length - missingSkills.length) * 4;
  const impactScore = hasImpact ? 10 : 0;
  const atsScore = Math.min(96, scoreBase + sectionScore + keywordScore + impactScore);

  return {
    atsScore,
    extractedPreview: text.slice(0, 260),
    missingSkills,
    missingSections,
    strengths: strengths.length ? strengths : ["Resume has baseline content to build on, but it needs stronger targeting for the chosen role."],
    suggestions: suggestions.length ? suggestions : ["Resume is fairly aligned. Focus on sharper impact bullets and job-specific phrasing."],
    recommendedTemplate: getRecommendedTemplate(experience),
    addSkills: Array.from(new Set(addSkills))
  };
}

export function ResumePage() {
  const [targetRole, setTargetRole] = useState("Java Developer");
  const [experience, setExperience] = useState(0);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("Name\nEmail\nSkills: Java, Git, HTML\nProjects: Student portal project using Java\nEducation: B.Tech in Computer Science");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Upload a resume or paste resume text, then analyze it.");

  const recommendedTemplate = useMemo(() => {
    const code = analysis?.recommendedTemplate ?? getRecommendedTemplate(experience);
    return templateCatalog.find((template) => template.code === code) ?? templateCatalog[0];
  }, [analysis, experience]);

  async function handleAnalyze() {
    setIsAnalyzing(true);
    setStatusMessage("Reading resume and generating analysis...");

    let extracted = resumeText.trim();
    if (resumeFile) {
      try {
        const fileText = await resumeFile.text();
        if (fileText.trim().length > 40) {
          extracted = fileText;
        }
      } catch {
      }
    }

    if (!extracted) {
      extracted = buildFallbackResumeText(targetRole, experience, resumeFile?.name);
    }

    const result = analyzeResumeText(extracted, targetRole, experience);
    setAnalysis(result);
    setIsAnalyzing(false);
    setStatusMessage(`Analysis ready. ATS score: ${result.atsScore}/100 for ${targetRole}.`);
  }

  return (
    <div className="page">
      <div className="two-column">
        <SectionCard title="Resume Analyzer">
          <div className="form">
            <label>
              Target role
              <select value={targetRole} onChange={(event) => setTargetRole(event.target.value)}>
                {Object.keys(roleSkillMap).map((role) => <option key={role}>{role}</option>)}
              </select>
            </label>
            <label>
              Years of experience
              <input type="number" min="0" max="20" value={experience} onChange={(event) => setExperience(Number(event.target.value))} />
            </label>
            <label>
              Upload resume
              <input type="file" accept=".txt,.pdf,.doc,.docx" onChange={(event) => setResumeFile(event.target.files?.[0] ?? null)} />
            </label>
            {resumeFile && <p className="muted">Selected file: {resumeFile.name}</p>}
            <label>
              Resume text
              <textarea
                className="text-area"
                rows={12}
                value={resumeText}
                onChange={(event) => setResumeText(event.target.value)}
                placeholder="Paste your resume text here for richer analysis. Upload works best for text-readable files."
              />
            </label>
            <button type="button" onClick={handleAnalyze}>{isAnalyzing ? "Analyzing..." : "Analyze resume"}</button>
            <div className="status-banner">
              <strong>Status:</strong> <span>{statusMessage}</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Template Recommendation">
          <div className="template-highlight">
            <p className="eyebrow">Recommended template</p>
            <h3>{recommendedTemplate.name}</h3>
            <p className="muted">{recommendedTemplate.pitch}</p>
            <div className="chip-row">
              <span className="pill">Best for {recommendedTemplate.audience}</span>
              <span className="pill">Role-aware layout</span>
              <span className="pill">ATS friendly</span>
            </div>
          </div>
          <div className="list-stack">
            {recommendedTemplate.strengths.map((item) => (
              <div key={item} className="list-item compact"><span>{item}</span></div>
            ))}
          </div>
        </SectionCard>
      </div>

      {analysis && (
        <>
          <div className="stats-grid">
            <StatCard label="ATS score" value={`${analysis.atsScore}/100`} hint="Estimated fit for the selected role" />
            <StatCard label="Missing skills" value={analysis.missingSkills.length} hint="Role-specific keywords not found" />
            <StatCard label="Missing sections" value={analysis.missingSections.length} hint="Important ATS sections to add" />
            <StatCard label="Recommended template" value={recommendedTemplate.name} hint="Best resume structure for your profile" />
          </div>

          <div className="two-column">
            <SectionCard title="AI-style analysis summary">
              <div className="list-stack">
                <div className="list-item column-start">
                  <strong>Uploaded resume</strong>
                  <span className="muted">{resumeFile?.name ?? "Pasted resume text"}</span>
                </div>
                <div className="list-item column-start">
                  <strong>Extracted preview</strong>
                  <span className="muted">{analysis.extractedPreview || "No readable text extracted. Paste resume text for a deeper scan."}</span>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="What to improve next">
              <div className="list-stack">
                {analysis.suggestions.map((item) => (
                  <div key={item} className="list-item compact"><span>{item}</span></div>
                ))}
              </div>
            </SectionCard>
          </div>

          <div className="two-column">
            <SectionCard title="Missing skills and sections">
              <div className="resume-grid">
                <div>
                  <p className="eyebrow">Add these skills</p>
                  <div className="chip-row">
                    {(analysis.addSkills.length ? analysis.addSkills : ["Your resume already includes many core skills"]).map((item) => (
                      <span key={item} className="pill">{item}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="eyebrow">Missing sections</p>
                  <div className="chip-row">
                    {(analysis.missingSections.length ? analysis.missingSections : ["Core sections are present"]).map((item) => (
                      <span key={item} className="pill">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Resume strengths">
              <div className="list-stack">
                {analysis.strengths.map((item) => (
                  <div key={item} className="list-item compact"><span>{item}</span></div>
                ))}
              </div>
            </SectionCard>
          </div>
        </>
      )}

      <PlanGate plan="Premium">
        <p className="muted">Next upgrade path: full resume builder, editable ATS templates, export to PDF, role-based bullet rewriting, and real AI parsing through the backend.</p>
      </PlanGate>
    </div>
  );
}