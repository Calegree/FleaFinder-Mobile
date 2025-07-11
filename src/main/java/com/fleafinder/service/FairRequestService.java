package com.fleafinder.service;

import com.fleafinder.controller.dto.CreateFairRequestRequest;
import com.fleafinder.controller.dto.FairRequestDTO;
import com.fleafinder.persistence.entity.FairRequestEntity;
import com.fleafinder.persistence.entity.RequestStatusEnum;
import com.fleafinder.persistence.entity.UserEntity;
import com.fleafinder.persistence.repository.FairRequestRepository;
import com.fleafinder.persistence.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FairRequestService {

    private final FairRequestRepository fairRequestRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<FairRequestDTO> getAllPendingRequests() {
        return fairRequestRepository.findByStatus(RequestStatusEnum.PENDING)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<FairRequestDTO> getMyRequests() {
        // Para MVP, retornar todas las solicitudes (sin filtrar por usuario)
        return fairRequestRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public FairRequestDTO getRequestById(Long id) {
        FairRequestEntity request = fairRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fair request not found"));
        return convertToDTO(request);
    }

    @Transactional
    public FairRequestDTO createFairRequest(CreateFairRequestRequest request) {
        // Para MVP, asignar el primer usuario como solicitante (o null)
        UserEntity user = userRepository.findAll().stream().findFirst().orElse(null);
        FairRequestEntity fairRequest = FairRequestEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .address(request.getAddress())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .proposedStartDate(request.getProposedStartDate())
                .proposedEndDate(request.getProposedEndDate())
                .status(RequestStatusEnum.PENDING)
                .requestedBy(user)
                .build();
        FairRequestEntity savedRequest = fairRequestRepository.save(fairRequest);
        return convertToDTO(savedRequest);
    }

    @Transactional
    public FairRequestDTO updateRequestStatus(Long id, RequestStatusEnum status, String adminNotes) {
        FairRequestEntity request = fairRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fair request not found"));

        request.setStatus(status);
        request.setAdminNotes(adminNotes);

        FairRequestEntity savedRequest = fairRequestRepository.save(request);
        return convertToDTO(savedRequest);
    }

    private FairRequestDTO convertToDTO(FairRequestEntity request) {
        return FairRequestDTO.builder()
                .id(request.getId())
                .name(request.getName())
                .description(request.getDescription())
                .address(request.getAddress())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .proposedStartDate(request.getProposedStartDate())
                .proposedEndDate(request.getProposedEndDate())
                .status(request.getStatus())
                .adminNotes(request.getAdminNotes())
                .requestedByName(request.getRequestedBy().getName())
                .requestedById(request.getRequestedBy().getId())
                .createdAt(request.getCreatedAt())
                .build();
    }
}