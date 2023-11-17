package com.fullstackbackend.exception;

public class HotelNotFoundException extends RuntimeException{
    public HotelNotFoundException(Long id){
        super("Could not found the hotel with id "+ id);
    }
}
