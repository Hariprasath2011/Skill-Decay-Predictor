package com.skilldecaydetector.controller;

import com.skilldecaydetector.dto.LeaderboardDTO;
import com.skilldecaydetector.repository.UserSkillRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderboardController {

    private final UserSkillRepository userSkillRepository;

    public LeaderboardController(UserSkillRepository userSkillRepository) {
        this.userSkillRepository = userSkillRepository;
    }

    @GetMapping
    public List<LeaderboardDTO> getLeaderboard() {
        AtomicInteger rankCounter = new AtomicInteger(1);
        return userSkillRepository.findLeaderboardStats().stream()
                .map(dto -> {
                    dto.setRank(rankCounter.getAndIncrement());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
