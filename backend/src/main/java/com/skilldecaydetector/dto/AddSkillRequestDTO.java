package com.skilldecaydetector.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AddSkillRequestDTO {

    @NotBlank(message = "Skill name is required")
    @Size(min = 2, max = 100)
    private String name;

    @Size(max = 100)
    private String category;

    @Size(max = 255)
    private String description;

    // ===== getters & setters =====

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
