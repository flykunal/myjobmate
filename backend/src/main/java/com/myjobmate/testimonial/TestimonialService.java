package com.myjobmate.testimonial;

import com.myjobmate.testimonial.dto.TestimonialResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
public class TestimonialService {

    private final List<TestimonialResponse> testimonials = List.of(
            new TestimonialResponse(1L, "Aman Verma", "Indore", "I was learning randomly before. Now I know exactly what to study each week and what to verify before moving ahead.", LocalDateTime.now().minusDays(1)),
            new TestimonialResponse(2L, "Priya Sharma", "Jaipur", "The roadmap gave me clarity. I stopped jumping between courses and finally built consistent learning habits.", LocalDateTime.now().minusDays(2)),
            new TestimonialResponse(3L, "Rohit Kumar", "Patna", "My resume improved a lot because I could see what skills were actually missing for my target role.", LocalDateTime.now().minusDays(4)),
            new TestimonialResponse(4L, "Sneha Joshi", "Pune", "The best part is the structure. It feels like someone organized the chaos for me.", LocalDateTime.now().minusWeeks(1)),
            new TestimonialResponse(5L, "Nikhil Singh", "Lucknow", "Tracking streak and tasks made me take learning seriously. It no longer feels like random motivation.", LocalDateTime.now().minusWeeks(2)),
            new TestimonialResponse(6L, "Muskan Gupta", "Delhi", "I started getting interview calls only after I followed a more focused plan and fixed gaps in my profile.", LocalDateTime.now().minusWeeks(3))
    );

    public List<TestimonialResponse> getLatestTestimonials() {
        return testimonials.stream()
                .sorted(Comparator.comparing(TestimonialResponse::createdAt).reversed())
                .toList();
    }
}