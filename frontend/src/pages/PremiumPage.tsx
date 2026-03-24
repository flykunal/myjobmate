import { PlanGate, SectionCard } from "../components/Cards";

const premiumModules = ["AI Mock Interview", "Resume Builder", "Portfolio Builder", "Expert Booking", "Advanced Job Matching"];

export function PremiumPage() {
  return (
    <div className="page">
      <SectionCard title="Premium expansion area">
        <div className="topic-grid">
          {premiumModules.map((module) => (
            <PlanGate key={module} plan="Premium"><p>{module}</p></PlanGate>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
