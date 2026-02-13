package com.skilldecaydetector.service;

import java.util.List;
import com.skilldecaydetector.entity.Question;
import com.skilldecaydetector.entity.Skill;

public interface QuestionService {
    Question saveQuestion(Question question);
    List<Question> getQuestionsBySkill(Skill skill);
}
