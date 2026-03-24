import { useEffect, useMemo, useState } from "react";
import { SectionCard } from "../components/Cards";
import { api } from "../services/api";
import type { Roadmap } from "../types";

type StepStatus = "not_started" | "in_progress" | "completed";
type ViewMode = "module" | "weekly";

type RoadmapStep = {
  id: string;
  weekNumber: number;
  title: string;
  objective: string;
  topics: string[];
  moduleTitle: string;
};

type RoadmapModule = {
  title: string;
  steps: RoadmapStep[];
};

const statusStorageKey = "myjobmate.roadmap-statuses";
const expandedStorageKey = "myjobmate.roadmap-expanded";

function buildModuleTitle(index: number, total: number, goal: string) {
  const ratio = (index + 1) / Math.max(total, 1);
  if (ratio <= 0.25) return `${goal} Foundation`;
  if (ratio <= 0.55) return `${goal} Core Concepts`;
  if (ratio <= 0.8) return `${goal} Frameworks and Practice`;
  return `${goal} Projects and Job Readiness`;
}

function toSteps(roadmap: Roadmap): RoadmapStep[] {
  return roadmap.weeklyPlan.map((week, index) => ({
    id: `week-${week.weekNumber}`,
    weekNumber: week.weekNumber,
    title: week.title,
    objective: week.objective,
    topics: week.topics.map((topic) => topic.name),
    moduleTitle: week.moduleTitle ?? buildModuleTitle(index, roadmap.weeklyPlan.length, roadmap.goal)
  }));
}

function groupByModule(steps: RoadmapStep[]): RoadmapModule[] {
  return steps.reduce<RoadmapModule[]>((modules, step) => {
    const existing = modules.find((module) => module.title === step.moduleTitle);
    if (existing) {
      existing.steps.push(step);
      return modules;
    }
    modules.push({ title: step.moduleTitle, steps: [step] });
    return modules;
  }, []);
}

function loadStatuses(steps: RoadmapStep[]): Record<string, StepStatus> {
  const raw = window.localStorage.getItem(statusStorageKey);
  const fallback = Object.fromEntries(steps.map((step, index) => [step.id, index === 0 ? "in_progress" : "not_started"])) as Record<string, StepStatus>;

  if (!raw) return fallback;

  try {
    return { ...fallback, ...(JSON.parse(raw) as Record<string, StepStatus>) };
  } catch {
    return fallback;
  }
}

function loadExpanded(steps: RoadmapStep[]): string | null {
  const raw = window.localStorage.getItem(expandedStorageKey);
  return raw && steps.some((step) => step.id === raw) ? raw : steps[0]?.id ?? null;
}

function getMilestone(progressPercent: number) {
  if (progressPercent >= 100) return "Job Ready";
  if (progressPercent >= 50) return "Intermediate Level";
  if (progressPercent >= 25) return "Foundation Complete";
  return "Getting Started";
}

function ensureActiveProgress(statuses: Record<string, StepStatus>, orderedSteps: RoadmapStep[]): Record<string, StepStatus> {
  const hasInProgress = Object.values(statuses).includes("in_progress");
  if (hasInProgress) return statuses;

  const nextStep = orderedSteps.find((step) => statuses[step.id] !== "completed");
  if (!nextStep) return statuses;

  return { ...statuses, [nextStep.id]: "in_progress" };
}

function buildStatusMap(stepId: string, nextStatus: StepStatus, steps: RoadmapStep[], current: Record<string, StepStatus>): Record<string, StepStatus> {
  const updated = { ...current, [stepId]: nextStatus };
  const orderedIds = steps.map((step) => step.id);
  const currentIndex = orderedIds.indexOf(stepId);

  if (nextStatus === "completed") {
    const nextStepId = orderedIds[currentIndex + 1];
    if (nextStepId && updated[nextStepId] === "not_started") {
      updated[nextStepId] = "in_progress";
    }
  }

  return ensureActiveProgress(updated, steps);
}

function renderWeekLabel(step: RoadmapStep, mode: ViewMode) {
  return mode === "weekly" ? `Week ${step.weekNumber}` : `Step ${step.weekNumber}`;
}

