package com.skilldecaydetector.dto;

public class UserSkillGraphDTO {

    private String skillName;
    private int proficiencyLevel;
    private double decayScore;
    private long daysInactive;
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

    public double getDecayScore() {
        return decayScore;
    }

    public void setDecayScore(double decayScore) {
        this.decayScore = decayScore;
    }

    public long getDaysInactive() {
        return daysInactive;
    }

    public void setDaysInactive(long daysInactive) {
        this.daysInactive = daysInactive;
    }
}
