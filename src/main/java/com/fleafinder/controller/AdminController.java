package com.fleafinder.controller;

import com.fleafinder.controller.dto.FairDTO;
import com.fleafinder.controller.dto.ReviewDTO;
import com.fleafinder.service.FairService;
import com.fleafinder.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final FairService fairService;
    private final ReviewService reviewService;

    @GetMapping("/fairs/pending-validation")
    public ResponseEntity<List<FairDTO>> getPendingValidationFairs() {
        List<FairDTO> fairs = fairService.getPendingValidationFairs();
        return ResponseEntity.ok(fairs);
    }

    @GetMapping("/reviews/reported")
    public ResponseEntity<List<ReviewDTO>> getReportedReviews() {
        List<ReviewDTO> reviews = reviewService.getReportedReviews();
        return ResponseEntity.ok(reviews);
    }

    @PutMapping("/reviews/{id}/resolve-report")
    public ResponseEntity<Void> resolveReportedReview(@PathVariable Long id, @RequestParam Boolean removeReview, Authentication authentication) {
        if (removeReview) {
            reviewService.deleteReview(id, authentication);
        }
        else {
            reviewService.unreportReview(id);
        }
        return ResponseEntity.ok().build();
    }
}