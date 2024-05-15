package com.APT.APTBackend;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class CustomIdGenerator {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS");

    public static String generateId() {
        LocalDateTime now = LocalDateTime.now();
        return now.format(FORMATTER);
    }
}
