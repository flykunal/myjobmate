package com.myjobmate.career.dto;

import java.util.List;

public record RoadmapResponse(
        Long roadmapId,
        String goal,
        String currentLevel,
        int timelineWeeks,
        List<WeekPlan> weeklyPlan
) {
    public record WeekPlan(int weekNumber, String title, String objective, List<TopicPlan> topics) {}
    public record TopicPlan(Long topicId, String topicKey, String name, String description, String practiceTask, String projectTask) {}
}
