package com.skilldecaydetector.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.skilldecaydetector.service.NotificationService;

@Component
public class NotificationScheduler {

    private final NotificationService notificationService;

    public NotificationScheduler(NotificationService notificationService) {
        this.notificationService = notificationService;
    }
    @Scheduled(cron = "0 0 9 * * ?")
    public void runDailyNotificationCheck() {
        notificationService.checkUpcomingSkillDecay();
    }
}
