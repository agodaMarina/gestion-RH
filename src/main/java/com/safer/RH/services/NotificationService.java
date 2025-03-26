package com.safer.RH.services;

import com.safer.RH.models.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class NotificationService {
    private final SimpMessagingTemplate messagingTemplate;

    public NotificationService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void envoyerNotification(String message, String type) {
        Notification notification = new Notification(
                message,
                type,
                LocalDateTime.now()
        );
        messagingTemplate.convertAndSend("/topic/notifications", notification);
    }
}