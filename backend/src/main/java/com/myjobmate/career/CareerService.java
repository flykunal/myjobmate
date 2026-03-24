package com.myjobmate.career;

import com.myjobmate.career.dto.RoadmapGenerateRequest;
import com.myjobmate.career.dto.RoadmapResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class CareerService {

    private final AtomicLong roadmapIdSequence = new AtomicLong(100);
    private final AtomicLong topicIdSequence = new AtomicLong(1000);
    private volatile RoadmapResponse activeRoadmap = createDefaultRoadmap();

    public RoadmapResponse generateRoadmap(RoadmapGenerateRequest request) {
        long roadmapId = roadmapIdSequence.incrementAndGet();
        List<RoadmapResponse.WeekPlan> weeks = new ArrayList<>();
        int totalWeeks = Math.min(request.targetTimelineWeeks(), 12);
        for (int week = 1; week <= totalWeeks; week++) {
            List<RoadmapResponse.TopicPlan> topics = List.of(
                    new RoadmapResponse.TopicPlan(topicIdSequence.incrementAndGet(), normalizeKey(request.goal(), "fundamentals", week),
                            request.goal() + " Foundations " + week,
                            "Build core concepts for " + request.goal() + " with a " + request.currentLevel().toLowerCase(Locale.ROOT) + " path.",
                            "Complete a focused coding or analysis task for week " + week,
                            "Ship a mini project milestone for week " + week),
                    new RoadmapResponse.TopicPlan(topicIdSequence.incrementAndGet(), normalizeKey(request.goal(), "practice", week),
                            request.goal() + " Practice Sprint " + week,
                            "Reinforce the concepts with hands-on exercises and interview-style prompts.",
                            "Solve two real-world exercises tied to the weekly objective",
                            "Expand the portfolio project with one visible deliverable")
            );
            weeks.add(new RoadmapResponse.WeekPlan(week,
                    "Week " + week + " - " + request.goal(),
                    "Study for about " + request.dailyMinutes() * 7 / 60 + " hours this week and deepen applied understanding.",
                    topics));
        }
        activeRoadmap = new RoadmapResponse(roadmapId, request.goal(), request.currentLevel(), totalWeeks, weeks);
        return activeRoadmap;
    }

    public RoadmapResponse getActiveRoadmap() {
        return activeRoadmap;
    }

    public RoadmapResponse getRoadmap(Long roadmapId) {
        if (!activeRoadmap.roadmapId().equals(roadmapId)) {
            throw new IllegalArgumentException("Roadmap not found");
        }
        return activeRoadmap;
    }

    private String normalizeKey(String goal, String segment, int week) {
        return goal.toLowerCase(Locale.ROOT).replace(" ", "-") + "-" + segment + "-w" + week;
    }

    private RoadmapResponse createDefaultRoadmap() {
        return generateRoadmap(new RoadmapGenerateRequest("Java Developer", "BEGINNER", 90, 8,
                List.of("HTML", "Git"), com.myjobmate.common.LanguagePreference.ENGLISH,
                com.myjobmate.common.TutorPreference.BALANCED));
    }
}
