package com.fleafinder.controller;

import com.fleafinder.controller.dto.CreateProductRequest;
import com.fleafinder.controller.dto.ProductDTO;
import com.fleafinder.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/fair/{fairId}")
    public ResponseEntity<List<ProductDTO>> getProductsByFair(@PathVariable Long fairId) {
        List<ProductDTO> products = productService.getProductsByFair(fairId);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/my-products")

    public ResponseEntity<List<ProductDTO>> getMyProducts() {
        List<ProductDTO> products = productService.getMyProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        ProductDTO product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDTO>> searchProducts(@RequestParam String query) {
        List<ProductDTO> products = productService.searchProducts(query);
        return ResponseEntity.ok(products);
    }

    @PostMapping

    public ResponseEntity<ProductDTO> createProduct(@RequestBody CreateProductRequest request) {
        ProductDTO product = productService.createProduct(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(product);
    }

    @PutMapping("/{id}")

    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody CreateProductRequest request, Authentication authentication) {
        ProductDTO product = productService.updateProduct(id, request, authentication);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/{id}")

    public ResponseEntity<Void> deleteProduct(@PathVariable Long id, Authentication authentication) {
        productService.deleteProduct(id, authentication);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/toggle-availability")

    public ResponseEntity<ProductDTO> toggleAvailability(@PathVariable Long id, Authentication authentication) {
        ProductDTO product = productService.toggleAvailability(id, authentication);
        return ResponseEntity.ok(product);
    }
}