package com.skilldecaydetector.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldecaydetector.entity.UserAnswer;
import com.skilldecaydetector.entity.UserEntity;

public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long> {

    List<UserAnswer> findByUser(UserEntity user);
}
