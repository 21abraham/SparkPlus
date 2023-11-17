package com.fullstackbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import com.fullstackbackend.model.*;

public interface ReviewRepository extends JpaRepository<Review,Long> {
	@Query("SELECT b.user FROM Review b WHERE b.hotel.hotelId = :hotelId")
    User findUserByHotelId(@Param("hotelId") Long hotelId);
	List<Review> findAllByUserId(Long id);
}
