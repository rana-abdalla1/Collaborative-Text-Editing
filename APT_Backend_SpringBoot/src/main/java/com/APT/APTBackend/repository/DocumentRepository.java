package com.APT.APTBackend.repository;

import com.APT.APTBackend.model.Documents;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DocumentRepository extends MongoRepository<Documents, String> {

}