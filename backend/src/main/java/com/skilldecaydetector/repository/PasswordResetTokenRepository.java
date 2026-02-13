package com.skilldecaydetector.repository;

import com.skilldecaydetector.entity.PasswordResetToken;
import com.skilldecaydetector.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);

    Optional<PasswordResetToken> findByUser(UserEntity user);

    void deleteByToken(String token);
}