export function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("module");
  const [expandedStepId, setExpandedStepId] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, StepStatus>>({});

  useEffect(() => {
    api.getRoadmap().then((data) => {
      setRoadmap(data);
      const steps = toSteps(data);
      setStatuses(loadStatuses(steps));
      setExpandedStepId(loadExpanded(steps));
    });
  }, []);

  const steps = useMemo(() => (roadmap ? toSteps(roadmap) : []), [roadmap]);
  const modules = useMemo(() => groupByModule(steps), [steps]);
  const totalSteps = steps.length;
  const completedSteps = steps.filter((step) => statuses[step.id] === "completed").length;
  const progressPercent = totalSteps ? Math.round((completedSteps / totalSteps) * 100) : 0;
  const milestone = getMilestone(progressPercent);
  const activeStepId = steps.find((step) => statuses[step.id] === "in_progress")?.id ?? steps.find((step) => statuses[step.id] !== "completed")?.id ?? null;

  useEffect(() => {
    if (!steps.length) return;
    const safeStatuses = ensureActiveProgress(statuses, steps);
    setStatuses((current) => (JSON.stringify(current) === JSON.stringify(safeStatuses) ? current : safeStatuses));
  }, [steps]);

  useEffect(() => {
    if (Object.keys(statuses).length) {
      window.localStorage.setItem(statusStorageKey, JSON.stringify(statuses));
    }
  }, [statuses]);

  useEffect(() => {
    if (expandedStepId) {
      window.localStorage.setItem(expandedStorageKey, expandedStepId);
    }
  }, [expandedStepId]);

  function handleExpand(stepId: string) {
    setExpandedStepId((current) => (current === stepId ? null : stepId));
  }

  function handleStatusChange(stepId: string, nextStatus: StepStatus) {
    setStatuses((current) => buildStatusMap(stepId, nextStatus, steps, current));
  }

  function renderStep(step: RoadmapStep, mode: ViewMode) {
    const status = statuses[step.id] ?? "not_started";
    const isExpanded = expandedStepId === step.id;
    const isActive = activeStepId === step.id;

    return (
      <div key={step.id} className="roadmap-node">
        <div className={`roadmap-connector ${status}`} />
        <article className={`roadmap-step-card ${status} ${isActive ? "active" : ""}`}>
          <button type="button" className="roadmap-step-button" onClick={() => handleExpand(step.id)}>
            <div className="roadmap-step-top">
              <span className="pill roadmap-week-pill">{renderWeekLabel(step, mode)}</span>
              <span className={`roadmap-status-badge ${status}`}>{status.replace("_", " ")}</span>
            </div>
            <div className="roadmap-step-heading">
              <div>
                <h3>{step.title}</h3>
                <p className="muted">{step.objective}</p>
              </div>
              <span className={`roadmap-expand ${isExpanded ? "open" : ""}`}>v</span>
            </div>
          </button>

          <div className={`roadmap-step-content ${isExpanded ? "open" : ""}`}>
            <div className="chip-row roadmap-topic-list">
              {step.topics.map((topic) => (
                <span key={topic} className="pill roadmap-topic-pill">{topic}</span>
              ))}
            </div>
            <div className="roadmap-step-actions">
              <button type="button" className="roadmap-action neutral" onClick={() => handleStatusChange(step.id, "not_started")}>Not Started</button>
              <button type="button" className="roadmap-action progress" onClick={() => handleStatusChange(step.id, "in_progress")}>In Progress</button>
              <button type="button" className="roadmap-action success" onClick={() => handleStatusChange(step.id, "completed")}>Mark Completed</button>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="page">
      <SectionCard title="Career roadmap timeline">
        {roadmap ? (
          <div className="roadmap-layout">
            <div className="roadmap-toolbar">
              <div>
                <p className="muted">{roadmap.goal} roadmap for {roadmap.currentLevel.toLowerCase()} learners across {roadmap.timelineWeeks} weeks.</p>
                <div className="roadmap-milestones">
                  <span className={`roadmap-milestone ${progressPercent >= 25 ? "hit" : ""}`}>25% Foundation Complete</span>
                  <span className={`roadmap-milestone ${progressPercent >= 50 ? "hit" : ""}`}>50% Intermediate Level</span>
                  <span className={`roadmap-milestone ${progressPercent >= 100 ? "hit" : ""}`}>100% Job Ready</span>
                </div>
              </div>
              <button type="button" onClick={() => setViewMode((current) => current === "module" ? "weekly" : "module")}>{viewMode === "module" ? "Switch to Weekly View" : "Switch to Module View"}</button>
            </div>

            <div className="roadmap-progress-panel">
              <div className="roadmap-progress-copy">
                <strong>{progressPercent}% Complete</strong>
                <span className="muted">{completedSteps} of {totalSteps} steps completed - {milestone}</span>
              </div>
              <div className="roadmap-progress-track">
                <div className="roadmap-progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            {viewMode === "module" ? (
              <div className="roadmap-module-list">
                {modules.map((module) => (
                  <section key={module.title} className="roadmap-module-block">
                    <div className="roadmap-module-header">
                      <p className="eyebrow">Module</p>
                      <h3>{module.title}</h3>
                    </div>
                    <div className="roadmap-timeline">
                      {module.steps.map((step) => renderStep(step, viewMode))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="roadmap-module-block">
                <div className="roadmap-module-header">
                  <p className="eyebrow">Weekly Plan</p>
                  <h3>Weekly learning breakdown</h3>
                </div>
                <div className="roadmap-timeline">
                  {steps.map((step) => renderStep(step, viewMode))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="muted">No roadmap available yet. Generate one from the onboarding page.</p>
        )}
      </SectionCard>
    </div>
  );
}