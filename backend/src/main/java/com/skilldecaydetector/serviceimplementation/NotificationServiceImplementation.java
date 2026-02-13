package com.skilldecaydetector.serviceimplementation;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.skilldecaydetector.entity.Notification;
import com.skilldecaydetector.entity.UserSkill;
import com.skilldecaydetector.repository.NotificationRepository;
import com.skilldecaydetector.repository.UserSkillRepository;
import com.skilldecaydetector.service.NotificationService;

@Service
@Transactional
public class NotificationServiceImplementation implements NotificationService {

    private final UserSkillRepository userSkillRepository;
    private final NotificationRepository notificationRepository;

    public NotificationServiceImplementation(
            UserSkillRepository userSkillRepository,
            NotificationRepository notificationRepository) {
        this.userSkillRepository = userSkillRepository;
        this.notificationRepository = notificationRepository;
    }

    @Override
    public void checkUpcomingSkillDecay() {

        List<UserSkill> skills = userSkillRepository.findAll();
        LocalDate today = LocalDate.now();

        for (UserSkill us : skills) {

            if (us.getLastPracticedDate() == null) continue;

            long inactiveDays = ChronoUnit.DAYS.between(
                    us.getLastPracticedDate(), today);

            int threshold = switch (us.getProficiencyLevel()) {
                case 1 -> 7;
                case 2 -> 14;
                case 3 -> 30;
                default -> 0;
            };

            long daysLeft = threshold - inactiveDays;

            if (daysLeft > 0 && daysLeft <= 10) {

                Notification n = new Notification();
                n.setUser(us.getUser());
                n.setMessage(
                    "Your skill '" + us.getSkill().getName() +
                    "' may decay in " + daysLeft + " days. Practice soon!"
                );

                notificationRepository.save(n);
            }
        }
    }
}
