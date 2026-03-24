package com.myjobmate.resource.dto;

public record ResourceItem(Long id, String topicKey, String type, String title, String url, String language,
                           String tutorStyle, String difficulty, int durationMinutes, String provider) {
}
