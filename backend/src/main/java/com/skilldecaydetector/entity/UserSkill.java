package com.skilldecaydetector.entity;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "user_skills")
public class UserSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @com.fasterxml.jackson.annotation.JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

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

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
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
