package com.skilldecaydetector.repository;

import com.skilldecaydetector.entity.UserSkillHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserSkillHistoryRepository extends JpaRepository<UserSkillHistory, Long> {
    List<UserSkillHistory> findByUserSkillIdOrderByDateAsc(Long userSkillId);
}
