package com.fleafinder.service;

import com.fleafinder.controller.dto.CreateFairRequest;
import com.fleafinder.controller.dto.FairDTO;
import com.fleafinder.persistence.entity.FairEntity;
import com.fleafinder.persistence.entity.UserEntity;
import com.fleafinder.persistence.repository.FairRepository;
import com.fleafinder.persistence.repository.ReviewRepository;
import com.fleafinder.persistence.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FairService {

    private final FairRepository fairRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;

    @Transactional(readOnly = true)
    public List<FairDTO> getAllActiveFairs() {
        List<FairEntity> fairs = fairRepository.findByIsActiveTrue();
        return fairs.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<FairDTO> getNearbyFairs(Double latitude, Double longitude, Double radiusKm) {
        Double radiusSquared = (radiusKm / 111.0) * (radiusKm / 111.0); // Aproximación simple
        List<FairEntity> fairs = fairRepository.findNearbyFairs(latitude, longitude, radiusSquared);
        return fairs.stream()
                .map(fair -> convertToDTO(fair, null)) // Pasar null si no hay autenticación
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public FairDTO getFairById(Long id, Authentication authentication) {
        FairEntity fair = fairRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fair not found"));
        return convertToDTO(fair, authentication);
    }

    @Transactional
    public FairDTO createFair(CreateFairRequest request) {
        // Para MVP, asignar el primer usuario como creador (o null)
        UserEntity user = userRepository.findAll().stream().findFirst().orElse(null);
        FairEntity fair = FairEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .address(request.getAddress())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .isActive(true)
                .isValidated(false)
                .createdBy(user)
                .build();
        FairEntity savedFair = fairRepository.save(fair);
        return convertToDTO(savedFair);
    }

    @Transactional
    public FairDTO updateFair(Long id, CreateFairRequest request) {
        FairEntity fair = fairRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fair not found"));

        // Eliminada la verificación de usuario y roles
        fair.setName(request.getName());
        fair.setDescription(request.getDescription());
        fair.setAddress(request.getAddress());
        fair.setLatitude(request.getLatitude());
        fair.setLongitude(request.getLongitude());
        fair.setStartDate(request.getStartDate());
        fair.setEndDate(request.getEndDate());

        FairEntity savedFair = fairRepository.save(fair);
        return convertToDTO(savedFair);
    }

    @Transactional
    public void deleteFair(Long id) {
        FairEntity fair = fairRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fair not found"));
        // Eliminada la verificación de roles
        fairRepository.delete(fair);
    }

    @Transactional
    public FairDTO validateFair(Long id, Boolean isValidated) {
        FairEntity fair = fairRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fair not found"));

        fair.setIsValidated(isValidated);
        FairEntity savedFair = fairRepository.save(fair);
        return convertToDTO(savedFair, null);
    }

    @Transactional
    public void toggleFavorite(Long fairId) {
        // Eliminada la lógica de usuario y favoritos
        // Método vacío para MVP sin autenticación
    }

    private FairDTO convertToDTO(FairEntity fair, Authentication authentication) {
        List<Integer> ratings = reviewRepository.findByFair_Id(fair.getId())
                .stream()
                .map(review -> review.getRating())
                .collect(Collectors.toList());

        Double averageRating = ratings.isEmpty() ? 0.0 :
                ratings.stream().mapToInt(Integer::intValue).average().orElse(0.0);

        boolean isFavorite = false;
        // Para MVP, no validar favoritos

        return FairDTO.builder()
                .id(fair.getId())
                .name(fair.getName())
                .description(fair.getDescription())
                .address(fair.getAddress())
                .latitude(fair.getLatitude())
                .longitude(fair.getLongitude())
                .startDate(fair.getStartDate())
                .endDate(fair.getEndDate())
                .isActive(fair.getIsActive())
                .isValidated(fair.getIsValidated())
                .createdByName(fair.getCreatedBy().getName())
                .createdById(fair.getCreatedBy().getId())
                .reviewCount(ratings.size())
                .averageRating(averageRating)
                .isFavorite(isFavorite)
                .createdAt(fair.getCreatedAt())
                .build();
    }

    private FairDTO convertToDTO(FairEntity fair) {
        return convertToDTO(fair, null); // Llama al método original con null como Authentication
    }

    @Transactional(readOnly = true)
    public List<FairDTO> getPendingValidationFairs() {
        List<FairEntity> fairs = fairRepository.findByIsValidatedFalse();
        return fairs.stream()
                .map(fair -> convertToDTO(fair, null))
                .collect(Collectors.toList());
    }
}