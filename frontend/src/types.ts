export type WeekTopic = {
  topicId: number;
  topicKey: string;
  name: string;
  description: string;
  practiceTask: string;
  projectTask: string;
};

export type WeekPlan = {
  weekNumber: number;
  title: string;
  objective: string;
  topics: WeekTopic[];
  moduleTitle?: string;
};

export type Roadmap = {
  roadmapId: number;
  goal: string;
  currentLevel: string;
  timelineWeeks: number;
  weeklyPlan: WeekPlan[];
};

export type ResourceItem = {
  id: number;
  topicKey: string;
  type: string;
  title: string;
  url: string;
  language: string;
  tutorStyle: string;
  difficulty: string;
  durationMinutes: number;
  provider: string;
};

export type TaskItem = {
  taskId: number;
  title: string;
  sourceType: string;
  status: string;
  xpPoints: number;
};

export type ProgressSummary = {
  progressPercent: number;
  completedTopics: number;
  totalTopics: number;
  currentStreak: number;
  points: number;
  level: number;
  todaysTasks: TaskItem[];
};
export type TestimonialItem = {
  id: number;
  userName: string;
  city: string;
  feedbackText: string;
  createdAt: string;
};