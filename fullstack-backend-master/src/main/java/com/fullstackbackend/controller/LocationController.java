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
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;

    @PostMapping("/location")
    Location newLocation(@RequestBody Location newLocation) {
        return locationRepository.save(newLocation);
    }
    @GetMapping("/onelocation/{hotelId}")
    Location getonehotel(@PathVariable Long hotelId) {
        return locationRepository.findByHotel_HotelId(hotelId);
    }
    @GetMapping("/hotellocation/{hotelId}")
    List<Location> getLocationsByHotel(@PathVariable("hotelId") Long hotelId) {
        return locationRepository.findAllByHotel_HotelId(hotelId);
    }

    @GetMapping("/locations")
    List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    @GetMapping("/location/{locationid}")
    Location getUserById(@PathVariable Long locationid) {
        return locationRepository.findById(locationid)
                .orElseThrow(() -> new LocationNotFoundException(locationid));
    }

    @PutMapping("/location/{locationid}")
    Location updateLocation(@RequestBody Location newLocation, @PathVariable Long locationid) {
        return locationRepository.findById(locationid)
                .map(location -> {
                	location.setLatitude(newLocation.getLatitude());
                	location.setLongitude(newLocation.getLongitude());
                    return locationRepository.save(location);
                }).orElseThrow(() -> new LocationNotFoundException(locationid));
    }

    @DeleteMapping("/location/{locationid}")
    String deleteLocation(@PathVariable Long locationid){
        if(!locationRepository.existsById(locationid)){
            throw new LocationNotFoundException(locationid);
        }
        locationRepository.deleteById(locationid);
        return  "Location with id "+locationid+" has been deleted success.";
    }

}
