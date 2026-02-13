package com.skilldecaydetector.entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "assessments")
public class Assessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private UserEntity user;

    @ManyToOne
    private Skill skill;

    private int score;

    @OneToMany(mappedBy = "assessment", cascade = CascadeType.ALL)
    private java.util.List<UserAnswer> userAnswers;

    private LocalDateTime takenAt;

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

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public LocalDateTime getTakenAt() {
        return takenAt;
    }

    public void setTakenAt(LocalDateTime takenAt) {
        this.takenAt = takenAt;
    }

    public java.util.List<UserAnswer> getUserAnswers() {
        return userAnswers;
    }

    public void setUserAnswers(java.util.List<UserAnswer> userAnswers) {
        this.userAnswers = userAnswers;
    }
}
