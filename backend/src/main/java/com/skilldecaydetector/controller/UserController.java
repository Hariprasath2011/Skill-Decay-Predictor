package com.skilldecaydetector.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.skilldecaydetector.entity.UserEntity;
import com.skilldecaydetector.entity.UserSkill;
import com.skilldecaydetector.repository.UserRepository;
import com.skilldecaydetector.repository.UserSkillRepository;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSkillRepository userSkillRepository;

    @GetMapping("/skills")
    public List<UserSkill> getSkills(Principal principal) {

        UserEntity user = userRepository.findByEmail(principal.getName()).orElseThrow();

        return userSkillRepository.findByUser(user);
    }

    @GetMapping("/profile")
    public com.skilldecaydetector.dto.UserProfileDTO getProfile(Principal principal) {
        UserEntity user = userRepository.findByEmail(principal.getName()).orElseThrow();
        com.skilldecaydetector.entity.UserProfile profile = user.getUserProfile();

        com.skilldecaydetector.dto.UserProfileDTO dto = new com.skilldecaydetector.dto.UserProfileDTO();
        if (profile != null) {
            dto.setFirstName(profile.getFirstName());
            dto.setLastName(profile.getLastName());
            dto.setEducation(profile.getEducation());
            dto.setLinkedinUrl(profile.getLinkedinUrl());
            dto.setLeetcodeUrl(profile.getLeetcodeUrl());
            dto.setGithubUrl(profile.getGithubUrl());
            dto.setYoutubeUrl(profile.getYoutubeUrl());
            dto.setOtherUrl(profile.getOtherUrl());
        }
        return dto;
    }

    @PostMapping("/profile")
    public String updateProfile(@RequestBody com.skilldecaydetector.dto.UserProfileDTO dto, Principal principal) {
        UserEntity user = userRepository.findByEmail(principal.getName()).orElseThrow();
        com.skilldecaydetector.entity.UserProfile profile = user.getUserProfile();

        if (profile == null) {
            profile = new com.skilldecaydetector.entity.UserProfile();
            profile.setUser(user);
        }

        profile.setFirstName(dto.getFirstName());
        profile.setLastName(dto.getLastName());
        profile.setEducation(dto.getEducation());
        profile.setLinkedinUrl(dto.getLinkedinUrl());
        profile.setLeetcodeUrl(dto.getLeetcodeUrl());
        profile.setGithubUrl(dto.getGithubUrl());
        profile.setYoutubeUrl(dto.getYoutubeUrl());
        profile.setOtherUrl(dto.getOtherUrl());

        user.setUserProfile(profile);
        userRepository.save(user); // Cascades to profile

        return "Profile updated successfully";
    }

    @GetMapping("/{userId}/profile")
    public com.skilldecaydetector.dto.UserProfileDTO getUserProfileById(@PathVariable Long userId) {
        UserEntity user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        com.skilldecaydetector.entity.UserProfile profile = user.getUserProfile();

        com.skilldecaydetector.dto.UserProfileDTO dto = new com.skilldecaydetector.dto.UserProfileDTO();
        if (profile != null) {
            dto.setFirstName(profile.getFirstName());
            dto.setLastName(profile.getLastName());
            dto.setEducation(profile.getEducation());
            dto.setLinkedinUrl(profile.getLinkedinUrl());
            dto.setLeetcodeUrl(profile.getLeetcodeUrl());
            dto.setGithubUrl(profile.getGithubUrl());
            dto.setYoutubeUrl(profile.getYoutubeUrl());
            dto.setOtherUrl(profile.getOtherUrl());
        } else {
            // Return basic info if profile doesn't exist yet but user does
            dto.setFirstName("User");
            dto.setLastName("");
        }
        return dto;
    }
}
