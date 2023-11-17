package com.fullstackbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fullstackbackend.model.*;

public interface HotelRepository extends JpaRepository<Hotel,Long> {
	List<Hotel> findByCity(String city);
	List<Hotel> findAllByUserId(Long id);
}
