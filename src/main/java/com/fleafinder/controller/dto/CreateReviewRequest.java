package com.fleafinder.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateReviewRequest {
    private Integer rating;
    private String comment;
    private Long fairId;
    private Long sellerId;
}