package com.skilldecaydetector.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.skilldecaydetector.dto.AuthRequestDTO;
import com.skilldecaydetector.dto.LoginRequestDTO;
import com.skilldecaydetector.dto.RegisterRequestDTO;
import com.skilldecaydetector.entity.Role;
import com.skilldecaydetector.entity.UserEntity;
import com.skilldecaydetector.repository.RoleRepository;
import com.skilldecaydetector.repository.UserRepository;
import com.skilldecaydetector.util.JwtUtil;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {

        private final AuthenticationManager authenticationManager;
        private final UserRepository userRepository;
        private final RoleRepository roleRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtUtil jwtUtil;

        public AuthenticationController(
                        AuthenticationManager authenticationManager,
                        UserRepository userRepository,
                        RoleRepository roleRepository,
                        PasswordEncoder passwordEncoder,
                        JwtUtil jwtUtil) {

                this.authenticationManager = authenticationManager;
                this.userRepository = userRepository;
                this.roleRepository = roleRepository;
                this.passwordEncoder = passwordEncoder;
                this.jwtUtil = jwtUtil;
        }

        // ---------- REGISTER ----------
        @PostMapping("/register")
        public ResponseEntity<?> register(@RequestBody AuthRequestDTO dto) {

                if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
                        return ResponseEntity.badRequest().body("Email already exists");
                }

                UserEntity user = new UserEntity();
                user.setEmail(dto.getEmail());
                user.setPassword(passwordEncoder.encode(dto.getPassword()));
                user.setEnabled(true);

                Role role = roleRepository.findByName("ROLE_USER")
                                .orElseThrow(() -> new RuntimeException("ROLE_USER not found"));

                user.getRoles().add(role);
                userRepository.save(user);

                return ResponseEntity.ok("User registered successfully");
        }

        // ---------- LOGIN ----------
        @PostMapping("/login")
        public ResponseEntity<?> login(@RequestBody AuthRequestDTO dto) {

                Authentication authentication = authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                dto.getEmail(),
                                                dto.getPassword()));

                UserEntity user = userRepository.findByEmail(dto.getEmail())
                                .orElseThrow();

                String token = jwtUtil.generateAccessToken(user);

                // 🔥 RETURN JSON (KEY FIX)
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("email", user.getEmail());
                response.put(
                                "roles",
                                user.getRoles().stream().map(Role::getName).toList());

                return ResponseEntity.ok(response);
        }
}
