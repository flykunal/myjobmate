package com.myjobmate.resume.dto;

import java.util.List;

public record ResumeAnalysisResponse(Long id, String fileName, int atsScore, String summary,
                                     List<String> missingKeywords, List<String> suggestions) {
}
