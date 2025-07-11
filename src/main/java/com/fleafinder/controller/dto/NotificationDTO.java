package com.fleafinder.controller.dto;

import com.fleafinder.persistence.entity.NotificationTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {
    private Long id;
    private String title;
    private String message;
    private NotificationTypeEnum type;
    private Boolean isRead;
    private LocalDateTime createdAt;
}