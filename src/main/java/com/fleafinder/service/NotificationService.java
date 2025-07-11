package com.fleafinder.service;

import com.fleafinder.controller.dto.NotificationDTO;
import com.fleafinder.persistence.entity.NotificationEntity;
import com.fleafinder.persistence.entity.NotificationTypeEnum;
import com.fleafinder.persistence.entity.UserEntity;
import com.fleafinder.persistence.repository.NotificationRepository;
import com.fleafinder.persistence.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<NotificationDTO> getMyNotifications() {
        // Para MVP, usar el primer usuario
        UserEntity user = userRepository.findAll().stream().findFirst().orElse(null);
        return notificationRepository.findByUser_IdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<NotificationDTO> getUnreadNotifications() {
        // Para MVP, usar el primer usuario
        UserEntity user = userRepository.findAll().stream().findFirst().orElse(null);
        return notificationRepository.findByUser_IdAndIsReadFalse(user.getId())
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Long getUnreadCount() {
        // Para MVP, usar el primer usuario
        UserEntity user = userRepository.findAll().stream().findFirst().orElse(null);
        return notificationRepository.countByUser_IdAndIsReadFalse(user.getId());
    }

    @Transactional
    public void markAsRead(Long notificationId) {
        NotificationEntity notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        // Para MVP, no validar usuario
        notification.setIsRead(true);
        notificationRepository.save(notification);
    }

    @Transactional
    public void markAllAsRead() {
        // Para MVP, usar el primer usuario
        UserEntity user = userRepository.findAll().stream().findFirst().orElse(null);
        List<NotificationEntity> unreadNotifications =
                notificationRepository.findByUser_IdAndIsReadFalse(user.getId());
        unreadNotifications.forEach(notification -> notification.setIsRead(true));
        notificationRepository.saveAll(unreadNotifications);
    }

    @Transactional
    public void createNotification(Long userId, String title, String message, NotificationTypeEnum type) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        NotificationEntity notification = NotificationEntity.builder()
                .title(title)
                .message(message)
                .type(type)
                .isRead(false)
                .user(user)
                .build();

        notificationRepository.save(notification);
    }

    @Transactional
    public void sendBulkNotification(List<Long> userIds, String title, String message, NotificationTypeEnum type) {
        List<UserEntity> users = userRepository.findAllById(userIds);

        List<NotificationEntity> notifications = users.stream()
                .map(user -> NotificationEntity.builder()
                        .title(title)
                        .message(message)
                        .type(type)
                        .isRead(false)
                        .user(user)
                        .build())
                .collect(Collectors.toList());

        notificationRepository.saveAll(notifications);
    }

    private NotificationDTO convertToDTO(NotificationEntity notification) {
        return NotificationDTO.builder()
                .id(notification.getId())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .type(notification.getType())
                .isRead(notification.getIsRead())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}