package com.fleafinder.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {
    private Long id;
    private Integer rating;
    private String comment;
    private String reviewerName;
    private Long reviewerId;
    private String fairName;
    private Long fairId;
    private String sellerName;
    private Long sellerId;
    private Boolean isReported;
    private LocalDateTime createdAt;
}