package com.skilldecaydetector.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.skilldecaydetector.service.SkillDecayService;

@Component
public class SkillDecayScheduler {

    private final SkillDecayService skillDecayService;

    public SkillDecayScheduler(SkillDecayService skillDecayService) {
        this.skillDecayService = skillDecayService;
    }

    @Scheduled(cron = "0 0 2 * * ?")
    public void runDailyDecayCheck() {
        skillDecayService.calculateDecay();
    }
}
