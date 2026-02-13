package com.skilldecaydetector.config;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.skilldecaydetector.entity.UserEntity;
import com.skilldecaydetector.repository.UserRepository;
import com.skilldecaydetector.util.JwtUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        String email = oauthToken.getPrincipal().getAttribute("email");

        // Name fields currently unused in UserEntity creation
        // String name = oauthToken.getPrincipal().getAttribute("name");
        // String firstName = oauthToken.getPrincipal().getAttribute("given_name");
        // String lastName = oauthToken.getPrincipal().getAttribute("family_name");

        Optional<UserEntity> userOptional = userRepository.findByEmail(email);
        UserEntity user;

        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            // Register new user from Google
            user = new UserEntity();
            user.setEmail(email);
            // user.setFirstName(firstName); // Not available in UserEntity yet
            // user.setLastName(lastName); // Not available in UserEntity yet
            user.setPassword("");

            // Assign default role (assuming Role entity mapping exists or needs strict
            // handling)
            // For now, if roles are complex, we might skip or assign a default if method
            // exists
            // user.setRole("ROLE_USER");
        }

        // Generate JWT using the correct method
        String token = jwtUtil.generateAccessToken(user);

        // Redirect to frontend with token
        // Use a configured redirect URI or hardcode for now for development
        String targetUrl = "http://localhost:5173/oauth2/redirect?token=" + token;

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
