package com.skilldecaydetector.service;

import java.util.List;
import com.skilldecaydetector.entity.UserAnswer;
import com.skilldecaydetector.entity.UserEntity;

public interface UserAnswerService {
    UserAnswer saveAnswer(UserAnswer answer);
    List<UserAnswer> getUserAnswers(UserEntity user);
}
