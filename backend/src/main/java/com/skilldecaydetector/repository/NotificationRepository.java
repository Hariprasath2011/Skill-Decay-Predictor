package com.skilldecaydetector.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldecaydetector.entity.Notification;
import com.skilldecaydetector.entity.UserEntity;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByUserAndReadFalse(UserEntity user);
}
