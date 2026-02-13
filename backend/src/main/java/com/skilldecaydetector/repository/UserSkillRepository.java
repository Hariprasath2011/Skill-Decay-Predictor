package com.skilldecaydetector.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.skilldecaydetector.entity.*;

public interface UserSkillRepository extends JpaRepository<UserSkill, Long> {

    List<UserSkill> findByUser(UserEntity user);

    Optional<UserSkill> findByUserAndSkill(UserEntity user, Skill skill);

    @Query("SELECT new com.skilldecaydetector.dto.LeaderboardDTO(" +
            "u.id, u.email, p.firstName, p.lastName, COUNT(us), SUM(us.proficiencyLevel)) " +
            "FROM UserSkill us " +
            "JOIN us.user u " +
            "LEFT JOIN u.userProfile p " +
            "GROUP BY u.id, u.email, p.firstName, p.lastName " +
            "ORDER BY SUM(us.proficiencyLevel) DESC")
    List<com.skilldecaydetector.dto.LeaderboardDTO> findLeaderboardStats();
}
