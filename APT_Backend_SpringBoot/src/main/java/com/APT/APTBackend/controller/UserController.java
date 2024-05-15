package com.APT.APTBackend.controller;

import com.APT.APTBackend.model.Users;
import com.APT.APTBackend.service.UserService;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/signup")
    public ResponseEntity<UserSignUpRequest> createUser(@RequestBody Users user) {
        Users userOut = userService.createUser(user);

        System.out.println("User created successfully!");

        UserSignUpRequest response = new UserSignUpRequest();
        response.setUserId(userOut.getId().toString());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Users user) {
        boolean isAuthenticated = userService.verifyUserCredentials(user.getUsername(), user.getPassword());
        if (isAuthenticated) {
            Optional<Users> userOptional = userService.getUser(user.getUsername());
            if (userOptional.isPresent()) {
                Users loggedInUser = userOptional.get();
                System.out.println("User logged in successfully with id: " + loggedInUser.getId());

                // Return the entire User object in JSON format
                return ResponseEntity.status(HttpStatus.OK).body(loggedInUser);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping("/isUsernameTaken")
    public ResponseEntity<String> checkUsername(@RequestParam String username)
    {
        boolean exists = userService.checkUsernameExists(username);
        if (exists)
        {
            return ResponseEntity.ok("Username is already taken");
        } else
        {
            return ResponseEntity.ok("Username is available");
        }
    }

    //share document with user
    @Data
    public static class UserSignUpRequest {
        @JsonProperty("userId")
        private String userId;
        public UserSignUpRequest()
        {
        }
    }
}


