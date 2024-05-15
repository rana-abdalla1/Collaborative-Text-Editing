package com.APT.APTBackend;

import com.APT.APTBackend.model.Documents;
import com.APT.APTBackend.repository.DocumentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.APT.APTBackend.repository.UserRepository;

@SpringBootApplication
public class AptBackendApplication {

	public static void main(String[] args) {

		SpringApplication.run(AptBackendApplication.class, args);


	}

//	@Bean
//	CommandLineRunner runner(UserRepository userRepository, DocumentRepository documentRepository) {
//		return args -> {
//			userRepository.save(new User());
//			documentRepository.save(new Documents());
//		};
//	}
}
