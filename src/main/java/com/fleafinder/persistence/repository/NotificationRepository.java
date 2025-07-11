package com.fleafinder.persistence.repository;

import com.fleafinder.persistence.entity.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {

    List<NotificationEntity> findByUser_IdOrderByCreatedAtDesc(Long userId);

    List<NotificationEntity> findByUser_IdAndIsReadFalse(Long userId);

    Long countByUser_IdAndIsReadFalse(Long userId);
}