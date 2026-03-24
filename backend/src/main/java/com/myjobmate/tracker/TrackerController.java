package com.myjobmate.tracker;

import com.myjobmate.common.ApiResponse;
import com.myjobmate.common.ProgressStatus;
import com.myjobmate.tracker.dto.ProgressSummaryResponse;
import com.myjobmate.tracker.dto.ProgressUpdateRequest;
import com.myjobmate.tracker.dto.TodayTaskResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TrackerController {

    private final TrackerService trackerService;

    public TrackerController(TrackerService trackerService) {
        this.trackerService = trackerService;
    }

    @PatchMapping("/progress/topics/{topicId}")
    public ApiResponse<ProgressStatus> updateTopic(@PathVariable Long topicId, @Valid @RequestBody ProgressUpdateRequest request) {
        return ApiResponse.ok("Progress updated", trackerService.updateTopic(topicId, request.status()));
    }

    @GetMapping("/progress/summary")
    public ApiResponse<ProgressSummaryResponse> getSummary() {
        return ApiResponse.ok("Progress summary fetched", trackerService.getSummary());
    }

    @GetMapping("/tasks/today")
    public ApiResponse<List<TodayTaskResponse>> getTodaysTasks() {
        return ApiResponse.ok("Today's tasks fetched", trackerService.getTodaysTasks());
    }

    @PatchMapping("/tasks/{taskId}")
    public ApiResponse<TodayTaskResponse> updateTask(@PathVariable Long taskId) {
        return ApiResponse.ok("Task updated", trackerService.updateTask(taskId));
    }

    @GetMapping("/gamification/me")
    public ApiResponse<ProgressSummaryResponse> getGamification() {
        return ApiResponse.ok("Gamification summary fetched", trackerService.getSummary());
    }
}
