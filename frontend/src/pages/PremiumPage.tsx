import { PlanGate, SectionCard } from "../components/Cards";

const plans = [
  {
    name: "Free",
    price: "Rs 0",
    badge: "Start here",
    features: [
      "Personalized roadmap generation",
      "Progress tracking and daily tasks",
      "Basic readiness visibility",
      "Curated free resources"
    ]
  },
  {
    name: "Standard",
    price: "Rs 799 / month",
    badge: "Most practical",
    features: [
      "Resume analyzer and skill gap insights",
      "Language and tutor-style resource filters",
      "Stronger progress guidance",
      "Advanced readiness checkpoints"
    ]
  },
  {
    name: "Premium",
    price: "Rs 1499 / month",
    badge: "Career acceleration",
    features: [
      "AI mock interviews",
      "ATS-first resume builder",
      "Portfolio builder and expert booking",
      "Advanced job matching and profile growth tools"
    ]
  }
];

const premiumWorkflows = [
  {
    title: "AI Mock Interview",
    summary: "Role-based technical and HR sessions with rubric feedback and next-step guidance.",
    value: "Transforms practice into verified interview readiness signals."
  },
  {
    title: "Resume Builder",
    summary: "Create ATS-friendly resume versions tailored to role, experience, and target outcomes.",
    value: "Improves role fit without charging for content."
  },
  {
    title: "Portfolio Builder",
    summary: "Turn projects and milestones into a clean, shareable proof-of-work profile.",
    value: "Strengthens recruiter trust through visible output."
  },
  {
    title: "Expert Booking",
    summary: "Book targeted mentorship for resume, interviews, or roadmap review.",
    value: "Charges for guidance and accountability, not content access."
  },
  {
    title: "Advanced Job Matching",
    summary: "Role-based suggestions using verified readiness, skills, and profile strength.",
    value: "Connects progress signals to better opportunity discovery."
  }
];

const monetizationPrinciples = [
  "We organize and personalize free resources instead of locking learning behind content paywalls.",
  "Premium value comes from structure, tracking, profile building, and accountability.",
  "Verified growth signals create long-term value for both learners and recruiters."
];

export function PremiumPage() {
  return (
    <div className="page premium-page">
      <header className="hero premium-hero">
        <div>
          <p className="eyebrow">Premium career tools</p>
          <h2>Upgrade for deeper guidance, stronger profile signals, and faster career execution.</h2>
          <p className="muted">
            MyJobMate does not charge for content. Premium unlocks better structure, stronger analysis, guided practice, and trust-building workflows.
          </p>
        </div>
      </header>

      <section className="premium-plan-grid">
        {plans.map((plan) => (
          <article key={plan.name} className={`card premium-plan-card ${plan.name.toLowerCase()}`}>
            <span className="premium-plan-badge">{plan.badge}</span>
            <h3>{plan.name}</h3>
            <strong>{plan.price}</strong>
            <div className="premium-feature-list">
              {plan.features.map((feature) => (
                <div key={feature} className="premium-feature-item">{feature}</div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <SectionCard title="Premium workflows">
        <div className="topic-grid premium-workflow-grid">
          {premiumWorkflows.map((module) => (
            <PlanGate key={module.title} plan="Premium">
              <div className="premium-workflow-card">
                <h3>{module.title}</h3>
                <p>{module.summary}</p>
                <span>{module.value}</span>
              </div>
            </PlanGate>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Why premium fits the product vision">
        <div className="value-points-list">
          {monetizationPrinciples.map((item) => (
            <div key={item} className="value-point">
              <strong>MyJobMate principle</strong>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
