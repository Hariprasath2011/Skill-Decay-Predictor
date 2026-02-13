package com.skilldecaydetector.service;

import java.util.List;
import com.skilldecaydetector.entity.Skill;

public interface SkillService {
    Skill saveSkill(Skill skill);
    List<Skill> getAllSkills();
}
