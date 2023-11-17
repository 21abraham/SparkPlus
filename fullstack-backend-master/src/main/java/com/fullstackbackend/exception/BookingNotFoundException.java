package com.fullstackbackend.exception;

public class BookingNotFoundException extends RuntimeException{
    public BookingNotFoundException(Long id){
        super("Could not find the booking with id "+ id);
    }
}
