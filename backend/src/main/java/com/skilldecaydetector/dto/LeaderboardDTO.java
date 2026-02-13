package com.skilldecaydetector.dto;

public class LeaderboardDTO {
    private Long userId;
    private String email;
    private String firstName;
    private String lastName;
    private Long totalSkills;
    private Long totalProficiency;
    private int rank;

    public LeaderboardDTO(Long userId, String email, String firstName, String lastName, Long totalSkills,
            Long totalProficiency) {
        this.userId = userId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.totalSkills = totalSkills;
        this.totalProficiency = totalProficiency;
    }

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Long getTotalSkills() {
        return totalSkills;
    }

    public void setTotalSkills(Long totalSkills) {
        this.totalSkills = totalSkills;
    }

    public Long getTotalProficiency() {
        return totalProficiency;
    }

    public void setTotalProficiency(Long totalProficiency) {
        this.totalProficiency = totalProficiency;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }
}
