package com.skilldecaydetector.dto;

import java.time.LocalDate;

public class UserSkillResponseDTO {

    private Long id;
    private String skillName;
    private int proficiencyLevel;
    private LocalDate lastPracticedDate;
    private double decayScore;
    private boolean needsRevision;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public int getProficiencyLevel() {
        return proficiencyLevel;
    }

    public void setProficiencyLevel(int proficiencyLevel) {
        this.proficiencyLevel = proficiencyLevel;
    }

    public LocalDate getLastPracticedDate() {
        return lastPracticedDate;
    }

    public void setLastPracticedDate(LocalDate lastPracticedDate) {
        this.lastPracticedDate = lastPracticedDate;
    }

    public double getDecayScore() {
        return decayScore;
    }

    public void setDecayScore(double decayScore) {
        this.decayScore = decayScore;
    }

    public boolean isNeedsRevision() {
        return needsRevision;
    }

    public void setNeedsRevision(boolean needsRevision) {
        this.needsRevision = needsRevision;
    }
}
