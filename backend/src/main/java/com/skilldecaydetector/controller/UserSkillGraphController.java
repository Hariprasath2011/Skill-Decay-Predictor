package com.skilldecaydetector.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.skilldecaydetector.dto.UserSkillGraphDTO;
import com.skilldecaydetector.service.UserSkillGraphService;

@RestController
@RequestMapping("/api/user/graph")
public class UserSkillGraphController {

    private final UserSkillGraphService graphService;

    public UserSkillGraphController(UserSkillGraphService graphService) {
        this.graphService = graphService;
    }

    @GetMapping
    public List<UserSkillGraphDTO> getGraphData(Principal principal) {
        return graphService.getUserSkillGraph(principal.getName());
    }
}
