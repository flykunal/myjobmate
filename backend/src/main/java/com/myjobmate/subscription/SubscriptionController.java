package com.myjobmate.subscription;

import com.myjobmate.common.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @GetMapping("/plans")
    public ApiResponse<List<Map<String, Object>>> getPlans() {
        return ApiResponse.ok("Plans fetched", subscriptionService.getPlans());
    }

    @GetMapping("/subscription/me")
    public ApiResponse<Map<String, Object>> getSubscription() {
        return ApiResponse.ok("Subscription fetched", subscriptionService.currentSubscription());
    }
}
