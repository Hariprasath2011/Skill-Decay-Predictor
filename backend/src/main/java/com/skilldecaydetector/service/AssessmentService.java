package com.skilldecaydetector.service;

import com.skilldecaydetector.dto.SkillAssessmentRequestDTO;

public interface AssessmentService {

    void submitAssessment(SkillAssessmentRequestDTO request, String userEmail);

    java.util.List<com.skilldecaydetector.entity.Assessment> getHistory(String userEmail);

    com.skilldecaydetector.entity.Assessment getAssessmentById(Long id, String userEmail);
}
