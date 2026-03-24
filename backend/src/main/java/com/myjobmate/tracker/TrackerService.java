package com.myjobmate.tracker;

import com.myjobmate.common.ProgressStatus;
import com.myjobmate.tracker.dto.ProgressSummaryResponse;
import com.myjobmate.tracker.dto.TodayTaskResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class TrackerService {

    private final Map<Long, ProgressStatus> progressByTopicId = new LinkedHashMap<>();
    private final List<TodayTaskResponse> todaysTasks = new ArrayList<>(List.of(
            new TodayTaskResponse(1L, "Complete Java collections revision", "ROADMAP_TOPIC", "PENDING", 20),
            new TodayTaskResponse(2L, "Watch one curated backend design video", "RESOURCE", "PENDING", 10)
    ));

    public ProgressSummaryResponse getSummary() {
        int totalTopics = Math.max(progressByTopicId.size(), 8);
        long completedTopics = progressByTopicId.values().stream().filter(status -> status == ProgressStatus.COMPLETED).count();
        int progressPercent = (int) Math.round((completedTopics * 100.0) / totalTopics);
        int points = (int) completedTopics * 25 + todaysTasks.stream().filter(task -> "COMPLETED".equals(task.status())).mapToInt(TodayTaskResponse::xpPoints).sum();
        int level = Math.max(1, (points / 100) + 1);
        int currentStreak = completedTopics > 0 ? 4 : 0;
        return new ProgressSummaryResponse(progressPercent, (int) completedTopics, totalTopics, currentStreak, points, level, List.copyOf(todaysTasks));
    }

    public ProgressStatus updateTopic(Long topicId, ProgressStatus status) {
        progressByTopicId.put(topicId, status);
        return status;
    }

    public List<TodayTaskResponse> getTodaysTasks() {
        return List.copyOf(todaysTasks);
    }

    public TodayTaskResponse updateTask(Long taskId) {
        for (int i = 0; i < todaysTasks.size(); i++) {
            TodayTaskResponse task = todaysTasks.get(i);
            if (task.taskId().equals(taskId)) {
                TodayTaskResponse updated = new TodayTaskResponse(task.taskId(), task.title(), task.sourceType(), "COMPLETED", task.xpPoints());
                todaysTasks.set(i, updated);
                return updated;
            }
        }
        throw new IllegalArgumentException("Task not found");
    }
}
