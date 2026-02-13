package com.skilldecaydetector.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldecaydetector.entity.Question;
import com.skilldecaydetector.entity.Skill;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findBySkill(Skill skill);
}
