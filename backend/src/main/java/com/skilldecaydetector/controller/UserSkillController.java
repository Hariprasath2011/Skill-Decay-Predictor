package com.skilldecaydetector.controller;

import java.security.Principal;
import java.time.LocalDate;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.skilldecaydetector.dto.AddUserSkillRequestDTO;
import com.skilldecaydetector.entity.*;
import com.skilldecaydetector.repository.*;

@RestController
@RequestMapping("/api/user/skills")
@PreAuthorize("hasRole('USER')")
public class UserSkillController {

    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final UserSkillRepository userSkillRepository;
    private final com.skilldecaydetector.repository.UserSkillHistoryRepository userSkillHistoryRepository;
    private final com.skilldecaydetector.service.SkillDecayService skillDecayService;

    public UserSkillController(UserRepository userRepository,
            SkillRepository skillRepository,
            UserSkillRepository userSkillRepository,
            com.skilldecaydetector.repository.UserSkillHistoryRepository userSkillHistoryRepository,
            com.skilldecaydetector.service.SkillDecayService skillDecayService) {
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
        this.userSkillRepository = userSkillRepository;
        this.userSkillHistoryRepository = userSkillHistoryRepository;
        this.skillDecayService = skillDecayService;
    }

    @PostMapping
    public String addSkill(@RequestBody AddUserSkillRequestDTO dto,
            Principal principal) {

        UserEntity user = userRepository
                .findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Skill skill = skillRepository
                .findByName(dto.getSkillName())
                .orElseGet(() -> {
                    Skill newSkill = new Skill();
                    newSkill.setName(dto.getSkillName());
                    return skillRepository.save(newSkill);
                });

        if (userSkillRepository.findByUserAndSkill(user, skill).isPresent()) {
            throw new RuntimeException("Skill already added");
        }

        UserSkill userSkill = new UserSkill();
        userSkill.setUser(user);
        userSkill.setSkill(skill);
        userSkill.setProficiencyLevel(dto.getProficiencyLevel());
        userSkill.setLastPracticedDate(LocalDate.now());
        userSkill.setDecayScore(0);
        userSkill.setNeedsRevision(false);

        userSkillRepository.save(userSkill);

        return "Skill added successfully";
    }

    @PostMapping("/debug/age-skill")
    public String ageSkill(@RequestParam String skillName, @RequestParam int daysAgo, Principal principal) {
        UserEntity user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Skill skill = skillRepository.findByName(skillName)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        UserSkill userSkill = userSkillRepository.findByUserAndSkill(user, skill)
                .orElseThrow(() -> new RuntimeException("User skill not found"));

        // Set last practiced date to the past
        userSkill.setLastPracticedDate(LocalDate.now().minusDays(daysAgo));
        userSkillRepository.save(userSkill);

        // Force recalculation
        skillDecayService.calculateDecay();

        return "Skill '" + skillName + "' aged by " + daysAgo + " days. New Decay Score: " + userSkill.getDecayScore();
    }

    @GetMapping("/{id}/history")
    public java.util.List<com.skilldecaydetector.entity.UserSkillHistory> getSkillHistory(@PathVariable Long id) {
        return userSkillHistoryRepository.findByUserSkillIdOrderByDateAsc(id);
    }

    @GetMapping("/options")
    public java.util.List<Skill> getSkillOptions() {
        return skillRepository.findAll();
    }

}
