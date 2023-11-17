package com.fullstackbackend.controller;

import com.fullstackbackend.exception.*;
import com.fullstackbackend.model.*;
import com.fullstackbackend.repository.*;

//import org.hibernate.engine.internal.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import javax.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @PostMapping("/room")
    Room newRoom(@RequestBody Room newRoom) {
        return roomRepository.save(newRoom);
    }

    @GetMapping("/hotelroom/{hotelId}")
    List<Room> getRoomsByHotel(@PathVariable("hotelId") Long hotelId) {
        return roomRepository.findAllByHotel_HotelId(hotelId);
    }

	/*
	 * @GetMapping("/city/{city}") public List<Hotel>
	 * getAllHotelsByCity(@PathVariable String city) { return
	 * hotelRepository.findByCity(city); }
	 */

    @GetMapping("/rooms")
    List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @GetMapping("/room/{roomid}")
    Room getUserById(@PathVariable Long roomid) {
        return roomRepository.findById(roomid)
                .orElseThrow(() -> new RoomNotFoundException(roomid));
    }
    
    @PutMapping("/room/{roomid}")
    Room updateRoom(@RequestBody Room newRoom, @PathVariable Long roomid) {
        return roomRepository.findById(roomid)
                .map(room -> {
                	room.setRoom_type(newRoom.getRoom_type());
                	room.setCapacity(newRoom.getCapacity());
                	room.setPrice(newRoom.getPrice());
                	room.setAvailability(newRoom.isAvailability());
                    return roomRepository.save(room);
                }).orElseThrow(() -> new RoomNotFoundException(roomid));
    }

    @PatchMapping("/availability/{roomId}")
    public ResponseEntity<Room> updateRoomAvailability(@PathVariable Long roomId, @RequestBody Room updatedRoom) {
        try {
            Room existingRoom = roomRepository.findById(roomId).orElse(null);
            if (existingRoom == null) {
                return ResponseEntity.notFound().build();
            }

            // Update only the availability property
            existingRoom.setAvailability(updatedRoom.isAvailability());
            roomRepository.save(existingRoom);

            return ResponseEntity.ok(existingRoom);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/room/{roomid}")
    String deleteRoom(@PathVariable Long roomid){
        if(!roomRepository.existsById(roomid)){
            throw new RoomNotFoundException(roomid);
        }
        roomRepository.deleteById(roomid);
        return  "Room with id "+roomid+" has been deleted success.";
    }

}
