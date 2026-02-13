package com.skilldecaydetector.serviceimplementation;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.skilldecaydetector.dto.AssessmentQuestionDTO;
import com.skilldecaydetector.service.AIQuestionService;

@Service
public class AIQuestionServiceImplementation implements AIQuestionService {

        @Override
        public List<AssessmentQuestionDTO> generateQuestions(String skillName, int proficiencyLevel) {
                // Create a pool of varied questions
                List<AssessmentQuestionDTO> pool = new ArrayList<>();

                AssessmentQuestionDTO q1 = new AssessmentQuestionDTO();
                q1.setQuestion("What is the primary use of " + skillName + "?");
                q1.setOptions(List.of("Data storage", "Programming / development", "Operating system", "Networking"));
                q1.setCorrectIndex(1);
                pool.add(q1);

                AssessmentQuestionDTO q2 = new AssessmentQuestionDTO();
                q2.setQuestion("Which concept is MOST important in " + skillName + "?");
                q2.setOptions(List.of("Loops", "Variables", "Best practices", "Frameworks"));
                q2.setCorrectIndex(2);
                pool.add(q2);

                AssessmentQuestionDTO q3 = new AssessmentQuestionDTO();
                q3.setQuestion("How would you rate the difficulty of " + skillName + "?");
                q3.setOptions(List.of("Very Easy", "Easy", "Moderate", "Hard"));
                q3.setCorrectIndex(2);
                pool.add(q3);

                AssessmentQuestionDTO q4 = new AssessmentQuestionDTO();
                q4.setQuestion("What is a common error in " + skillName + "?");
                q4.setOptions(List.of("Syntax Error", "Network Timeout", "404 Not Found", "Blue Screen"));
                q4.setCorrectIndex(0);
                pool.add(q4);

                AssessmentQuestionDTO q5 = new AssessmentQuestionDTO();
                q5.setQuestion("Which tool is best for " + skillName + "?");
                q5.setOptions(List.of("Text Editor", "IDE", "Spreadsheet", "Browser"));
                q5.setCorrectIndex(1);
                pool.add(q5);

                AssessmentQuestionDTO q6 = new AssessmentQuestionDTO();
                q6.setQuestion("What is the file extension for " + skillName + "?");
                q6.setOptions(List.of(".txt", ".exe", "Depends on language", ".jpg"));
                q6.setCorrectIndex(2);
                pool.add(q6);

                AssessmentQuestionDTO q7 = new AssessmentQuestionDTO();
                q7.setQuestion("Is " + skillName + " object-oriented?");
                q7.setOptions(List.of("Yes", "No", "Partially", "Not applicable"));
                q7.setCorrectIndex(2);
                pool.add(q7);

                AssessmentQuestionDTO q8 = new AssessmentQuestionDTO();
                q8.setQuestion("Which company created " + skillName + " (if any)?");
                q8.setOptions(List.of("Microsoft", "Google", "Oracle/Sun", "Open Source / Various"));
                q8.setCorrectIndex(3);
                pool.add(q8);

                AssessmentQuestionDTO q9 = new AssessmentQuestionDTO();
                q9.setQuestion("What is a keyword often associated with " + skillName + "?");
                q9.setOptions(List.of("Select", "Voit", "Public", "Def"));
                q9.setCorrectIndex(2);
                pool.add(q9);

                AssessmentQuestionDTO q10 = new AssessmentQuestionDTO();
                q10.setQuestion("Which memory management model does " + skillName + " use?");
                q10.setOptions(List.of("Manual", "Garbage Collection", "Reference Counting", "None"));
                q10.setCorrectIndex(1);
                pool.add(q10);

                AssessmentQuestionDTO q11 = new AssessmentQuestionDTO();
                q11.setQuestion("What is the entry point for " + skillName + "?");
                q11.setOptions(List.of("main()", "index.html", "start()", "init()"));
                q11.setCorrectIndex(0);
                pool.add(q11);

                AssessmentQuestionDTO q12 = new AssessmentQuestionDTO();
                q12.setQuestion("Which of these is a framework for " + skillName + "?");
                q12.setOptions(List.of("Spring", "React", "Django", "All/Any of above depending on context"));
                q12.setCorrectIndex(3);
                pool.add(q12);

                AssessmentQuestionDTO q13 = new AssessmentQuestionDTO();
                q13.setQuestion("Is " + skillName + " compiled or interpreted?");
                q13.setOptions(List.of("Compiled", "Interpreted", "Both/Hybrid", "Neither"));
                q13.setCorrectIndex(2);
                pool.add(q13);

                AssessmentQuestionDTO q14 = new AssessmentQuestionDTO();
                q14.setQuestion("What is the community usage of " + skillName + "?");
                q14.setOptions(List.of("Declining", "Stable", "Growing rapidly", "Obsolete"));
                q14.setCorrectIndex(1);
                pool.add(q14);

                AssessmentQuestionDTO q15 = new AssessmentQuestionDTO();
                q15.setQuestion("Which IDE is NOT typically using for " + skillName + "?");
                q15.setOptions(List.of("IntelliJ", "Eclipse", "Visual Studio Code", "MS Word"));
                q15.setCorrectIndex(3);
                pool.add(q15);

                // Shuffle and pick 3
                Collections.shuffle(pool);
                return pool.subList(0, Math.min(pool.size(), 3));
        }
}
