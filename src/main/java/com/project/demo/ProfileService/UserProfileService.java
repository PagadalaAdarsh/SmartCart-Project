package com.project.demo.ProfileService;

import com.project.demo.dto.UserProfileDTO;
import com.project.demo.entity.User;
import com.project.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {

    private final UserRepository userRepository;

    public UserProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserProfileDTO getUserProfileByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserProfileDTO(user.getUserid(), user.getUsername(), user.getEmail(), user.getRole().name());
    }
}
