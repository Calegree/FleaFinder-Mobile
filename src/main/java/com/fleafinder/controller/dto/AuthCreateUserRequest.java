package com.fleafinder.controller.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AuthCreateUserRequest {

    @NotBlank
    private String rut;

    @NotBlank
    private String name;

    private LocalDate birthday;

    @NotBlank
    private String email;

    @NotBlank
    private String phoneNumber;

    @NotBlank
    private String password;

    @NotBlank
    private String username;

    @Valid
    private AuthCreateRoleRequest roleRequest;
}
