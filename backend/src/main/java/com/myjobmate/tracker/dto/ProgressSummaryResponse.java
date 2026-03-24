package com.myjobmate.tracker.dto;

import java.util.List;

public record ProgressSummaryResponse(int progressPercent, int completedTopics, int totalTopics,
                                      int currentStreak, int points, int level, List<TodayTaskResponse> todaysTasks) {
}
