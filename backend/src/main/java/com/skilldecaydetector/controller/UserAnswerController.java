package com.skilldecaydetector.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.skilldecaydetector.entity.Question;
import com.skilldecaydetector.entity.UserAnswer;
import com.skilldecaydetector.entity.UserEntity;
import com.skilldecaydetector.repository.QuestionRepository;
import com.skilldecaydetector.repository.UserAnswerRepository;
import com.skilldecaydetector.repository.UserRepository;

@RestController
@RequestMapping("/api/user/answers")
public class UserAnswerController {

    @Autowired
    private UserAnswerRepository userAnswerRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public UserAnswer submitAnswer(@RequestParam Long questionId,
                                   @RequestParam String selectedOption,
                                   Principal principal) {

        UserEntity user =
                userRepository.findByEmail(principal.getName()).orElseThrow();

        Question question =
                questionRepository.findById(questionId).orElseThrow();

        UserAnswer answer = new UserAnswer();
        answer.setUser(user);
        answer.setQuestion(question);
        answer.setSelectedOption(selectedOption);
        answer.setCorrect(selectedOption.equals(question.getCorrectOption()));

        return userAnswerRepository.save(answer);
    }

    @GetMapping
    public List<UserAnswer> getUserAnswers(Principal principal) {

        UserEntity user =
                userRepository.findByEmail(principal.getName()).orElseThrow();

        return userAnswerRepository.findByUser(user);
    }
}
