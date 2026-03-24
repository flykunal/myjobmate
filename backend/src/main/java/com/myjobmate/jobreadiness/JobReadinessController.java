package com.myjobmate.jobreadiness;

import com.myjobmate.common.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class JobReadinessController {

    private final JobReadinessService jobReadinessService;

    public JobReadinessController(JobReadinessService jobReadinessService) {
        this.jobReadinessService = jobReadinessService;
    }

    @GetMapping("/job-readiness/me")
    public ApiResponse<Map<String, Object>> getJobReadiness() {
        return ApiResponse.ok("Job readiness fetched", jobReadinessService.getJobReadiness());
    }

    @PostMapping("/skill-gap/analyze")
    public ApiResponse<Map<String, Object>> analyzeSkillGap() {
        return ApiResponse.ok("Skill gap generated", jobReadinessService.analyzeSkillGap());
    }
}
