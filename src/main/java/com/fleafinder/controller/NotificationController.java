package com.fleafinder.controller;

import com.fleafinder.controller.dto.NotificationDTO;
import com.fleafinder.persistence.entity.NotificationTypeEnum;
import com.fleafinder.service.NotificationService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/my-notifications")
    public ResponseEntity<List<NotificationDTO>> getMyNotifications() {
        List<NotificationDTO> notifications = notificationService.getMyNotifications();
        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/unread")
    public ResponseEntity<List<NotificationDTO>> getUnreadNotifications() {
        List<NotificationDTO> notifications = notificationService.getUnreadNotifications();
        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/unread/count")
    public ResponseEntity<Long> getUnreadCount() {
        Long count = notificationService.getUnreadCount();
        return ResponseEntity.ok(count);
    }

    @PutMapping("/mark-as-read/{id}")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/mark-all-as-read")
    public ResponseEntity<Void> markAllAsRead() {
        notificationService.markAllAsRead();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/send-bulk")
    public ResponseEntity<Void> sendBulkNotification(@RequestBody BulkNotificationRequest request) {
        notificationService.sendBulkNotification(request.getUserIds(), request.getTitle(),
                request.getMessage(), request.getType());
        return ResponseEntity.ok().build();
    }

    @Data
    public static class BulkNotificationRequest {
        private List<Long> userIds;
        private String title;
        private String message;
        private NotificationTypeEnum type;
    }
}