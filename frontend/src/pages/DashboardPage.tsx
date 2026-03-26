import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ActivityFeed, type ActivityItem } from "../components/ActivityFeed";
import { SectionCard, StatCard } from "../components/Cards";
import { TestimonialFeed } from "../components/TestimonialFeed";
import { api } from "../services/api";
import type { ProgressSummary, Roadmap, TaskItem, TestimonialItem } from "../types";

function FlameIcon() {
  return <span aria-hidden="true">ST</span>;
}

function BoltIcon() {
  return <span aria-hidden="true">XP</span>;
}

function TargetIcon() {
  return <span aria-hidden="true">LV</span>;
}

function TrophyIcon() {
  return <span aria-hidden="true">GO</span>;
}

function getMilestone(progressPercent: number) {
  if (progressPercent >= 100) return "Job Ready milestone unlocked";
  if (progressPercent >= 75) return "Portfolio-ready checkpoint";
  if (progressPercent >= 50) return "Intermediate momentum";
  return "Foundation streak in progress";
}

function getNextMilestone(progressPercent: number) {
  if (progressPercent < 50) return "Reach 50% to unlock Intermediate milestone";
  if (progressPercent < 75) return "Reach 75% to unlock Portfolio checkpoint";
  if (progressPercent < 100) return "Reach 100% to become Job Ready";
  return "All milestones achieved";
}

function getProfileStrength(progress: ProgressSummary | null) {
  const percent = progress?.progressPercent ?? 0;
  if (percent >= 80) return "High recruiter confidence";
  if (percent >= 55) return "Growth profile gaining trust";
  return "Early-stage profile building";
}

function getReadinessNarrative(progress: ProgressSummary | null) {
  const streak = progress?.currentStreak ?? 0;
  if (streak >= 14) return "Consistency is becoming part of your identity.";
  if (streak >= 7) return "Your learning rhythm is now visible and trackable.";
  return "A few more verified sessions will strengthen your profile quickly.";
}

// Activity feed is derived from dashboard state so the UI feels alive without adding a separate data dependency.
function buildActivityFeed(tasks: TaskItem[], roadmap: Roadmap | null, progress: ProgressSummary | null): ActivityItem[] {
  return [
    {
      id: "activity-1",
      title: "Roadmap synced",
      detail: roadmap ? `${roadmap.goal} plan is active across ${roadmap.timelineWeeks} weeks.` : "Your roadmap is ready to activate.",
      time: "just now"
    },
    {
      id: "activity-2",
      title: "Consistency streak",
      detail: `You are currently on a ${progress?.currentStreak ?? 0}-day learning streak.`,
      time: "today"
    },
    ...tasks.slice(0, 3).map((task, index) => ({
      id: `activity-task-${task.taskId}`,
      title: task.status === "COMPLETED" ? "Task verified" : "Task available",
      detail: `${task.title} | reward ${task.xpPoints} XP`,
      time: index === 0 ? "2 min ago" : `${index + 1} hr ago`
    }))
  ];
}

