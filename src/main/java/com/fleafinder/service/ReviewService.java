package com.fleafinder.service;

import com.fleafinder.controller.dto.CreateReviewRequest;
import com.fleafinder.controller.dto.ReviewDTO;
import com.fleafinder.persistence.entity.FairEntity;
import com.fleafinder.persistence.entity.ReviewEntity;
import com.fleafinder.persistence.entity.UserEntity;
import com.fleafinder.persistence.repository.FairRepository;
import com.fleafinder.persistence.repository.ReviewRepository;
import com.fleafinder.persistence.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final FairRepository fairRepository;

    @Transactional(readOnly = true)
    public List<ReviewDTO> getReviewsByFair(Long fairId) {
        return reviewRepository.findByFair_Id(fairId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ReviewDTO> getReviewsBySeller(Long sellerId) {
        return reviewRepository.findBySeller_Id(sellerId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ReviewDTO> getMyReviews() {
        // Para MVP, retornar todas las reviews (sin filtrar por usuario)
        return reviewRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReviewDTO createReview(CreateReviewRequest request) {
        // Para MVP, asignar el primer usuario como reviewer (o null)
        UserEntity reviewer = userRepository.findAll().stream().findFirst().orElse(null);
        ReviewEntity.ReviewEntityBuilder reviewBuilder = ReviewEntity.builder()
                .rating(request.getRating())
                .comment(request.getComment())
                .isReported(false)
                .reviewer(reviewer);
        if (request.getFairId() != null) {
            FairEntity fair = fairRepository.findById(request.getFairId())
                    .orElseThrow(() -> new RuntimeException("Fair not found"));
            reviewBuilder.fair(fair);
        }
        if (request.getSellerId() != null) {
            UserEntity seller = userRepository.findById(request.getSellerId())
                    .orElseThrow(() -> new RuntimeException("Seller not found"));
            reviewBuilder.seller(seller);
        }
        ReviewEntity savedReview = reviewRepository.save(reviewBuilder.build());
        return convertToDTO(savedReview);
    }

    @Transactional
    public ReviewDTO updateReview(Long id, CreateReviewRequest request) {
        ReviewEntity review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        // Para MVP, no validar usuario
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        ReviewEntity savedReview = reviewRepository.save(review);
        return convertToDTO(savedReview);
    }

    @Transactional
    public void deleteReview(Long id) {
        ReviewEntity review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        // Para MVP, no validar usuario ni roles
        reviewRepository.delete(review);
    }

    @Transactional
    public void reportReview(Long id, Authentication authentication) {
        ReviewEntity review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        review.setIsReported(true);
        reviewRepository.save(review);
    }

    @Transactional(readOnly = true)
    public List<ReviewDTO> getReportedReviews() {
        return reviewRepository.findByIsReportedTrue()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ReviewDTO convertToDTO(ReviewEntity review) {
        return ReviewDTO.builder()
                .id(review.getId())
                .rating(review.getRating())
                .comment(review.getComment())
                .reviewerName(review.getReviewer().getName())
                .reviewerId(review.getReviewer().getId())
                .fairName(review.getFair() != null ? review.getFair().getName() : null)
                .fairId(review.getFair() != null ? review.getFair().getId() : null)
                .sellerName(review.getSeller() != null ? review.getSeller().getName() : null)
                .sellerId(review.getSeller() != null ? review.getSeller().getId() : null)
                .isReported(review.getIsReported())
                .createdAt(review.getCreatedAt())
                .build();
    }

    @Transactional
    public void unreportReview(Long id) {
        ReviewEntity review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        review.setIsReported(false);
        reviewRepository.save(review);
    }
}