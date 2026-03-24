package com.myjobmate.career;

import com.myjobmate.career.dto.RoadmapGenerateRequest;
import com.myjobmate.career.dto.RoadmapResponse;
import com.myjobmate.common.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/roadmaps")
public class CareerController {

    private final CareerService careerService;

    public CareerController(CareerService careerService) {
        this.careerService = careerService;
    }

    @PostMapping("/generate")
    public ApiResponse<RoadmapResponse> generate(@Valid @RequestBody RoadmapGenerateRequest request) {
        return ApiResponse.ok("Roadmap generated", careerService.generateRoadmap(request));
    }

    @GetMapping("/me/active")
    public ApiResponse<RoadmapResponse> getActiveRoadmap() {
        return ApiResponse.ok("Active roadmap fetched", careerService.getActiveRoadmap());
    }

    @GetMapping("/{roadmapId}")
    public ApiResponse<RoadmapResponse> getRoadmap(@PathVariable Long roadmapId) {
        return ApiResponse.ok("Roadmap fetched", careerService.getRoadmap(roadmapId));
    }
}
