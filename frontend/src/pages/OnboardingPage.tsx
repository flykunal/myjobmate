import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionCard } from "../components/Cards";
import { api } from "../services/api";
import type { Roadmap } from "../types";

export function OnboardingPage() {
  const navigate = useNavigate();
  const [goal, setGoal] = useState("Java Developer");
  const [level, setLevel] = useState("BEGINNER");
  const [minutes, setMinutes] = useState(90);
  const [timeline, setTimeline] = useState(12);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsGenerating(true);
    const generated = await api.generateRoadmap({
      goal,
      currentLevel: level,
      dailyMinutes: minutes,
      targetTimelineWeeks: timeline,
      knownSkills: ["Git"],
      preferredLanguage: "ENGLISH",
      tutorPreference: "BALANCED"
    });
    setRoadmap(generated);
    setIsGenerating(false);
  }

  return (
    <div className="page two-column">
      <SectionCard title="Career onboarding">
        <form className="form" onSubmit={handleSubmit}>
          <label>Goal<input value={goal} onChange={(e) => setGoal(e.target.value)} /></label>
          <label>Current level<select value={level} onChange={(e) => setLevel(e.target.value)}><option>BEGINNER</option><option>INTERMEDIATE</option><option>ADVANCED</option></select></label>
          <label>Daily minutes<input type="number" min="30" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} /></label>
          <label>Timeline weeks<input type="number" min="4" max="24" value={timeline} onChange={(e) => setTimeline(Number(e.target.value))} /></label>
          <button type="submit">{isGenerating ? "Generating..." : "Generate roadmap"}</button>
        </form>
      </SectionCard>
      <SectionCard title="Generated preview">
        {roadmap ? (
          <>
            <p className="muted">Your roadmap is ready with {roadmap.timelineWeeks} weeks and {roadmap.weeklyPlan.reduce((total, week) => total + week.topics.length, 0)} guided topics.</p>
            {roadmap.weeklyPlan.slice(0, 4).map((week) => (
              <div key={week.weekNumber} className="timeline-item"><strong>{week.title}</strong><p>{week.objective}</p></div>
            ))}
            <button type="button" onClick={() => navigate("/roadmap")}>Open full roadmap</button>
          </>
        ) : <p className="muted">Generate a roadmap to preview your weekly learning path.</p>}
      </SectionCard>
    </div>
  );
}