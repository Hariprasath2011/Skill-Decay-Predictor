package com.skilldecaydetector.dto;

import java.util.List;

public class UserDashboardDTO {

    private int totalSkills;
    private long needsRevision;
    private List<UserSkillResponseDTO> skills;

    public int getTotalSkills() {
        return totalSkills;
    }

    public void setTotalSkills(int totalSkills) {
        this.totalSkills = totalSkills;
    }

    public long getNeedsRevision() {
        return needsRevision;
    }

    public void setNeedsRevision(long needsRevision) {
        this.needsRevision = needsRevision;
    }

    public List<UserSkillResponseDTO> getSkills() {
        return skills;
    }

    public void setSkills(List<UserSkillResponseDTO> skills) {
        this.skills = skills;
    }
}
