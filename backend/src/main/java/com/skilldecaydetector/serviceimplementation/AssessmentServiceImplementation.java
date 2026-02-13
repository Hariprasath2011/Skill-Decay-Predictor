package com.skilldecaydetector.serviceimplementation;

import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.skilldecaydetector.dto.SkillAssessmentRequestDTO;
import com.skilldecaydetector.entity.UserEntity;
import com.skilldecaydetector.entity.UserSkill;
import com.skilldecaydetector.repository.UserRepository;
import com.skilldecaydetector.repository.UserSkillRepository;
import com.skilldecaydetector.service.AssessmentService;

@Service
@Transactional
public class AssessmentServiceImplementation implements AssessmentService {

    private final UserRepository userRepository;
    private final UserSkillRepository userSkillRepository;
    private final com.skilldecaydetector.repository.UserSkillHistoryRepository userSkillHistoryRepository;
    private final com.skilldecaydetector.repository.AssessmentRepository assessmentRepository;

    public AssessmentServiceImplementation(
            UserRepository userRepository,
            UserSkillRepository userSkillRepository,
            com.skilldecaydetector.repository.UserSkillHistoryRepository userSkillHistoryRepository,
            com.skilldecaydetector.repository.AssessmentRepository assessmentRepository) {
        this.userRepository = userRepository;
        this.userSkillRepository = userSkillRepository;
        this.userSkillHistoryRepository = userSkillHistoryRepository;
        this.assessmentRepository = assessmentRepository;
    }

    @Override
    public void submitAssessment(
            SkillAssessmentRequestDTO request,
            String userEmail) {

        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserSkill userSkill = userSkillRepository.findById(request.getUserSkillId())
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        if (!userSkill.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized assessment attempt");
        }

        int score = request.getScore();
        int currentLevel = userSkill.getProficiencyLevel();

        // New Logic:
        // 1. If score is 100%, increase level (max 5)
        // 2. If score < 40%, decrease level (min 1) and flag for revision

        if (score == 100) {
            if (currentLevel < 5) {
                userSkill.setProficiencyLevel(currentLevel + 1);
            }
            userSkill.setNeedsRevision(false);
        } else if (score < 40) {
            if (currentLevel > 1) {
                userSkill.setProficiencyLevel(currentLevel - 1);
            }
            userSkill.setNeedsRevision(true);
        } else {
            // Scores between 40 and 99: maintain level, no immediate revision needed
            userSkill.setNeedsRevision(false);
        }

        userSkill.setDecayScore(0.0);
        userSkill.setLastPracticedDate(LocalDate.now());

        userSkillRepository.save(userSkill);

        // Save UserSkillHistory (Proficiency Tracking)
        com.skilldecaydetector.entity.UserSkillHistory history = new com.skilldecaydetector.entity.UserSkillHistory(
                userSkill, LocalDate.now(), userSkill.getProficiencyLevel(), userSkill.getDecayScore());
        userSkillHistoryRepository.save(history);

        // Save Assessment (Score History)
        com.skilldecaydetector.entity.Assessment assessment = new com.skilldecaydetector.entity.Assessment();
        assessment.setUser(user);
        assessment.setSkill(userSkill.getSkill());
        assessment.setScore(score);
        assessment.setTakenAt(java.time.LocalDateTime.now());

        // Map answers
        if (request.getAnswers() != null) {
            java.util.List<com.skilldecaydetector.entity.UserAnswer> userAnswers = request.getAnswers().stream()
                    .map(ansDTO -> {
                        com.skilldecaydetector.entity.UserAnswer ua = new com.skilldecaydetector.entity.UserAnswer();
                        ua.setQuestionText(ansDTO.getQuestionText());
                        ua.setSelectedOption(ansDTO.getSelectedOption());
                        ua.setCorrectOption(ansDTO.getCorrectOption());
                        ua.setCorrect(ansDTO.isCorrect());
                        ua.setUser(user);
                        ua.setAssessment(assessment);
                        return ua;
                    }).collect(java.util.stream.Collectors.toList());
            assessment.setUserAnswers(userAnswers);
        }

        assessmentRepository.save(assessment);
    }

    @Override
    public java.util.List<com.skilldecaydetector.entity.Assessment> getHistory(String userEmail) {
        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return assessmentRepository.findByUserOrderByTakenAtDesc(user);
    }

    @Override
    public com.skilldecaydetector.entity.Assessment getAssessmentById(Long id, String userEmail) {
        com.skilldecaydetector.entity.Assessment assessment = assessmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));

        if (!assessment.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized");
        }
        return assessment;
    }
}
