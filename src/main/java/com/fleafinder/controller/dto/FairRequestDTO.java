package com.fleafinder.controller.dto;

import com.fleafinder.persistence.entity.RequestStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FairRequestDTO {
    private Long id;
    private String name;
    private String description;
    private String address;
    private Double latitude;
    private Double longitude;
    private LocalDateTime proposedStartDate;
    private LocalDateTime proposedEndDate;
    private RequestStatusEnum status;
    private String adminNotes;
    private String requestedByName;
    private Long requestedById;
    private LocalDateTime createdAt;
}