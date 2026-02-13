package com.skilldecaydetector.controller;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.skilldecaydetector.dto.SkillAssessmentRequestDTO;
import com.skilldecaydetector.service.AssessmentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user/assessment")
public class AssessmentController {

    private final AssessmentService assessmentService;

    public AssessmentController(AssessmentService assessmentService) {
        this.assessmentService = assessmentService;
    }

    @PostMapping
    public ResponseEntity<?> submitAssessment(
            @Valid @RequestBody SkillAssessmentRequestDTO request,
            Principal principal) {

        assessmentService.submitAssessment(request, principal.getName());
        return ResponseEntity.ok("Assessment submitted successfully");
    }

    @GetMapping("/history")
    public ResponseEntity<?> getAssessmentHistory(Principal principal) {
        return ResponseEntity.ok(assessmentService.getHistory(principal.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAssessmentDetails(@PathVariable Long id, Principal principal) {
        return ResponseEntity.ok(assessmentService.getAssessmentById(id, principal.getName()));
    }
}
