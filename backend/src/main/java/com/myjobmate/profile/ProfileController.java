package com.myjobmate.profile;

import com.myjobmate.common.ApiResponse;
import com.myjobmate.profile.dto.UserProfileRequest;
import com.myjobmate.profile.dto.UserProfileResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ApiResponse<UserProfileResponse> getProfile() {
        return ApiResponse.ok("Profile fetched", profileService.getProfile());
    }

    @PutMapping
    public ApiResponse<UserProfileResponse> updateProfile(@Valid @RequestBody UserProfileRequest request) {
        return ApiResponse.ok("Profile updated", profileService.updateProfile(request));
    }
}
