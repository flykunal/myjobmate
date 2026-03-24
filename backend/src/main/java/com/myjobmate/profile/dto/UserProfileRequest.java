package com.myjobmate.profile.dto;

import com.myjobmate.common.LanguagePreference;
import com.myjobmate.common.TutorPreference;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record UserProfileRequest(
        @NotBlank String headline,
        String bio,
        @NotBlank String currentLevel,
        @Min(15) int dailyMinutes,
        @Min(4) int targetTimelineWeeks,
        @NotBlank String targetRole,
        @NotNull LanguagePreference preferredLanguage,
        @NotNull TutorPreference tutorPreference,
        List<String> knownSkills
) {
}
