package com.myjobmate.resource;

import com.myjobmate.common.ApiResponse;
import com.myjobmate.resource.dto.ResourceItem;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ResourceController {

    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @GetMapping("/resources")
    public ApiResponse<List<ResourceItem>> getResources(@RequestParam(required = false) String topic,
                                                        @RequestParam(required = false) String language,
                                                        @RequestParam(required = false) String tutorPreference,
                                                        @RequestParam(required = false) String difficulty) {
        return ApiResponse.ok("Resources fetched", resourceService.getResources(topic, language, tutorPreference, difficulty));
    }

    @GetMapping("/roadmaps/{id}/weeks/{week}/resources")
    public ApiResponse<List<ResourceItem>> getWeekResources(@PathVariable Long id, @PathVariable int week) {
        return ApiResponse.ok("Week resources fetched", resourceService.getResources("w" + week, null, null, null));
    }
}
