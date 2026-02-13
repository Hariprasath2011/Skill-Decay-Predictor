package com.skilldecaydetector.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldecaydetector.entity.UserEntity;
import com.skilldecaydetector.repository.SkillRepository;
import com.skilldecaydetector.repository.UserRepository;
import com.skilldecaydetector.repository.UserSkillRepository;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

        private final UserRepository userRepository;
        private final SkillRepository skillRepository;
        private final UserSkillRepository userSkillRepository;
        private final com.skilldecaydetector.service.SkillDecayService skillDecayService;

        public AdminController(UserRepository userRepository,
                        SkillRepository skillRepository,
                        UserSkillRepository userSkillRepository,
                        com.skilldecaydetector.service.SkillDecayService skillDecayService) {
                this.userRepository = userRepository;
                this.skillRepository = skillRepository;
                this.userSkillRepository = userSkillRepository;
                this.skillDecayService = skillDecayService;
        }

        @GetMapping("/users")
        public List<UserEntity> getAllUsers() {
                return userRepository.findAll();
        }

        @GetMapping("/stats")
        public Map<String, Object> getStats() {
                long totalUsers = userRepository.count();
                long totalSkills = skillRepository.count();
                long totalUserSkills = userSkillRepository.count();

                return Map.of(
                                "totalUsers", totalUsers,
                                "totalSkills", totalSkills,
                                "totalUserSkills", totalUserSkills);
        }

        @GetMapping("/users/{userId}/skills")
        public List<com.skilldecaydetector.entity.UserSkill> getUserSkills(
                        @org.springframework.web.bind.annotation.PathVariable Long userId) {
                UserEntity user = userRepository.findById(userId)
                                .orElseThrow(() -> new RuntimeException("User not found"));
                return userSkillRepository.findByUser(user);
        }

        @org.springframework.web.bind.annotation.PostMapping("/trigger-decay")
        public String manuallyTriggerDecay() {
                skillDecayService.calculateDecay();
                return "Decay calculation triggered successfully";
        }

        @org.springframework.web.bind.annotation.PostMapping("/users/{userId}/skills/{skillId}/simulate-decay")
        public String simulateSkillDecay(
                        @org.springframework.web.bind.annotation.PathVariable Long userId,
                        @org.springframework.web.bind.annotation.PathVariable Long skillId,
                        @org.springframework.web.bind.annotation.RequestParam int days) {

                UserEntity user = userRepository.findById(userId)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                com.skilldecaydetector.entity.Skill skill = skillRepository.findById(skillId)
                                .orElseThrow(() -> new RuntimeException("Skill not found"));

                com.skilldecaydetector.entity.UserSkill userSkill = userSkillRepository.findByUserAndSkill(user, skill)
                                .orElseThrow(() -> new RuntimeException("User skill not found"));

                // Age the skill
                userSkill.setLastPracticedDate(java.time.LocalDate.now().minusDays(days));
                userSkillRepository.save(userSkill);

                // Force calculation
                skillDecayService.calculateDecay();

                return "Skill aged by " + days + " days. New Score: " + userSkill.getDecayScore();
        }
}