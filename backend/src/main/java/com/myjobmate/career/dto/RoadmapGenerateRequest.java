package com.myjobmate.career.dto;

import com.myjobmate.common.LanguagePreference;
import com.myjobmate.common.TutorPreference;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record RoadmapGenerateRequest(
        @NotBlank String goal,
        @NotBlank String currentLevel,
        @Min(30) int dailyMinutes,
        @Min(4) int targetTimelineWeeks,
        List<String> knownSkills,
        @NotNull LanguagePreference preferredLanguage,
        @NotNull TutorPreference tutorPreference
) {
}
