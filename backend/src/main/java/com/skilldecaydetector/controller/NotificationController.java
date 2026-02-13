package com.skilldecaydetector.controller;
import java.security.Principal;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldecaydetector.entity.Notification;
import com.skilldecaydetector.entity.UserEntity;
import com.skilldecaydetector.repository.NotificationRepository;
import com.skilldecaydetector.repository.UserRepository;

@RestController
@RequestMapping("/api/user/notifications")
public class NotificationController {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationController(
            NotificationRepository notificationRepository,
            UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Notification> getNotifications(Principal principal) {

        UserEntity user = userRepository
                .findByEmail(principal.getName())
                .orElseThrow();

        return notificationRepository.findByUserAndReadFalse(user);
    }
}
