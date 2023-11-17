package com.fullstackbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fullstackbackend.model.*;

public interface LocationRepository extends JpaRepository<Location,Long> {
	/* List<Hotel> findByCity(String city); */
	List<Location> findAllByHotel_HotelId(Long hotelId);
	Location findByHotel_HotelId(Long hotelId);


}
