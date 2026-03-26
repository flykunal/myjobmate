import { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionCard } from "../components/Cards";
import { api } from "../services/api";
import type { Roadmap } from "../types";

type PreviewNode = {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  topics: string[];
};

function toPreviewNodes(roadmap: Roadmap): PreviewNode[] {
  return roadmap.weeklyPlan.slice(0, 4).map((week, index) => ({
    id: `preview-${week.weekNumber}`,
    stepNumber: index + 1,
    title: week.title.replace(/^Week\s+\d+\s*-\s*/i, ""),
    subtitle: week.objective,
    topics: week.topics.map((topic) => topic.name).slice(0, 2)
  }));
}

function parseSkills(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function OnboardingPage() {
  const navigate = useNavigate();
  const [goal, setGoal] = useState("Java Developer");
  const [level, setLevel] = useState("BEGINNER");
  const [minutes, setMinutes] = useState(90);
  const [timeline, setTimeline] = useState(12);
  const [knownSkills, setKnownSkills] = useState("Git, HTML");
  const [preferredLanguage, setPreferredLanguage] = useState("ENGLISH");
  const [tutorPreference, setTutorPreference] = useState("BALANCED");
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const previewNodes = useMemo(() => (roadmap ? toPreviewNodes(roadmap) : []), [roadmap]);
  const totalTopics = roadmap?.weeklyPlan.reduce((total, week) => total + week.topics.length, 0) ?? 0;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsGenerating(true);
    const generated = await api.generateRoadmap({
      goal,
      currentLevel: level,
      dailyMinutes: minutes,
      targetTimelineWeeks: timeline,
      knownSkills: parseSkills(knownSkills),
      preferredLanguage,
      tutorPreference
    });
    setRoadmap(generated);
    setIsGenerating(false);
  }

  return (
    <div className="page two-column onboarding-layout">
      <SectionCard title="Career onboarding">
        <div className="smart-onboarding-shell">
          <div className="smart-onboarding-head">
            <p className="eyebrow">Guided career planner</p>
            <h3>Tell MyJobMate what you are targeting</h3>
            <p className="muted">Fill this like a smart career brief and we will shape your roadmap around your time, level, and current skills.</p>
          </div>

          <form className="smart-onboarding-form" onSubmit={handleSubmit}>
            <div className="smart-sentence-card">
              <span>I am targeting</span>
              <input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Java Developer" />
              <span>and currently I am at</span>
              <select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option>BEGINNER</option>
                <option>INTERMEDIATE</option>
                <option>ADVANCED</option>
              </select>
              <span>level.</span>
            </div>

            <div className="smart-sentence-card">
              <span>I can study</span>
              <input type="number" min="30" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} />
              <span>minutes daily and I want to finish it within</span>
              <input type="number" min="4" max="24" value={timeline} onChange={(e) => setTimeline(Number(e.target.value))} />
              <span>weeks.</span>
            </div>

            <div className="smart-sentence-card multiline">
              <span>I already know</span>
              <input value={knownSkills} onChange={(e) => setKnownSkills(e.target.value)} placeholder="Git, HTML, SQL" />
              <span>and I prefer learning in</span>
              <select value={preferredLanguage} onChange={(e) => setPreferredLanguage(e.target.value)}>
                <option value="ENGLISH">English</option>
                <option value="HINDI">Hindi</option>
                <option value="BILINGUAL">Bilingual</option>
              </select>
              <span>with a</span>
              <select value={tutorPreference} onChange={(e) => setTutorPreference(e.target.value)}>
                <option value="BALANCED">Balanced style</option>
                <option value="THEORY_FIRST">Theory-first style</option>
                <option value="HANDS_ON">Hands-on style</option>
              </select>
              <span>teaching approach.</span>
            </div>

            <div className="smart-onboarding-footer">
              <div className="smart-onboarding-hint">
                <strong>Smart inputs</strong>
                <span>Use role names, realistic timelines, and comma-separated skills for better roadmap quality.</span>
              </div>
              <button type="submit">{isGenerating ? "Generating..." : "Generate roadmap"}</button>
            </div>
          </form>
        </div>
      </SectionCard>

      <SectionCard title="Generated preview">
        {roadmap ? (
          <div className="compact-preview-shell">
            <div className="compact-preview-head">
              <div>
                <p className="eyebrow">Roadmap snapshot</p>
                <h3>{roadmap.goal}</h3>
                <p className="muted">A shorter preview of the path we generated from your inputs.</p>
              </div>
              <div className="compact-preview-metrics">
                <div className="compact-preview-metric">
                  <strong>{roadmap.timelineWeeks}</strong>
                  <span>Weeks</span>
                </div>
                <div className="compact-preview-metric">
                  <strong>{totalTopics}</strong>
                  <span>Topics</span>
                </div>
              </div>
            </div>

            <div className="compact-preview-story">
              <div className="compact-preview-line" />
              {previewNodes.map((node) => (
                <article key={node.id} className="compact-preview-card">
                  <div className="compact-preview-marker">{node.stepNumber}</div>
                  <div className="compact-preview-body">
                    <span className="compact-preview-step">Step {node.stepNumber}</span>
                    <h4>{node.title}</h4>
                    <p>{node.subtitle}</p>
                    <div className="compact-preview-topics">
                      {node.topics.map((topic) => (
                        <span key={topic} className="compact-preview-chip">{topic}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="compact-preview-footer">
              <p className="muted">This is a compact preview. Open the full roadmap to manage modules, progress, and steps.</p>
              <button type="button" onClick={() => navigate("/roadmap")}>Open full roadmap</button>
            </div>
          </div>
        ) : (
          <div className="compact-preview-empty">
            <p className="eyebrow">Roadmap preview</p>
            <h3>Your generated roadmap will appear here</h3>
            <p className="muted">Once you fill the planner and click generate, we’ll show a concise visual summary of the first roadmap steps.</p>
          </div>
        )}
      </SectionCard>
    </div>
  );
}