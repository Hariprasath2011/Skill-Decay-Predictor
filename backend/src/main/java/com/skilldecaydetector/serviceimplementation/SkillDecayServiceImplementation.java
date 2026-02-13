package com.skilldecaydetector.serviceimplementation;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.skilldecaydetector.entity.UserSkill;
import com.skilldecaydetector.repository.UserSkillRepository;
import com.skilldecaydetector.service.SkillDecayService;

@Service
@Transactional
public class SkillDecayServiceImplementation implements SkillDecayService {

    private final UserSkillRepository userSkillRepository;
    private final com.skilldecaydetector.repository.UserSkillHistoryRepository userSkillHistoryRepository;
    private final com.skilldecaydetector.service.EmailService emailService;

    public SkillDecayServiceImplementation(UserSkillRepository userSkillRepository,
            com.skilldecaydetector.repository.UserSkillHistoryRepository userSkillHistoryRepository,
            com.skilldecaydetector.service.EmailService emailService) {
        this.userSkillRepository = userSkillRepository;
        this.userSkillHistoryRepository = userSkillHistoryRepository;
        this.emailService = emailService;
    }

    @Override
    @org.springframework.scheduling.annotation.Scheduled(cron = "0 0 0 * * ?") // Run at midnight
    public void calculateDecay() {

        List<UserSkill> skills = userSkillRepository.findAll();

        LocalDate today = LocalDate.now();

        for (UserSkill us : skills) {

            if (us.getLastPracticedDate() == null)
                continue;

            long daysInactive = ChronoUnit.DAYS.between(
                    us.getLastPracticedDate(), today);

            double decayIncrement = getDecayIncrement(
                    us.getProficiencyLevel(), daysInactive);

            if (decayIncrement > 0) {
                us.setDecayScore(decayIncrement);

                if (us.getDecayScore() >= 10) {
                    us.setNeedsRevision(true);

                    emailService.sendSimpleMessage(
                            us.getUser().getEmail(),
                            "Skill Decay Alert: " + us.getSkill().getName(),
                            "Warning! Your skill '" + us.getSkill().getName() + "' has decayed significantly (Score: "
                                    + us.getDecayScore() + ").\n" +
                                    "It is recommended to take an assessment or practice immediately to restore your proficiency.");
                }

                // Save History
                com.skilldecaydetector.entity.UserSkillHistory history = new com.skilldecaydetector.entity.UserSkillHistory(
                        us, today, us.getProficiencyLevel(), us.getDecayScore());
                userSkillHistoryRepository.save(history);
            }
        }
    }

    private double getDecayIncrement(int level, long daysInactive) {

        return switch (level) {
            case 1 -> daysInactive > 7 ? (daysInactive - 7) * 1.5 : 0;
            case 2 -> daysInactive > 14 ? (daysInactive - 14) * 1.0 : 0;
            case 3 -> daysInactive > 30 ? (daysInactive - 30) * 0.5 : 0;
            default -> 0;
        };
    }
}
