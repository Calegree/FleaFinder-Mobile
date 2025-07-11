package com.fleafinder.controller;

import com.fleafinder.controller.dto.CreateReviewRequest;
import com.fleafinder.controller.dto.ReviewDTO;
import com.fleafinder.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/fair/{fairId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByFair(@PathVariable Long fairId) {
        List<ReviewDTO> reviews = reviewService.getReviewsByFair(fairId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsBySeller(@PathVariable Long sellerId) {
        List<ReviewDTO> reviews = reviewService.getReviewsBySeller(sellerId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/my-reviews")

    public ResponseEntity<List<ReviewDTO>> getMyReviews() {
        List<ReviewDTO> reviews = reviewService.getMyReviews();
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/reported")

    public ResponseEntity<List<ReviewDTO>> getReportedReviews() {
        List<ReviewDTO> reviews = reviewService.getReportedReviews();
        return ResponseEntity.ok(reviews);
    }

    @PostMapping

    public ResponseEntity<ReviewDTO> createReview(@RequestBody CreateReviewRequest request) {
        ReviewDTO review = reviewService.createReview(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(review);
    }

    @PutMapping("/{id}")

    public ResponseEntity<ReviewDTO> updateReview(@PathVariable Long id, @RequestBody CreateReviewRequest request, Authentication authentication) {
        ReviewDTO review = reviewService.updateReview(id, request, authentication);
        return ResponseEntity.ok(review);
    }

    @DeleteMapping("/{id}")

    public ResponseEntity<Void> deleteReview(@PathVariable Long id, Authentication authentication) {
        reviewService.deleteReview(id, authentication);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/report")

    public ResponseEntity<Void> reportReview(@PathVariable Long id, Authentication authentication) {
        reviewService.reportReview(id, authentication);
        return ResponseEntity.ok().build();
    }
}