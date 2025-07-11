package com.fleafinder.persistence.repository;

import com.fleafinder.persistence.entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {

    List<ReviewEntity> findByFair_Id(Long fairId);

    List<ReviewEntity> findBySeller_Id(Long sellerId);

    List<ReviewEntity> findByReviewer_Id(Long reviewerId);

    List<ReviewEntity> findByIsReportedTrue();

    boolean existsByReviewer_IdAndFair_Id(Long reviewerId, Long fairId);

    boolean existsByReviewer_IdAndSeller_Id(Long reviewerId, Long sellerId);
}