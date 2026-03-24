package com.myjobmate.notification;

import com.myjobmate.common.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class NotificationController {

    @PostMapping("/reminders/preferences")
    public ApiResponse<Map<String, Object>> saveReminderPreferences() {
        return ApiResponse.ok("Reminder preferences saved", Map.of("channels", List.of("IN_APP", "EMAIL"), "time", "20:00"));
    }

    @GetMapping("/notifications")
    public ApiResponse<List<Map<String, Object>>> getNotifications() {
        return ApiResponse.ok("Notifications fetched", List.of(
                Map.of("title", "Today's study plan is ready", "channel", "IN_APP", "status", "SCHEDULED"),
                Map.of("title", "Resume analyzer unlocked in Standard", "channel", "EMAIL", "status", "SENT")
        ));
    }
}
