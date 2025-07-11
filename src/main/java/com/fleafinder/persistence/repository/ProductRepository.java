package com.fleafinder.persistence.repository;

import com.fleafinder.persistence.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    List<ProductEntity> findByFair_Id(Long fairId);

    List<ProductEntity> findBySeller_Id(Long sellerId);

    List<ProductEntity> findByIsAvailableTrue();

    List<ProductEntity> findByCategoryContainingIgnoreCase(String category);

    List<ProductEntity> findByNameContainingIgnoreCase(String name);
}