package com.fleafinder.service;

import com.fleafinder.controller.dto.UpdateProfileRequest;
import com.fleafinder.controller.dto.UserProfileDTO;
import com.fleafinder.persistence.entity.RoleEntity;
import com.fleafinder.persistence.entity.UserEntity;
import com.fleafinder.persistence.repository.ReviewRepository;
import com.fleafinder.persistence.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public UserProfileDTO getProfile() {
        // Para MVP, usar el primer usuario
        UserEntity user = userRepository.findAll().stream().findFirst().orElse(null);
        return convertToProfileDTO(user);
    }

    @Transactional(readOnly = true)
    public UserProfileDTO getUserById(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return convertToProfileDTO(user);
    }

    @Transactional
    public UserProfileDTO updateProfile(UpdateProfileRequest request) {
        // Para MVP, usar el primer usuario
        UserEntity user = userRepository.findAll().stream().findFirst().orElse(null);
        user.setName(request.getName());
        user.setBirthday(request.getBirthday());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        UserEntity savedUser = userRepository.save(user);
        return convertToProfileDTO(savedUser);
    }

    @Transactional
    public void changePassword(String currentPassword, String newPassword) {
        // Para MVP, usar el primer usuario
        UserEntity user = userRepository.findAll().stream().findFirst().orElse(null);
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    private UserProfileDTO convertToProfileDTO(UserEntity user) {
        Set<String> roles = user.getRoleEntities().stream()
                .map(RoleEntity::getRoleName)
                .map(Enum::name)
                .collect(Collectors.toSet());

        // Calcular rating promedio para vendedores
        Double averageRating = reviewRepository.findBySeller_Id(user.getId())
                .stream()
                .mapToInt(review -> review.getRating())
                .average()
                .orElse(0.0);

        return UserProfileDTO.builder()
                .id(user.getId())
                .rut(user.getRut())
                .name(user.getName())
                .birthday(user.getBirthday())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .username(user.getUsername())
                .roles(roles)
                .productCount(user.getProducts().size())
                .reviewCount(reviewRepository.findBySeller_Id(user.getId()).size())
                .averageRating(averageRating)
                .build();
    }
}