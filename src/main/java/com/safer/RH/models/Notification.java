package com.safer.RH.models;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class Notification {
    private String message;
    private String type; // info, success, warning, error
    private LocalDateTime timestamp;

}