package com.skilldecaydetector.dto;

import java.util.List;

public class AssessmentQuestionResponseDTO {

    private Long userSkillId;
    private String skillName;
    private List<AssessmentQuestionDTO> questions;

    public Long getUserSkillId() {
        return userSkillId;
    }

    public void setUserSkillId(Long userSkillId) {
        this.userSkillId = userSkillId;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public List<AssessmentQuestionDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<AssessmentQuestionDTO> questions) {
        this.questions = questions;
    }
}
