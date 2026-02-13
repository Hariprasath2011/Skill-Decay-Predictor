package com.skilldecaydetector.serviceimplementation;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SkillDecayAIService {

    private final RestTemplate restTemplate = new RestTemplate();

    public int predictDecay(int days, int proficiency) {
        Map<String, Object> req = Map.of(
            "days_since_last_practice", days,
            "proficiency", proficiency
        );

        Map res = restTemplate.postForObject(
            "http://localhost:8000/predict",
            req,
            Map.class
        );

        return (Integer) res.get("decay_score");
    }
}
