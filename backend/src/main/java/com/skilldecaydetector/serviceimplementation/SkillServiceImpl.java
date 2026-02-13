package com.skilldecaydetector.serviceimplementation;

import java.util.List;
import org.springframework.stereotype.Service;
import com.skilldecaydetector.entity.Skill;
import com.skilldecaydetector.repository.SkillRepository;
import com.skilldecaydetector.service.SkillService;

@Service
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;

    public SkillServiceImpl(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public Skill saveSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }
}
