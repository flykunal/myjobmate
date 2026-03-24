package com.myjobmate.tracker.dto;

import com.myjobmate.common.ProgressStatus;
import jakarta.validation.constraints.NotNull;

public record ProgressUpdateRequest(@NotNull ProgressStatus status) {
}
