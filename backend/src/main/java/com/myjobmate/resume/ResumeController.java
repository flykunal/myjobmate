package com.myjobmate.resume;

import com.myjobmate.common.ApiResponse;
import com.myjobmate.resume.dto.ResumeAnalysisResponse;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping(path = "/analyze", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ResumeAnalysisResponse> analyze(@RequestParam(required = false) MultipartFile file,
                                                        @RequestParam(defaultValue = "Java Developer") String targetRole) {
        return ApiResponse.ok("Resume analyzed", resumeService.analyze(file, targetRole));
    }

    @GetMapping("/analyses")
    public ApiResponse<List<ResumeAnalysisResponse>> getAnalyses() {
        return ApiResponse.ok("Resume analyses fetched", resumeService.getAnalyses());
    }

    @PostMapping("/builder/generate")
    public ApiResponse<Map<String, Object>> generateResume() {
        return ApiResponse.ok("Resume builder placeholder ready", Map.of("status", "PREMIUM_PLACEHOLDER", "template", "Classic ATS"));
    }
}
