package com.fleafinder.service;

import com.fleafinder.controller.dto.CreateProductRequest;
import com.fleafinder.controller.dto.ProductDTO;
import com.fleafinder.persistence.entity.FairEntity;
import com.fleafinder.persistence.entity.ProductEntity;
import com.fleafinder.persistence.entity.UserEntity;
import com.fleafinder.persistence.repository.FairRepository;
import com.fleafinder.persistence.repository.ProductRepository;
import com.fleafinder.persistence.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final FairRepository fairRepository;

    @Transactional(readOnly = true)
    public List<ProductDTO> getProductsByFair(Long fairId) {
        return productRepository.findByFair_Id(fairId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getMyProducts() {
        // Para MVP, retornar todos los productos (sin filtrar por usuario)
        return productRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductDTO getProductById(Long id) {
        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return convertToDTO(product);
    }

    @Transactional
    public ProductDTO createProduct(CreateProductRequest request) {
        // Para MVP, asignar el primer usuario como vendedor (o null)
        UserEntity seller = userRepository.findAll().stream().findFirst().orElse(null);
        FairEntity fair = fairRepository.findById(request.getFairId())
                .orElseThrow(() -> new RuntimeException("Fair not found"));
        ProductEntity product = ProductEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .category(request.getCategory())
                .isAvailable(true)
                .seller(seller)
                .fair(fair)
                .build();
        ProductEntity savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }

    @Transactional
    public ProductDTO updateProduct(Long id, CreateProductRequest request) {
        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        // Para MVP, no validar usuario
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        ProductEntity savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }

    @Transactional
    public void deleteProduct(Long id) {
        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        // Para MVP, no validar usuario
        productRepository.delete(product);
    }

    @Transactional
    public ProductDTO toggleAvailability(Long id) {
        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        // Para MVP, no validar usuario
        product.setIsAvailable(!product.getIsAvailable());
        ProductEntity savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> searchProducts(String query) {
        List<ProductEntity> products = productRepository.findByNameContainingIgnoreCase(query);
        return products.stream()
                .filter(ProductEntity::getIsAvailable)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ProductDTO convertToDTO(ProductEntity product) {
        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .category(product.getCategory())
                .isAvailable(product.getIsAvailable())
                .sellerName(product.getSeller().getName())
                .sellerId(product.getSeller().getId())
                .fairName(product.getFair().getName())
                .fairId(product.getFair().getId())
                .createdAt(product.getCreatedAt())
                .build();
    }
}