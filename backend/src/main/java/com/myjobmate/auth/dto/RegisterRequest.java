package com.myjobmate.auth.dto;

import com.myjobmate.common.LanguagePreference;
import com.myjobmate.common.Role;
import com.myjobmate.common.TutorPreference;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterRequest(
        @NotBlank String fullName,
        @Email @NotBlank String email,
        @NotBlank String password,
        @NotNull Role role,
        @NotNull LanguagePreference preferredLanguage,
        @NotNull TutorPreference tutorPreference
) {
}
