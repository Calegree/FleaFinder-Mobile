package com.fleafinder.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDTO {
    private Long id;
    private String rut;
    private String name;
    private LocalDate birthday;
    private String email;
    private String phoneNumber;
    private String username;
    private Set<String> roles;
    private Integer productCount;
    private Integer reviewCount;
    private Double averageRating;
}