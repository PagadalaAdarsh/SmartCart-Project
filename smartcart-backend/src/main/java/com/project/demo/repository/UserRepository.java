package com.project.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.demo.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
}