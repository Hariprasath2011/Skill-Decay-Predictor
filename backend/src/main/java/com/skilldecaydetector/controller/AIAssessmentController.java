package com.skilldecaydetector.controller;

import java.security.Principal;

import org.springframework.web.bind.annotation.*;

import com.skilldecaydetector.dto.AssessmentQuestionResponseDTO;
import com.skilldecaydetector.entity.UserSkill;
import com.skilldecaydetector.repository.UserSkillRepository;
import com.skilldecaydetector.service.AIQuestionService;

@RestController
@RequestMapping("/api/user/ai-assessment")
public class AIAssessmentController {

    private final UserSkillRepository userSkillRepository;
    private final AIQuestionService aiQuestionService;

    public AIAssessmentController(
            UserSkillRepository userSkillRepository,
            AIQuestionService aiQuestionService) {
        this.userSkillRepository = userSkillRepository;
        this.aiQuestionService = aiQuestionService;
    }

    @GetMapping("/{userSkillId}")
    public AssessmentQuestionResponseDTO getAssessment(
            @PathVariable Long userSkillId,
            Principal principal) {

        UserSkill userSkill = userSkillRepository.findById(userSkillId)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        // 🔐 Security check
        if (!userSkill.getUser().getEmail().equals(principal.getName())) {
            throw new RuntimeException("Unauthorized access");
        }

        AssessmentQuestionResponseDTO response =
                new AssessmentQuestionResponseDTO();

        response.setUserSkillId(userSkillId);
        response.setSkillName(userSkill.getSkill().getName());
        response.setQuestions(
                aiQuestionService.generateQuestions(
                        userSkill.getSkill().getName(),
                        userSkill.getProficiencyLevel())
        );

        return response;
    }
}
