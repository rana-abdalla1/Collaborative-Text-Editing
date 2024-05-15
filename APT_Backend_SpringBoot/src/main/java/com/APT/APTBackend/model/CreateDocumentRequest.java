package com.APT.APTBackend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
public class CreateDocumentRequest {
    private String userID;
    private String documentName;

    // No-argument constructor
    public CreateDocumentRequest() {
    }

    // Getters and setters
}