package com.fullstackbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import com.fullstackbackend.model.*;

public interface BookingRepository extends JpaRepository<Booking,Long> {
	@Query("SELECT b.user FROM Booking b WHERE b.room.roomId = :roomId")
    User findUserByRoomId(@Param("roomId") Long roomId);
	List<Booking> findAllByUserId(Long id);
	List<Booking> findByRoom_Hotel_UserId(Long id);
}
