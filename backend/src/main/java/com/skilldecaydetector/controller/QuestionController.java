package com.skilldecaydetector.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.skilldecaydetector.entity.Question;
import com.skilldecaydetector.entity.Skill;
import com.skilldecaydetector.repository.QuestionRepository;
import com.skilldecaydetector.repository.SkillRepository;

@RestController
@RequestMapping("/api/admin/questions")
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private SkillRepository skillRepository;

    @PostMapping
    public Question addQuestion(@RequestParam Long skillId,
                                @RequestBody Question question) {

        Skill skill =
                skillRepository.findById(skillId).orElseThrow();

        question.setSkill(skill);
        return questionRepository.save(question);
    }

    @GetMapping("/{skillId}")
    public List<Question> getQuestions(@PathVariable Long skillId) {

        Skill skill =
                skillRepository.findById(skillId).orElseThrow();

        return questionRepository.findBySkill(skill);
    }
}
