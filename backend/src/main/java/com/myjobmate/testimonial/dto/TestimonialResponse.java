package com.myjobmate.testimonial.dto;

import java.time.LocalDateTime;

public record TestimonialResponse(
        Long id,
        String userName,
        String city,
        String feedbackText,
        LocalDateTime createdAt
) {
}