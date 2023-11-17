package com.fullstackbackend.exception;

public class ReviewNotFoundException extends RuntimeException{
    public ReviewNotFoundException(Long id){
        super("Could not find the review with id "+ id);
    }
}
