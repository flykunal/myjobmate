package com.myjobmate.resume;

import com.myjobmate.resume.dto.ResumeAnalysisResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ResumeService {

    private final AtomicLong analysisIdSequence = new AtomicLong(1);
    private final List<ResumeAnalysisResponse> analyses = new ArrayList<>();

    public ResumeAnalysisResponse analyze(MultipartFile file, String targetRole) {
        String fileName = file != null ? file.getOriginalFilename() : "resume.pdf";
        ResumeAnalysisResponse response = new ResumeAnalysisResponse(
                analysisIdSequence.getAndIncrement(),
                fileName,
                78,
                "Solid baseline resume for " + targetRole + ". Add measurable impact and role-specific keywords.",
                List.of("Spring Boot", "REST APIs", "SQL"),
                List.of("Strengthen project outcomes with numbers", "Move core technical skills above education", "Mirror the target job description keywords")
        );
        analyses.add(0, response);
        return response;
    }

    public List<ResumeAnalysisResponse> getAnalyses() {
        if (analyses.isEmpty()) {
            analyses.add(new ResumeAnalysisResponse(1L, "demo-resume.pdf", 78,
                    "Good structure with room to improve ATS alignment.",
                    List.of("Spring Boot", "Microservices"),
                    List.of("Add project metrics", "Clarify backend ownership", "Include deployment tools")));
        }
        return List.copyOf(analyses);
    }
}
