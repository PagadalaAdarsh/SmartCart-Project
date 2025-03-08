
package com.project.demo.repository;

import com.project.demo.entity.CartItem;
import com.project.demo.entity.User;

import jakarta.transaction.Transactional;

import com.project.demo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Integer> {

    // Find cart item by user and product
	 @Query("SELECT c FROM CartItem c WHERE c.user.id = :userId AND c.product.id = :productId")
	    Optional<CartItem> findByUserAndProduct(@Param("userId") int userId, @Param("productId") int productId);

    // Find all cart items for a user
    List<CartItem> findAllByUser(User user);
    

 // Find cart items with product details
    @Query("SELECT c, p FROM CartItem c JOIN c.product p WHERE c.user.id = :userId")
    List<CartItem> findCartItemsWithProductDetails(@Param("userId") int userId);
    
    
    // Delete a product from the cart
    @Modifying
    @Transactional
    @Query("DELETE FROM CartItem c WHERE c.user.id = :userId AND c.product.id = :productId")
    void deleteCartItem(@Param("userId") int userId, @Param("productId") int productId);
	
    
 // Count the total quantity of items in the cart
    @Query("SELECT COALESCE(SUM(c.quantity), 0) FROM CartItem c WHERE c.user.id = :userId")
    int countTotalItems(@Param("userId") int userId);
    
    @Modifying
    @Transactional
    @Query("UPDATE CartItem c SET c.quantity = :quantity WHERE c.id = :cartItemId")
    void updateCartItemQuantity(@Param("cartItemId") int cartItemId, @Param("quantity") int quantity);
 
    @Modifying
    @Transactional
    @Query("DELETE FROM CartItem c WHERE c.user.id = :userId")
    void deleteAllCartItemsByUserId(int userId);
    
}
