package com.APT.APTBackend.controller;

import com.APT.APTBackend.model.CreateDocumentRequest;
import com.APT.APTBackend.model.Documents;
import com.APT.APTBackend.service.DocumentService;
import com.APT.APTBackend.service.UserService;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/documents")
public class DocumentController {


    @Autowired
    private DocumentService documentService;

    @Autowired
    private CreateDocumentRequest createDocumentRequest;

    @PostMapping("/create")
    public ResponseEntity<String> createDocument(@RequestBody CreateDocumentRequest createDocumentRequest)
    {
        System.out.println("Creating document");
        ObjectId userIdObject = new ObjectId(createDocumentRequest.getUserID());
        documentService.createDocument(createDocumentRequest.getDocumentName(), userIdObject);
        return ResponseEntity.ok("Document created successfully!");
    }

    @GetMapping("/getAllDocuments")
    public ResponseEntity<List <DocumentService.getAllDocumentsResponse>> getDocuments(@RequestParam String userID)
    {
        List <DocumentService.getAllDocumentsResponse> docs = documentService.getAllDocuments(userID);

        if(docs == null)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(docs);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteDocument(@RequestParam String documentId, @RequestParam String userId)
    {
        // Call the service method to delete the document
        System.out.println("Deleting document with ID: " + documentId  + userId );
        boolean deleted = documentService.deleteDocumentById(documentId, userId);

        // Check if the document was successfully deleted
        if (deleted) {
            return ResponseEntity.ok("Document deleted successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Document not found");
        }
    }

    //define a rename document endpoint
    @PutMapping("/rename")
    public ResponseEntity<String> renameDocument(@RequestBody DocumentRequest request, @RequestParam String newName)
    {
        // Call the service method to rename the document
        boolean renamed = documentService.renameDocumentById(request.getDocumentId(), newName);

        // Check if the document was successfully renamed
        if (renamed) {
            return ResponseEntity.ok("Document renamed successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Document not found");
        }
    }

    //share document with user
    @PutMapping("/share")
    public ResponseEntity<String> shareDocument(@RequestBody DocumentRequest request, @RequestParam String username, @RequestParam String role)
    {
        // Call the service method to share the document with the user
        boolean shared = documentService.shareDocument(request.getDocumentId(), username, role);

        // Check if the document was successfully shared
        if (shared) {
            return ResponseEntity.ok("Document shared successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Document not found");
        }
    }

    @Data
    public static class DocumentRequest {
        @JsonProperty("documentId")
        private String documentId;
        public DocumentRequest()
        {
        }
    }

    @Data
    public static class deleteDocumentRequest {
        @JsonProperty("documentId")
        private String documentId;
        @JsonProperty("userId")
        private String userId;
        public deleteDocumentRequest()
        {
        }
    }



}