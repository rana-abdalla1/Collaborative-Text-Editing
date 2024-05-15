package com.APT.APTBackend.service;

import com.APT.APTBackend.model.Documents;
import com.APT.APTBackend.model.Users;
import com.APT.APTBackend.repository.DocumentRepository;
import com.APT.APTBackend.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder)
    {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean verifyUserCredentials(String username, String password) {
        Optional<Users> user = userRepository.findByUsername(username);
        if (user != null) {
            return passwordEncoder.matches(password, user.get().getPassword());
        }
        return false;
    }

    public Optional<Users> getUser(String username) {
        return userRepository.findByUsername(username);
    }

    public Users createUser(Users user) {
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }

    public boolean checkUsernameExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }
}