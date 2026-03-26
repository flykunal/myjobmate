package com.myjobmate.testimonial;

import com.myjobmate.common.ApiResponse;
import com.myjobmate.testimonial.dto.TestimonialResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {

    private final TestimonialService testimonialService;

    public TestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    @GetMapping
    public ApiResponse<List<TestimonialResponse>> getTestimonials() {
        return ApiResponse.ok("Testimonials fetched", testimonialService.getLatestTestimonials());
    }
}