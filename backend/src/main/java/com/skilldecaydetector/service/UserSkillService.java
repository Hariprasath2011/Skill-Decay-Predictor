package com.skilldecaydetector.service;

import com.skilldecaydetector.dto.AddUserSkillRequestDTO;


public interface UserSkillService {
    void addSkill(AddUserSkillRequestDTO request, String userEmail);
}
