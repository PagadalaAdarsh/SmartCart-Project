
package com.project.demo.entity;

import java.time.LocalDateTime;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="users")
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Integer userid;
	
	@Column(nullable=false, unique=true)
	private String username;
	
	@Column(nullable=false, unique=true)
	private String email;
	
	@Column(nullable = false)
	private String password;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable=false)
	private Role role;
	
	@Column(nullable = false, updatable=false)
	private LocalDateTime createdAt = LocalDateTime.now();
	
	@Column(nullable=false)
	private LocalDateTime updatedAt = LocalDateTime.now();
	
	public User() {
		
	}

	public User(Integer userid, String username, String email, String password, Role role, LocalDateTime createdAt,
			LocalDateTime updatedAt) {
		super();
		this.userid = userid;
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
	
	

	public User(String username, String email, String password, Role role, LocalDateTime createdAt,
			LocalDateTime updatedAt) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Integer getUserid() {
		return userid;
	}

	public void setUserid(Integer userid) {
		this.userid = userid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
	
}
