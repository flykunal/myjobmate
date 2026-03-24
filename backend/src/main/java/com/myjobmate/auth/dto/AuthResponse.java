package com.myjobmate.auth.dto;

import com.myjobmate.common.PlanCode;
import com.myjobmate.common.Role;

public record AuthResponse(Long userId, String fullName, String email, Role role, PlanCode planCode, String token) {
}
