package com.skilldecaydetector.controller;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.skilldecaydetector.dto.UserDashboardDTO;
import com.skilldecaydetector.dto.UserSkillResponseDTO;
import com.skilldecaydetector.entity.UserEntity;
import com.skilldecaydetector.entity.UserSkill;
import com.skilldecaydetector.repository.UserRepository;
import com.skilldecaydetector.repository.UserSkillRepository;

@RestController
@RequestMapping("/api/user/dashboard")
@PreAuthorize("hasRole('USER')")
public class UserDashboardController {

    private final UserRepository userRepository;
    private final UserSkillRepository userSkillRepository;

    public UserDashboardController(UserRepository userRepository,
                                   UserSkillRepository userSkillRepository) {
        this.userRepository = userRepository;
        this.userSkillRepository = userSkillRepository;
    }

    @GetMapping
    public UserDashboardDTO dashboard(Principal principal) {

        UserEntity user = userRepository
                .findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<UserSkill> skills = userSkillRepository.findByUser(user);

        UserDashboardDTO dto = new UserDashboardDTO();
        dto.setTotalSkills(skills.size());

        long revisionCount = skills.stream()
                .filter(UserSkill::isNeedsRevision)
                .count();

        dto.setNeedsRevision((int) revisionCount);

        dto.setSkills(
                skills.stream().map(us -> {
                    UserSkillResponseDTO s = new UserSkillResponseDTO();
                    s.setId(us.getId());
                    s.setSkillName(us.getSkill().getName());
                    s.setProficiencyLevel(us.getProficiencyLevel());
                    s.setDecayScore(us.getDecayScore());
                    s.setNeedsRevision(us.isNeedsRevision());
                    return s;
                }).collect(Collectors.toList())
        );

        return dto;
    }
}