export function DashboardPage() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [progress, setProgress] = useState<ProgressSummary | null>(null);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [xpPulse, setXpPulse] = useState<number | null>(null);

  useEffect(() => {
    api.getRoadmap().then(setRoadmap);
    api.getProgressSummary().then((data) => {
      setProgress(data);
      setTasks(data.todaysTasks);
    });
    api.getTestimonials().then(setTestimonials);
  }, []);

  const progressPercent = progress?.progressPercent ?? 0;
  const milestone = getMilestone(progressPercent);
  const nextMilestone = getNextMilestone(progressPercent);
  const completedTasks = tasks.filter((task) => task.status === "COMPLETED").length;
  const activityItems = useMemo(() => buildActivityFeed(tasks, roadmap, progress), [tasks, roadmap, progress]);
  const profileStrength = getProfileStrength(progress);
  const readinessNarrative = getReadinessNarrative(progress);
  const roadmapWeeks = roadmap?.weeklyPlan.slice(0, 3) ?? [];

  async function handleCompleteTask(taskId: number) {
    const task = tasks.find((item) => item.taskId === taskId);
    if (!task || task.status === "COMPLETED") return;

    await api.completeTask(taskId);

    setTasks((current) => current.map((item) => item.taskId === taskId ? { ...item, status: "COMPLETED" } : item));
    setProgress((current) => current ? {
      ...current,
      points: current.points + task.xpPoints,
      progressPercent: Math.min(100, current.progressPercent + 8),
      todaysTasks: current.todaysTasks.map((item) => item.taskId === taskId ? { ...item, status: "COMPLETED" } : item)
    } : current);
    setXpPulse(task.xpPoints);
    window.setTimeout(() => setXpPulse(null), 1400);
  }

  return (
    <div className="page dashboard-page">
      <header className="hero dashboard-hero dashboard-hero-premium">
        <div className="hero-copy">
          <p className="eyebrow">Career Operating System</p>
          <h2>Build a verified path to {roadmap?.goal ?? "your target role"}</h2>
          <p className="muted">
            MyJobMate organizes free resources into a structured roadmap, tracks real activity, and turns every verified action into a stronger career profile.
          </p>

          <div className="hero-progress-panel">
            <div className="hero-progress-copy">
              <strong>{progressPercent}% profile progress</strong>
              <span>{milestone}</span>
            </div>
            <div className="hero-progress-track">
              <div className="hero-progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="hero-milestone-note">Next up: {nextMilestone}</p>
          </div>

          <div className="hero-cta-row">
            <Link to="/onboarding" className="hero-cta-primary">Build my roadmap</Link>
            <Link to="/resume" className="hero-cta-secondary">Analyze my resume</Link>
          </div>
        </div>

        <div className="hero-sidekick hero-sidekick-premium">
          <div className="hero-sidekick-card hero-focus-card">
            <span className="eyebrow">Today's focus</span>
            <strong>{completedTasks}/{tasks.length || 0} tasks verified</strong>
            <p>{tasks[0]?.title ?? "Pick your first task to begin."}</p>
            <div className="hero-focus-reward">Next reward: +{tasks[0]?.xpPoints ?? 15} XP</div>
          </div>

          <div className="hero-mini-panels">
            <div className="hero-mini-panel">
              <span className="eyebrow">Profile strength</span>
              <strong>{profileStrength}</strong>
            </div>
            <div className="hero-mini-panel">
              <span className="eyebrow">Consistency signal</span>
              <strong>{readinessNarrative}</strong>
            </div>
          </div>

          <div className={`xp-burst ${xpPulse ? "show" : ""}`}>{xpPulse ? `+${xpPulse} XP` : "+0 XP"}</div>
        </div>
      </header>

      <section className="trust-strip">
        <div className="trust-strip-card">
          <span className="eyebrow">Structured growth</span>
          <strong>{roadmap?.timelineWeeks ?? 12} week roadmap</strong>
          <p>Built around your goal, time, and current level.</p>
        </div>
        <div className="trust-strip-card">
          <span className="eyebrow">Verified momentum</span>
          <strong>{progress?.currentStreak ?? 0} day streak</strong>
          <p>Progress should come from real actions, not fake checkmarks.</p>
        </div>
        <div className="trust-strip-card">
          <span className="eyebrow">Career profile</span>
          <strong>{progress?.level ?? 1} profile level</strong>
          <p>Your profile grows with tasks, projects, and consistency.</p>
        </div>
        <div className="trust-strip-card">
          <span className="eyebrow">Interview readiness</span>
          <strong>{progressPercent}% progress</strong>
          <p>A clearer signal of how close you are to role readiness.</p>
        </div>
      </section>

      <section className="dashboard-story-grid">
        <SectionCard title="From random learning to guided execution">
          <div className="transformation-grid">
            <div className="transformation-card before">
              <span className="eyebrow">Before</span>
              <strong>Scattered effort</strong>
              <p>Jumping between videos, notes, and tutorials without knowing what matters most.</p>
            </div>
            <div className="transformation-arrow">&rarr;</div>
            <div className="transformation-card after">
              <span className="eyebrow">After</span>
              <strong>Structured momentum</strong>
              <p>One roadmap, one tracker, one evolving career profile built from verified learning.</p>
            </div>
          </div>

          <div className="how-it-works-grid">
            <div className="how-it-works-step">
              <span>01</span>
              <strong>Choose your target role</strong>
              <p>Set your goal, timeline, and available study time.</p>
            </div>
            <div className="how-it-works-step">
              <span>02</span>
              <strong>Follow a guided roadmap</strong>
              <p>Learn with organized free resources instead of random browsing.</p>
            </div>
            <div className="how-it-works-step">
              <span>03</span>
              <strong>Earn real progression</strong>
              <p>XP, streak, and level should come from meaningful verified activity.</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Career profile preview">
          <div className="profile-preview-card">
            <div className="profile-preview-head">
              <div>
                <p className="eyebrow">Dynamic learner profile</p>
                <h3>{roadmap?.goal ?? "Target role profile"}</h3>
              </div>
              <span className="profile-preview-status">{profileStrength}</span>
            </div>

            <div className="profile-preview-stats">
              <div>
                <span>Level</span>
                <strong>{progress?.level ?? 1}</strong>
              </div>
              <div>
                <span>XP</span>
                <strong>{progress?.points ?? 0}</strong>
              </div>
              <div>
                <span>Streak</span>
                <strong>{progress?.currentStreak ?? 0} days</strong>
              </div>
              <div>
                <span>Readiness</span>
                <strong>{progressPercent}%</strong>
              </div>
            </div>

            <div className="profile-preview-signals">
              <div className="profile-signal">
                <strong>Verified tasks</strong>
                <p>{completedTasks} completed today are strengthening your consistency score.</p>
              </div>
              <div className="profile-signal">
                <strong>Skill signals</strong>
                <p>Roadmap milestones, resume quality, and projects will shape recruiter trust later.</p>
              </div>
            </div>
          </div>
        </SectionCard>
      </section>

      <div className="stats-grid dashboard-stats-grid">
        <StatCard label="Streak" value={progress?.currentStreak ?? 0} hint="Daily consistency verified" icon={<FlameIcon />} tone="rose" />
        <StatCard label="XP" value={progress?.points ?? 0} hint="Reward earned from completed actions" icon={<BoltIcon />} tone="amber" />
        <StatCard label="Level" value={progress?.level ?? 1} hint="Progression tied to real activity" icon={<TargetIcon />} tone="violet" />
        <StatCard label="Milestone" value={`${progressPercent}%`} hint="Roadmap advancement progress" icon={<TrophyIcon />} tone="teal" />
      </div>

      <div className="dashboard-main-grid dashboard-main-grid-priority">
        <SectionCard title="Today's tasks">
          <div className="task-list">
            {tasks.map((task) => (
              <div key={task.taskId} className={`task-card ${task.status === "COMPLETED" ? "done" : ""}`}>
                <div className="task-card-left">
                  <div className={`task-check ${task.status === "COMPLETED" ? "done" : ""}`}>{task.status === "COMPLETED" ? "Done" : ""}</div>
                  <div>
                    <strong>{task.title}</strong>
                    <p>{task.sourceType} | reward {task.xpPoints} XP</p>
                  </div>
                </div>
                <button type="button" className={`task-reward ${task.status === "COMPLETED" ? "claimed" : ""}`} onClick={() => handleCompleteTask(task.taskId)}>
                  {task.status === "COMPLETED" ? "Reward claimed" : `Mark complete +${task.xpPoints} XP`}
                </button>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Current roadmap focus">
          <div className="roadmap-focus-list roadmap-focus-list-premium">
            {roadmapWeeks.map((week, index) => (
              <div key={week.weekNumber} className="roadmap-focus-card roadmap-focus-card-premium">
                <span className="roadmap-focus-badge">Week {week.weekNumber}</span>
                <strong>{week.title}</strong>
                <p>{week.objective}</p>
                <div className="chip-row">
                  {week.topics.slice(0, 3).map((topic) => (
                    <span key={topic.topicId} className="roadmap-focus-chip">{topic.name}</span>
                  ))}
                </div>
                <span className="roadmap-focus-order">0{index + 1}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <section className="momentum-editorial">
        <div className="momentum-editorial-intro">
          <p className="eyebrow">Proof of progress</p>
          <h2>Real learner activity should look alive, clear, and trustworthy.</h2>
          <p className="muted">MyJobMate works when activity, structure, and trust signals feel visible without looking repetitive or box-heavy.</p>
        </div>

        <div className="momentum-editorial-grid">
          <div className="activity-column-shell">
            <div className="activity-column-head">
              <span className="momentum-dot"></span>
              <div>
                <strong>Live activity</strong>
                <p className="muted">Verified actions, roadmap syncs, and learning momentum.</p>
              </div>
            </div>
            <ActivityFeed items={activityItems} />
          </div>

          <div className="value-column-shell">
            <div className="value-column-head">
              <p className="eyebrow">Why learners stay with MyJobMate</p>
              <h3>Not because of more content. Because the journey finally feels structured.</h3>
            </div>

            <div className="value-stack-list">
              <article className="value-stack-item primary">
                <span>01</span>
                <div>
                  <strong>Organized free resources</strong>
                  <p>We do not sell content. We structure what is already available and make it usable.</p>
                </div>
              </article>
              <article className="value-stack-item">
                <span>02</span>
                <div>
                  <strong>Meaningful progression</strong>
                  <p>XP, streak, and level should reflect effort, not button clicks.</p>
                </div>
              </article>
              <article className="value-stack-item">
                <span>03</span>
                <div>
                  <strong>Recruiter-ready signal</strong>
                  <p>Your profile should become more trustworthy as your verified activity increases.</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-recruiter-band">
        <div>
          <p className="eyebrow">Built for trust</p>
          <h3>Designed for learner growth today and recruiter confidence tomorrow.</h3>
        </div>
        <div className="recruiter-band-points">
          <span>Verified task completion</span>
          <span>Consistency and streak signals</span>
          <span>Skill and readiness progression</span>
          <span>Resume and project quality indicators</span>
        </div>
      </section>

      <section className="testimonial-showcase">
        <div className="testimonial-showcase-head">
          <p className="eyebrow">Trust through real progress</p>
          <h2>What learners are saying</h2>
          <p className="muted">Real stories from learners who found more clarity, structure, and momentum in their career journey.</p>
        </div>
        <TestimonialFeed testimonials={testimonials} />
      </section>
    </div>
  );
}




