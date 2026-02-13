package com.skilldecaydetector.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class SkillAssessmentRequestDTO {

    @NotNull
    private Long userSkillId;

    @Min(0)
    @Max(100)
    private int score;

    public Long getUserSkillId() {
        return userSkillId;
    }

    public void setUserSkillId(Long userSkillId) {
        this.userSkillId = userSkillId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    private java.util.List<UserAnswerSubmissionDTO> answers;

    public java.util.List<UserAnswerSubmissionDTO> getAnswers() {
        return answers;
    }

    public void setAnswers(java.util.List<UserAnswerSubmissionDTO> answers) {
        this.answers = answers;
    }
}
