package com.myjobmate.auth;

import com.myjobmate.auth.dto.AuthResponse;
import com.myjobmate.auth.dto.LoginRequest;
import com.myjobmate.auth.dto.RegisterRequest;
import com.myjobmate.common.PlanCode;
import com.myjobmate.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class AuthService {

    private final AtomicLong userIdSequence = new AtomicLong(1);
    private final Map<String, StoredUser> usersByEmail = new ConcurrentHashMap<>();
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        if (usersByEmail.containsKey(request.email().toLowerCase())) {
            throw new IllegalArgumentException("Email already registered");
        }
        long userId = userIdSequence.getAndIncrement();
        StoredUser storedUser = new StoredUser(
                userId,
                request.fullName(),
                request.email().toLowerCase(),
                passwordEncoder.encode(request.password()),
                request.role(),
                request.preferredLanguage(),
                request.tutorPreference(),
                PlanCode.FREE
        );
        usersByEmail.put(storedUser.email(), storedUser);
        String token = jwtService.generateToken(storedUser.email(), storedUser.role());
        return new AuthResponse(userId, storedUser.fullName(), storedUser.email(), storedUser.role(), storedUser.planCode(), token);
    }

    public AuthResponse login(LoginRequest request) {
        StoredUser storedUser = usersByEmail.get(request.email().toLowerCase());
        if (storedUser == null || !passwordEncoder.matches(request.password(), storedUser.passwordHash())) {
            throw new IllegalArgumentException("Invalid email or password");
        }
        String token = jwtService.generateToken(storedUser.email(), storedUser.role());
        return new AuthResponse(storedUser.id(), storedUser.fullName(), storedUser.email(), storedUser.role(), storedUser.planCode(), token);
    }

    public AuthResponse demoUser() {
        return usersByEmail.values().stream().findFirst()
                .map(user -> new AuthResponse(user.id(), user.fullName(), user.email(), user.role(), user.planCode(), jwtService.generateToken(user.email(), user.role())))
                .orElseGet(() -> register(new RegisterRequest("Demo Learner", "demo@myjobmate.com", "password", com.myjobmate.common.Role.LEARNER,
                        com.myjobmate.common.LanguagePreference.ENGLISH, com.myjobmate.common.TutorPreference.BALANCED)));
    }

    private record StoredUser(Long id, String fullName, String email, String passwordHash,
                              com.myjobmate.common.Role role,
                              com.myjobmate.common.LanguagePreference preferredLanguage,
                              com.myjobmate.common.TutorPreference tutorPreference,
                              PlanCode planCode) {
    }
}
