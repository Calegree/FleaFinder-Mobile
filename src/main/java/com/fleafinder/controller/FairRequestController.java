package com.fleafinder.controller;

import com.fleafinder.controller.dto.CreateFairRequestRequest;
import com.fleafinder.controller.dto.FairRequestDTO;
import com.fleafinder.persistence.entity.RequestStatusEnum;
import com.fleafinder.service.FairRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fair-requests")
@RequiredArgsConstructor
public class FairRequestController {

    private final FairRequestService fairRequestService;

    @GetMapping("/pending")
    public ResponseEntity<List<FairRequestDTO>> getPendingRequests() {
        List<FairRequestDTO> requests = fairRequestService.getAllPendingRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/my-requests")
    public ResponseEntity<List<FairRequestDTO>> getMyRequests() {
        List<FairRequestDTO> requests = fairRequestService.getMyRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FairRequestDTO> getRequestById(@PathVariable Long id) {
        FairRequestDTO request = fairRequestService.getRequestById(id);
        return ResponseEntity.ok(request);
    }

    @PostMapping
    public ResponseEntity<FairRequestDTO> createFairRequest(@RequestBody CreateFairRequestRequest request) {
        FairRequestDTO fairRequest = fairRequestService.createFairRequest(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(fairRequest);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<FairRequestDTO> updateRequestStatus(
            @PathVariable Long id,
            @RequestParam RequestStatusEnum status,
            @RequestParam(required = false) String adminNotes) {
        FairRequestDTO request = fairRequestService.updateRequestStatus(id, status, adminNotes);
        return ResponseEntity.ok(request);
    }
}