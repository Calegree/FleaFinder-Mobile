package com.fleafinder.persistence.repository;

import com.fleafinder.persistence.entity.FairRequestEntity;
import com.fleafinder.persistence.entity.RequestStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FairRequestRepository extends JpaRepository<FairRequestEntity, Long> {

    List<FairRequestEntity> findByStatus(RequestStatusEnum status);

    List<FairRequestEntity> findByRequestedBy_Id(Long userId);
}