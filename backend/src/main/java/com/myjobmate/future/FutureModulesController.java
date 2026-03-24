package com.myjobmate.future;

import com.myjobmate.common.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class FutureModulesController {

    @PostMapping("/interviews/sessions")
    public ApiResponse<Map<String, Object>> createInterviewSession() {
        return ApiResponse.ok("Mock interview module scaffolded", Map.of("status", "PREMIUM_PLACEHOLDER", "sessionType", "TECHNICAL"));
    }

    @GetMapping("/interviews/sessions/1/feedback")
    public ApiResponse<Map<String, Object>> getInterviewFeedback() {
        return ApiResponse.ok("Mock interview feedback placeholder", Map.of("score", 0, "message", "Implement conversational interview loop next"));
    }

    @GetMapping("/mentors")
    public ApiResponse<List<Map<String, Object>>> getMentors() {
        return ApiResponse.ok("Mentor marketplace placeholder", List.of(Map.of("name", "Aditi Sharma", "expertise", "Backend + resume review", "hourlyRate", 1500)));
    }

    @PostMapping("/mentor-bookings")
    public ApiResponse<Map<String, Object>> createBooking() {
        return ApiResponse.ok("Mentor booking placeholder", Map.of("status", "BOOKING_REQUESTED"));
    }

    @PostMapping("/portfolio/generate")
    public ApiResponse<Map<String, Object>> generatePortfolio() {
        return ApiResponse.ok("Portfolio builder placeholder", Map.of("slug", "demo-portfolio", "status", "DRAFT"));
    }

    @PostMapping("/jobs/match")
    public ApiResponse<List<Map<String, Object>>> matchJobs() {
        return ApiResponse.ok("Job matching placeholder", List.of(Map.of("title", "Junior Java Developer", "company", "Acme", "matchScore", 82)));
    }

    @GetMapping("/jobs/recommendations")
    public ApiResponse<List<Map<String, Object>>> getRecommendations() {
        return ApiResponse.ok("Job recommendations placeholder", List.of(Map.of("title", "Backend Intern", "company", "StartHub", "matchScore", 74)));
    }

    @GetMapping("/recruiter/candidates")
    public ApiResponse<List<Map<String, Object>>> getCandidates() {
        return ApiResponse.ok("Recruiter portal placeholder", List.of(Map.of("candidateName", "Demo Learner", "readinessScore", 72, "targetRole", "Java Developer")));
    }

    @PostMapping("/recruiter/shortlists")
    public ApiResponse<Map<String, Object>> shortlistCandidate() {
        return ApiResponse.ok("Candidate shortlisted", Map.of("status", "SHORTLISTED"));
    }
}
