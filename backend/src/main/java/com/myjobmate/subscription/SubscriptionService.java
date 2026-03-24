package com.myjobmate.subscription;

import com.myjobmate.common.PlanCode;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class SubscriptionService {

    public List<Map<String, Object>> getPlans() {
        return List.of(
                Map.of("code", PlanCode.FREE, "price", 0, "features", List.of("Roadmap basics", "Limited resources", "Progress tracker")),
                Map.of("code", PlanCode.STANDARD, "price", 499, "features", List.of("Resume analyzer", "Language filters", "Job readiness", "Skill gap analysis")),
                Map.of("code", PlanCode.PREMIUM, "price", 999, "features", List.of("Mock interview", "Resume builder", "Portfolio builder", "Expert booking"))
        );
    }

    public Map<String, Object> currentSubscription() {
        return Map.of("plan", PlanCode.STANDARD, "status", "ACTIVE", "renewalDate", "2026-04-30");
    }
}
