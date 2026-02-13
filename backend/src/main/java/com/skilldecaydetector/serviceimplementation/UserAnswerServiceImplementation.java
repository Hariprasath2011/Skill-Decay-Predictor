package com.skilldecaydetector.serviceimplementation;

import java.util.List;
import org.springframework.stereotype.Service;
import com.skilldecaydetector.entity.UserAnswer;
import com.skilldecaydetector.entity.UserEntity;
import com.skilldecaydetector.repository.UserAnswerRepository;
import com.skilldecaydetector.service.UserAnswerService;

@Service
public class UserAnswerServiceImplementation implements UserAnswerService {

    private final UserAnswerRepository userAnswerRepository;

    public UserAnswerServiceImplementation(UserAnswerRepository userAnswerRepository) {
        this.userAnswerRepository = userAnswerRepository;
    }

    public UserAnswer saveAnswer(UserAnswer answer) {
        return userAnswerRepository.save(answer);
    }

    public List<UserAnswer> getUserAnswers(UserEntity user) {
        return userAnswerRepository.findByUser(user);
    }
}
