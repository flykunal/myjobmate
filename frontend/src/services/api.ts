import type { ProgressSummary, ResourceItem, Roadmap } from "../types";

const jsonHeaders = { "Content-Type": "application/json" };
const roadmapStorageKey = "myjobmate.activeRoadmap";

function clampTimeline(value: number) {
  return Math.max(4, Math.min(24, value));
}

function toTitleCase(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function normalizeGoal(goal: string) {
  return goal.trim() || "Career Goal";
}

function buildLocalRoadmap(body?: Record<string, unknown>): Roadmap {
  const goal = normalizeGoal(String(body?.goal ?? "Java Developer"));
  const currentLevel = String(body?.currentLevel ?? "BEGINNER");
  const dailyMinutes = Number(body?.dailyMinutes ?? 90);
  const timelineWeeks = clampTimeline(Number(body?.targetTimelineWeeks ?? 8));
  const slug = goal.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const stageNames = [
    "Foundation Sprint",
    "Core Concepts",
    "Hands-On Practice",
    "Project Build",
    "Real-World Workflow",
    "Interview Readiness",
    "Portfolio Upgrade",
    "Job Preparation"
  ];

  const weeklyPlan = Array.from({ length: timelineWeeks }, (_, index) => {
    const weekNumber = index + 1;
    const stage = stageNames[index % stageNames.length];
    const studyHours = Math.max(4, Math.round((dailyMinutes * 7) / 60));

    return {
      weekNumber,
      title: `Week ${weekNumber} - ${goal} ${stage}`,
      objective: `Spend about ${studyHours} focused hours this week building ${goal} skills with a ${currentLevel.toLowerCase()} learning path.`,
      topics: [
        {
          topicId: weekNumber * 10 + 1,
          topicKey: `${slug}-core-w${weekNumber}`,
          name: `${toTitleCase(goal)} Core ${weekNumber}`,
          description: `Learn the must-know concepts for ${goal} and understand how they fit into real job workflows.`,
          practiceTask: `Complete 2 guided practice tasks for week ${weekNumber}.`,
          projectTask: `Add one visible feature milestone to your ${goal} project.`
        },
        {
          topicId: weekNumber * 10 + 2,
          topicKey: `${slug}-applied-w${weekNumber}`,
          name: `${toTitleCase(goal)} Applied Practice ${weekNumber}`,
          description: `Turn theory into action with exercises, debugging, revision, and mini deliverables.`,
          practiceTask: `Solve one practical assignment and write short learning notes.`,
          projectTask: `Refine your project and prepare a short explanation of what you built.`
        }
      ]
    };
  });

  return {
    roadmapId: Date.now(),
    goal,
    currentLevel,
    timelineWeeks,
    weeklyPlan
  };
}

function saveRoadmap(roadmap: Roadmap) {
  localStorage.setItem(roadmapStorageKey, JSON.stringify(roadmap));
}

function loadSavedRoadmap(): Roadmap | null {
  const raw = localStorage.getItem(roadmapStorageKey);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as Roadmap;
  } catch {
    localStorage.removeItem(roadmapStorageKey);
    return null;
  }
}

async function read<T>(input: RequestInfo, init?: RequestInit, fallback?: T): Promise<T> {
  try {
    const response = await fetch(input, init);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const payload = await response.json();
    return payload.data as T;
  } catch (error) {
    if (fallback !== undefined) {
      return fallback;
    }
    throw error;
  }
}

const fallbackRoadmap: Roadmap = loadSavedRoadmap() ?? buildLocalRoadmap();

const fallbackProgress: ProgressSummary = {
  progressPercent: 38,
  completedTopics: 3,
  totalTopics: 16,
  currentStreak: 4,
  points: 110,
  level: 2,
  todaysTasks: [
    { taskId: 1, title: "Complete Java collections revision", sourceType: "ROADMAP_TOPIC", status: "PENDING", xpPoints: 20 },
    { taskId: 2, title: "Watch one curated backend design video", sourceType: "RESOURCE", status: "PENDING", xpPoints: 10 }
  ]
};

const fallbackResources: ResourceItem[] = [
  {
    id: 1,
    topicKey: "java-developer-core-w1",
    type: "YOUTUBE",
    title: "Java Roadmap Crash Course",
    url: "https://youtube.com/watch?v=java-roadmap",
    language: "ENGLISH",
    tutorStyle: "BALANCED",
    difficulty: "BEGINNER",
    durationMinutes: 45,
    provider: "YouTube"
  },
  {
    id: 2,
    topicKey: "java-developer-core-w1",
    type: "NOTE",
    title: "Java Foundations Notes",
    url: "https://example.com/java-foundations-notes",
    language: "ENGLISH",
    tutorStyle: "THEORY_FIRST",
    difficulty: "BEGINNER",
    durationMinutes: 20,
    provider: "MyJobMate"
  },
  {
    id: 3,
    topicKey: "java-developer-applied-w1",
    type: "PROJECT",
    title: "Student Record Manager Project",
    url: "https://example.com/student-record-manager",
    language: "ENGLISH",
    tutorStyle: "HANDS_ON",
    difficulty: "BEGINNER",
    durationMinutes: 120,
    provider: "MyJobMate"
  }
];

export const api = {
  async getRoadmap() {
    const saved = loadSavedRoadmap();
    return read<Roadmap>("/api/v1/roadmaps/me/active", undefined, saved ?? fallbackRoadmap);
  },
  async generateRoadmap(body: Record<string, unknown>) {
    const localRoadmap = buildLocalRoadmap(body);
    try {
      const generated = await read<Roadmap>("/api/v1/roadmaps/generate", {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify(body)
      });
      saveRoadmap(generated);
      return generated;
    } catch {
      saveRoadmap(localRoadmap);
      return localRoadmap;
    }
  },
  getProgressSummary: () => read<ProgressSummary>("/api/v1/progress/summary", undefined, fallbackProgress),
  getResources: () => read<ResourceItem[]>("/api/v1/resources", undefined, fallbackResources),
  getJobReadiness: () => read<Record<string, unknown>>("/api/v1/job-readiness/me", undefined, { score: 72, nextBestActions: ["Complete one backend project milestone", "Raise ATS score above 85", "Practice one technical interview set"] }),
  getSkillGap: () => read<Record<string, unknown>>("/api/v1/skill-gap/analyze", { method: "POST" }, { missingSkills: ["Spring Security", "Hibernate", "REST API testing"] })
};