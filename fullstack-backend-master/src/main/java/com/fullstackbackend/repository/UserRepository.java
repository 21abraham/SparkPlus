package com.fullstackbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fullstackbackend.model.User;

public interface UserRepository extends JpaRepository<User,Long> {
	User findByEmail(String email);
}
