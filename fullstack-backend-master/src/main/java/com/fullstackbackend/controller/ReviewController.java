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
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private HotelRepository hotelRepository;
    
    @PostMapping("/review")
    Review newReview(@RequestBody Review newReview) {
        return reviewRepository.save(newReview);
    }
    
    @GetMapping("/reviews")
    List<Review> getAllReview() {
        return reviewRepository.findAll();
    }
    @GetMapping("/allreview/{userId}")
    public List<Review> getAllReviewsByUserId(@PathVariable Long userId) {
        return reviewRepository.findAllByUserId(userId);
    }
    @GetMapping("/review/{reviewid}")
    Review getReviewById(@PathVariable Long reviewid) {
        return reviewRepository.findById(reviewid)
                .orElseThrow(() -> new ReviewNotFoundException(reviewid));
    }
    @GetMapping("/user_hotel/{hotelId}")
    public User getUserIdByHotelId(@PathVariable Long hotelId) {
        try {
            User user = reviewRepository.findUserByHotelId(hotelId);
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to load user");
        }
    }

    @PutMapping("/review/{reviewid}")
    Review updateReview(@RequestBody Review newReview, @PathVariable Long reviewid) {
        return reviewRepository.findById(reviewid)
                .map(review -> {
                	review.setRating(newReview.getRating());
                	review.setReviewText(newReview.getReviewText());
                    return reviewRepository.save(review);
                }).orElseThrow(() -> new ReviewNotFoundException(reviewid));
    }

    @DeleteMapping("/review/{reviewid}")
    String deleteReview(@PathVariable Long reviewid){
        if(!reviewRepository.existsById(reviewid)){
            throw new ReviewNotFoundException(reviewid);
        }
        reviewRepository.deleteById(reviewid);
        return  "Review with id "+reviewid+" has been deleted success.";
    }
}
