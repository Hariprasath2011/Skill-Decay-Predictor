package com.skilldecaydetector.service;

import java.util.List;
import com.skilldecaydetector.dto.UserSkillGraphDTO;

public interface UserSkillGraphService {
    List<UserSkillGraphDTO> getUserSkillGraph(String userEmail);
}
