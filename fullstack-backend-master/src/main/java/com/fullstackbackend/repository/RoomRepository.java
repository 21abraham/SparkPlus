package com.fullstackbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fullstackbackend.model.*;

public interface RoomRepository extends JpaRepository<Room,Long> {
	List<Room> findAllByHotel_HotelId(Long hotelId);

}
