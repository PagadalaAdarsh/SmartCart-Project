package com.project.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.project.demo.entity.JWTToken;

@Repository
public interface JWTTokenRepository extends JpaRepository<JWTToken, Integer> {

    // Find a token by its value
    Optional<JWTToken> findByToken(String token);

    // You don't need to define delete, as it's inherited from JpaRepository
 // Custom query to find tokens by user ID
    @Query("SELECT t FROM JWTToken t WHERE t.user.id = :userId")
    JWTToken findByUserId(@Param("userId") int userId);

    // Custom query to delete tokens by user ID
    @Modifying
    @Transactional
    @Query("DELETE FROM JWTToken t WHERE t.user.id = :userId")
    void deleteByUserId(@Param("userId") int userId);
    
    @Query("SELECT t FROM JWTToken t WHERE t.user.userid = :userId ORDER BY t.expiresAt DESC")
    Optional<JWTToken> findLatestTokenByUserId(@Param("userId") int userId);
}