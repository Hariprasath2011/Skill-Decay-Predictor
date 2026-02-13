package com.skilldecaydetector.serviceimplementation;

import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.skilldecaydetector.dto.AddUserSkillRequestDTO;
import com.skilldecaydetector.entity.Skill;
import com.skilldecaydetector.entity.UserEntity;
import com.skilldecaydetector.entity.UserSkill;
import com.skilldecaydetector.repository.SkillRepository;
import com.skilldecaydetector.repository.UserRepository;
import com.skilldecaydetector.repository.UserSkillRepository;
import com.skilldecaydetector.service.UserSkillService;

@Service
@Transactional
public class UserSkillServiceImplementation implements UserSkillService {

    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final UserSkillRepository userSkillRepository;

    public UserSkillServiceImplementation(
            UserRepository userRepository,
            SkillRepository skillRepository,
            UserSkillRepository userSkillRepository) {
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
        this.userSkillRepository = userSkillRepository;
    }

    @Override
    public void addSkill(AddUserSkillRequestDTO request, String userEmail) {

        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Skill skill = skillRepository.findByName(request.getSkillName().toLowerCase())
                .orElseGet(() -> {
                    Skill s = new Skill();
                    s.setName(request.getSkillName().toLowerCase());
                    return skillRepository.save(s);
                });

        if (userSkillRepository.findByUserAndSkill(user, skill).isPresent()) {
            throw new RuntimeException("Skill already added");
        }

        UserSkill userSkill = new UserSkill();
        userSkill.setUser(user);
        userSkill.setSkill(skill);
        userSkill.setProficiencyLevel(request.getProficiencyLevel());
        userSkill.setLastPracticedDate(LocalDate.now());
        userSkill.setDecayScore(0);
        userSkill.setNeedsRevision(false);

        userSkillRepository.save(userSkill);
    }
}
