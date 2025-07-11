package com.fleafinder.controller;

import com.fleafinder.controller.dto.CreateFairRequest;
import com.fleafinder.controller.dto.FairDTO;
import com.fleafinder.service.FairService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fairs")
@RequiredArgsConstructor
public class FairController {

    private final FairService fairService;

    @GetMapping
    public ResponseEntity<List<FairDTO>> getAllFairs() {
        List<FairDTO> fairs = fairService.getAllActiveFairs();
        return ResponseEntity.ok(fairs);
    }

    @GetMapping("/nearby")
    public ResponseEntity<List<FairDTO>> getNearbyFairs(
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam(defaultValue = "10.0") Double radius,
            Authentication authentication) {
        List<FairDTO> fairs = fairService.getNearbyFairs(latitude, longitude, radius, authentication);
        return ResponseEntity.ok(fairs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FairDTO> getFairById(@PathVariable Long id, Authentication authentication) {
        FairDTO fair = fairService.getFairById(id, authentication);
        return ResponseEntity.ok(fair);
    }

    @PostMapping
    public ResponseEntity<FairDTO> createFair(@RequestBody CreateFairRequest request) {
        FairDTO fair = fairService.createFair(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(fair);
    }

    @PutMapping("/{id}")

    public ResponseEntity<FairDTO> updateFair(@PathVariable Long id, @RequestBody CreateFairRequest request) {
        FairDTO fair = fairService.updateFair(id, request);
        return ResponseEntity.ok(fair);
    }

    @DeleteMapping("/{id}")

    public ResponseEntity<Void> deleteFair(@PathVariable Long id) {
        fairService.deleteFair(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/validate")

    public ResponseEntity<FairDTO> validateFair(@PathVariable Long id, @RequestParam Boolean isValidated) {
        FairDTO fair = fairService.validateFair(id, isValidated);
        return ResponseEntity.ok(fair);
    }

    @PostMapping("/{id}/favorite")

    public ResponseEntity<Void> toggleFavorite(@PathVariable Long id) {
        fairService.toggleFavorite(id);
        return ResponseEntity.ok().build();
    }
}