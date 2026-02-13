package com.skilldecaydetector.serviceimplementation;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.skilldecaydetector.dto.UserSkillGraphDTO;
import com.skilldecaydetector.entity.UserEntity;
import com.skilldecaydetector.repository.UserRepository;
import com.skilldecaydetector.repository.UserSkillRepository;
import com.skilldecaydetector.service.UserSkillGraphService;

@Service
public class UserSkillGraphServiceImplementation implements UserSkillGraphService {

    private final UserRepository userRepository;
    private final UserSkillRepository userSkillRepository;

    public UserSkillGraphServiceImplementation(
            UserRepository userRepository,
            UserSkillRepository userSkillRepository) {
        this.userRepository = userRepository;
        this.userSkillRepository = userSkillRepository;
    }

    @Override
    public List<UserSkillGraphDTO> getUserSkillGraph(String userEmail) {

        UserEntity user = userRepository
                .findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return userSkillRepository.findByUser(user)
                .stream()
                .map(us -> {
                    UserSkillGraphDTO dto = new UserSkillGraphDTO();
                    dto.setSkillName(us.getSkill().getName());
                    dto.setProficiencyLevel(us.getProficiencyLevel());
                    dto.setDecayScore(us.getDecayScore());

                    long daysInactive = us.getLastPracticedDate() == null
                            ? 0
                            : ChronoUnit.DAYS.between(
                                    us.getLastPracticedDate(), LocalDate.now());

                    dto.setDaysInactive(daysInactive);
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
