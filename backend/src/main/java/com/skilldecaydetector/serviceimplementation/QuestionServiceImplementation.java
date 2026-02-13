package com.skilldecaydetector.serviceimplementation;

import java.util.List;
import org.springframework.stereotype.Service;
import com.skilldecaydetector.entity.Question;
import com.skilldecaydetector.entity.Skill;
import com.skilldecaydetector.repository.QuestionRepository;
import com.skilldecaydetector.service.QuestionService;

@Service
public class QuestionServiceImplementation implements QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionServiceImplementation(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question saveQuestion(Question question) {
        return questionRepository.save(question);
    }

    public List<Question> getQuestionsBySkill(Skill skill) {
        return questionRepository.findBySkill(skill);
    }
}
