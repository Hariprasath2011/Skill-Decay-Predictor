package com.skilldecaydetector.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldecaydetector.entity.Assessment;
import com.skilldecaydetector.entity.UserEntity;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {

    List<Assessment> findByUserOrderByTakenAtDesc(UserEntity user);
}
