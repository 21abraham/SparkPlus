package com.fullstackbackend.controller;

import com.fullstackbackend.exception.*;
import com.fullstackbackend.model.*;
import com.fullstackbackend.repository.*;

//import org.hibernate.engine.internal.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.temporal.ChronoUnit;
import java.util.*;
import javax.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private RoomRepository roomRepository;
    
    @PostMapping("/booking")
    Booking newBooking(@RequestBody Booking newBooking) {
        return bookingRepository.save(newBooking);
    }
    
    @GetMapping("/bookings")
    List<Booking> getAllBooking() {
        return bookingRepository.findAll();
    }
    @GetMapping("/bookinghost/{id}")
    public List<Booking> getBookingsByHostId(@PathVariable Long id) {
        return bookingRepository.findByRoom_Hotel_UserId(id);
    }
    @GetMapping("/allbooking/{userId}")
    public List<Booking> getAllBookingsByUserId(@PathVariable Long userId) {
        return bookingRepository.findAllByUserId(userId);
    }
    @GetMapping("/booking/{bookingid}")
    Booking getBookingById(@PathVariable Long bookingid) {
        return bookingRepository.findById(bookingid)
                .orElseThrow(() -> new BookingNotFoundException(bookingid));
    }
    @GetMapping("/user_room/{roomId}")
    public User getUserIdByRoomId(@PathVariable Long roomId) {
        try {
            User user = bookingRepository.findUserByRoomId(roomId);
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to load user");
        }
    }

    @PutMapping("/booking/{bookingid}")
    Booking updateBooking(@RequestBody Booking newBooking, @PathVariable Long bookingid) {
        return bookingRepository.findById(bookingid)
                .map(booking -> {
                	booking.setCheckInDate(newBooking.getCheckInDate());
                	booking.setCheckOutDate(newBooking.getCheckOutDate());
                	booking.setTotalPrice(newBooking.getTotalPrice());
                	booking.setBookingStatus(newBooking.getBookingStatus());
                    return bookingRepository.save(booking);
                }).orElseThrow(() -> new BookingNotFoundException(bookingid));
    }

    @DeleteMapping("/booking/{bookingid}")
    String deleteBooking(@PathVariable Long bookingid){
        if(!bookingRepository.existsById(bookingid)){
            throw new BookingNotFoundException(bookingid);
        }
        bookingRepository.deleteById(bookingid);
        return  "Booking with id "+bookingid+" has been deleted success.";
    }
    @PostMapping("/calculate-total-price/{roomId}")
    public ResponseEntity<Double> calculateTotalPrice(@PathVariable Long roomId, @RequestBody Booking booking) {
        Optional<Room> optionalRoom = roomRepository.findById(roomId);
        if (optionalRoom.isPresent() && booking.getCheckInDate() != null && booking.getCheckOutDate() != null) {
            Room room = optionalRoom.get();
            double roomPrice = room.getPrice();

            long bookingDuration = ChronoUnit.DAYS.between(
                    booking.getCheckInDate().toInstant(), booking.getCheckOutDate().toInstant()
            );

            if (bookingDuration >= 0) {
                double totalPrice = roomPrice * bookingDuration;
                return new ResponseEntity<>(totalPrice, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/status/{bookId}")
    public ResponseEntity<Booking> updateBookingStatus(@PathVariable Long bookId, @RequestBody Booking updatedBooking) {
        try {
            Booking existingBooking = bookingRepository.findById(bookId).orElse(null);
            if (existingBooking == null) {
                return ResponseEntity.notFound().build();
            }

            // Update only the availability property
            existingBooking.setBookingStatus(updatedBooking.getBookingStatus());
            bookingRepository.save(existingBooking);

            return ResponseEntity.ok(existingBooking);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
