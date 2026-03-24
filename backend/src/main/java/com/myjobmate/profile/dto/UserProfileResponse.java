package com.myjobmate.profile.dto;

import com.myjobmate.common.LanguagePreference;
import com.myjobmate.common.TutorPreference;

import java.util.List;

public record UserProfileResponse(
        Long userId,
        String headline,
        String bio,
        String currentLevel,
        int dailyMinutes,
        int targetTimelineWeeks,
        String targetRole,
        LanguagePreference preferredLanguage,
        TutorPreference tutorPreference,
        List<String> knownSkills
) {
}
