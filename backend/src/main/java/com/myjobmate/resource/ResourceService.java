package com.myjobmate.resource;

import com.myjobmate.resource.dto.ResourceItem;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class ResourceService {

    private final List<ResourceItem> resources = List.of(
            new ResourceItem(1L, "java-developer-fundamentals-w1", "YOUTUBE", "Java Roadmap Crash Course", "https://youtube.com/watch?v=java-roadmap", "ENGLISH", "BALANCED", "BEGINNER", 45, "YouTube"),
            new ResourceItem(2L, "java-developer-fundamentals-w1", "NOTE", "Java Basics Notes", "https://example.com/java-notes", "ENGLISH", "THEORY_FIRST", "BEGINNER", 20, "Internal"),
            new ResourceItem(3L, "java-developer-practice-w1", "PROJECT", "Student Record Manager", "https://example.com/student-record-project", "ENGLISH", "HANDS_ON", "BEGINNER", 120, "Internal"),
            new ResourceItem(4L, "java-developer-fundamentals-w1", "YOUTUBE", "Java in Hindi", "https://youtube.com/watch?v=java-hindi", "HINDI", "BALANCED", "BEGINNER", 55, "YouTube")
    );

    public List<ResourceItem> getResources(String topic, String language, String tutorPreference, String difficulty) {
        return resources.stream()
                .filter(item -> topic == null || item.topicKey().contains(topic.toLowerCase(Locale.ROOT)))
                .filter(item -> language == null || item.language().equalsIgnoreCase(language) || item.language().equalsIgnoreCase("BILINGUAL"))
                .filter(item -> tutorPreference == null || item.tutorStyle().equalsIgnoreCase(tutorPreference) || item.tutorStyle().equalsIgnoreCase("BALANCED"))
                .filter(item -> difficulty == null || item.difficulty().equalsIgnoreCase(difficulty))
                .collect(Collectors.toList());
    }
}
