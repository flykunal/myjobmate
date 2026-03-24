package com.myjobmate.tracker.dto;

public record TodayTaskResponse(Long taskId, String title, String sourceType, String status, int xpPoints) {
}
