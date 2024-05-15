package com.APT.APTBackend.service;

import com.APT.APTBackend.model.Documents;
import com.APT.APTBackend.model.Users;
import com.APT.APTBackend.repository.DocumentRepository;
import com.APT.APTBackend.repository.UserRepository;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private UserRepository userRepository;


    public List <getAllDocumentsResponse> getAllDocuments(String userID)
    {
        // Retrieve the user based on the userID
        System.out.println("User ID: " + userID);
        Users user = userRepository.findById(userID).orElse(null);
        if (user == null) {
            // Handle case where user is not found
            return null;
        }
        System.out.println("User: " + user.getUsername());
        // Retrieve all documents associated with the user
        List<Documents> allDocuments = documentRepository.findAll();
        ObjectId userId = new ObjectId(userID);

        List<getAllDocumentsResponse> userDocs = allDocuments.stream()
                .filter(document -> document.getUsers().containsKey(userId))
                .map(document -> {
                    getAllDocumentsResponse response = new getAllDocumentsResponse();
                    response.setDocumentId(document.getId().toString());
                    response.setDocumentName(document.getName());
                    response.setRole(document.getUsers().get(userId));
                    response.setOwnerName(document.getOwnerName());
                    return response;
                })
                .collect(Collectors.toList());

        return userDocs;


    }

    public void createDocument(String documentName, ObjectId userID)
    {
        Documents document = new Documents();
        document.setName(documentName);
        System.out.println("Document name: " + documentName);

        Optional<Users> user = userRepository.findById(userID.toString());
        if (user.isPresent()) {
            System.out.println("User: " + user.get().getUsername());

            // Create a new list for users and add the retrieved user
            Map<ObjectId, String> newUsers = new HashMap<>();

            newUsers.put(user.get().getId(), "editor");

            System.out.println("User ID: " + user.get().getId().toString());
            // Set the users list to the document
            document.setUsers(newUsers);
            document.setOwnerName(user.get().getUsername());

            // Save the document
            documentRepository.insert(document);
        } else {
            System.out.println("User not found");
        }
    }

    public boolean deleteDocumentById(String documentId, String userId) {
        // Check if the document exists
        System.out.println("Document ID: " + documentId);
        System.out.println("Document name: " + documentRepository.findById(documentId).get().getName());
        if (documentRepository.existsById(documentId))
        {
            System.out.println("Document exists!");
            System.out.println("userId"+ userId);
            if(Objects.equals(documentRepository.findById(documentId).get().getOwnerName(), userRepository.findById(userId).get().getUsername()))
            {
                documentRepository.deleteById(documentId);
                return true;
            }
            //remove the user from the array of users in that document
            Documents document = documentRepository.findById(documentId).get();
            document.getUsers().remove(new ObjectId(userId));
            documentRepository.save(document);
            return true;

        }
        else
        {
            return false;
        }
    }

    public boolean renameDocumentById(String documentId, String newName) {
        // Check if the document exists
        if (documentRepository.existsById(documentId)) {
            // Retrieve the document
            Documents document = documentRepository.findById(documentId).get();
            // Set the new name
            document.setName(newName);
            // Save the updated document
            documentRepository.save(document);
            return true;
        } else {
            return false;
        }
    }

    public boolean shareDocument(String documentId, String username, String role) {
        // Check if the document exists
        if (documentRepository.existsById(documentId)) {
            // Retrieve the document
            Documents document = documentRepository.findById(documentId).get();
            // Add the user to the document
            Optional<Users> user = userRepository.findByUsername(username);
            if (user.isEmpty()) {
                return false;
            }
            ObjectId userId = user.get().getId();
            document.getUsers().put(userId, role);
            // Save the updated document
            documentRepository.save(document);
            return true;
        } else {
            return false;
        }
    }

    @Data
    public static class getAllDocumentsResponse{
        @JsonProperty("documentName")
        private String documentName;
        @JsonProperty("documentId")
        private String documentId;
        @JsonProperty("role")
        private String role;
        @JsonProperty("ownerName")
        private String ownerName;

        public getAllDocumentsResponse()
        {
        }
    }
}

