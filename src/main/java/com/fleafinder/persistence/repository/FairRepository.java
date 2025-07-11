package com.fleafinder.persistence.repository;

import com.fleafinder.persistence.entity.FairEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FairRepository extends JpaRepository<FairEntity, Long> {

    List<FairEntity> findByIsActiveTrue();

    List<FairEntity> findByIsValidatedFalse();

    @Query("SELECT f FROM FairEntity f WHERE f.isActive = true AND f.isValidated = true " +
            "AND (:latitude - f.latitude) * (:latitude - f.latitude) + " +
            "(:longitude - f.longitude) * (:longitude - f.longitude) <= :radiusSquared")
    List<FairEntity> findNearbyFairs(@Param("latitude") Double latitude,
                                     @Param("longitude") Double longitude,
                                     @Param("radiusSquared") Double radiusSquared);

    List<FairEntity> findByCreatedBy_Id(Long userId);
}