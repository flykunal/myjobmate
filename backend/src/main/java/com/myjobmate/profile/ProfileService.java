package com.myjobmate.profile;

import com.myjobmate.common.LanguagePreference;
import com.myjobmate.common.TutorPreference;
import com.myjobmate.profile.dto.UserProfileRequest;
import com.myjobmate.profile.dto.UserProfileResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class ProfileService {

    private final AtomicReference<UserProfileResponse> currentProfile = new AtomicReference<>(
            new UserProfileResponse(1L, "Aspiring Java Developer", "Focused on backend and Spring Boot",
                    "BEGINNER", 90, 24, "Java Developer",
                    LanguagePreference.ENGLISH, TutorPreference.BALANCED,
                    List.of("HTML", "Git"))
    );

    public UserProfileResponse getProfile() {
        return currentProfile.get();
    }

    public UserProfileResponse updateProfile(UserProfileRequest request) {
        UserProfileResponse response = new UserProfileResponse(1L, request.headline(), request.bio(), request.currentLevel(),
                request.dailyMinutes(), request.targetTimelineWeeks(), request.targetRole(),
                request.preferredLanguage(), request.tutorPreference(), request.knownSkills() == null ? List.of() : request.knownSkills());
        currentProfile.set(response);
        return response;
    }
}
