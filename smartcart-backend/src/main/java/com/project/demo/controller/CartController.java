package com.project.demo.controller;

import com.project.demo.entity.CartItem;
import com.project.demo.entity.User;
import com.project.demo.service.CartService;

import jakarta.servlet.http.HttpServletRequest;

import com.project.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/items/count")
    public ResponseEntity<Integer> getCartItemCount(@RequestParam String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username));
        int count = cartService.getCartItemCount(user.getUserid());
        return ResponseEntity.ok(count);
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addToCart(@RequestBody Map<String, Object> request) {
        String username = (String) request.get("username");
        int productId = (int) request.get("productId");
        int quantity = request.containsKey("quantity") ? (int) request.get("quantity") : 1;

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username));

        cartService.addToCart(user.getUserid(), productId, quantity);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    
    // Fetch all cart items for the user (based on username)
    @GetMapping("/items")
    public ResponseEntity<Map<String, Object>> getCartItems(HttpServletRequest request) {
        // Fetch user by username to get the userId
    	User user= (User) request.getAttribute("authenticatedUser");

        // Call the service to get cart items for the user
        Map<String, Object> cartItems = cartService.getCartItems(user.getUserid());
        return ResponseEntity.ok(cartItems);
    }
    
    

    @PutMapping("/update")
    public ResponseEntity<Void> updateCartItemQuantity(@RequestBody Map<String, Object> request) {
        String username = (String) request.get("username");
        int productId = (int) request.get("productId");
        int quantity = (int) request.get("quantity");

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username));

        cartService.updateCartItemQuantity(user.getUserid(), productId, quantity);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

 // Delete Cart Item
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteCartItem(@RequestBody Map<String, Object> request) {
        String username = (String) request.get("username");
        int productId = (int) request.get("productId");

        // Fetch the user using username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username));

        // Delete the cart item
        cartService.deleteCartItem(user.getUserid(), productId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}
