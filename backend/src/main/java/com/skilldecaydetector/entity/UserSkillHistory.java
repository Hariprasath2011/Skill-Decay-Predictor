package com.skilldecaydetector.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "user_skill_history")
public class UserSkillHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_skill_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private UserSkill userSkill;

    private LocalDate date;

    private int proficiencyLevel;

    private double decayScore;

    public UserSkillHistory() {
    }

    public UserSkillHistory(UserSkill userSkill, LocalDate date, int proficiencyLevel, double decayScore) {
        this.userSkill = userSkill;
        this.date = date;
        this.proficiencyLevel = proficiencyLevel;
        this.decayScore = decayScore;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserSkill getUserSkill() {
        return userSkill;
    }

    public void setUserSkill(UserSkill userSkill) {
        this.userSkill = userSkill;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
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
}
