package com.project.demo.ProfileController;

import com.project.demo.ProfileService.UserProfileService;
import com.project.demo.dto.UserProfileDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/userprofile")
public class UserProfileController {

    private final UserProfileService userProfileService;

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestParam String username) {
        try {
            UserProfileDTO userProfile = userProfileService.getUserProfileByUsername(username);
            return ResponseEntity.status(HttpStatus.OK).body(userProfile);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }
}
