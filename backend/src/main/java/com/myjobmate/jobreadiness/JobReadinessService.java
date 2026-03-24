package com.myjobmate.jobreadiness;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class JobReadinessService {

    public Map<String, Object> getJobReadiness() {
        return Map.of(
                "score", 72,
                "breakdown", Map.of(
                        "roadmapCompletion", 24,
                        "projectCompletion", 12,
                        "skillCoverage", 14,
                        "resumeQuality", 12,
                        "interviewReadiness", 6,
                        "consistency", 4
                ),
                "nextBestActions", List.of("Complete one backend project milestone", "Raise ATS score above 85", "Practice one technical interview set")
        );
    }

    public Map<String, Object> analyzeSkillGap() {
        return Map.of(
                "targetRole", "Java Developer",
                "missingSkills", List.of("Spring Security", "Hibernate", "REST API testing"),
                "priorityOrder", List.of("Spring Boot fundamentals", "Database design", "Security and testing"),
                "improvementPlan", List.of("Build a CRUD API with JWT", "Add integration tests", "Deploy one project publicly")
        );
    }
}
