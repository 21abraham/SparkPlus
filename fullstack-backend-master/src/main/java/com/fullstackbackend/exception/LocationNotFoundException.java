package com.fullstackbackend.exception;

public class LocationNotFoundException extends RuntimeException{
    public LocationNotFoundException(Long id){
        super("Could not find the location with id "+ id);
    }
}
