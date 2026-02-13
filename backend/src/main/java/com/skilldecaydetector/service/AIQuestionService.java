package com.skilldecaydetector.service;

import java.util.List;
import com.skilldecaydetector.dto.AssessmentQuestionDTO;

public interface AIQuestionService {

    List<AssessmentQuestionDTO> generateQuestions(
            String skillName,
            int proficiencyLevel);
}
