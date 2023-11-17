package com.fullstackbackend.exception;

public class RoomNotFoundException extends RuntimeException{
    public RoomNotFoundException(Long id){
        super("Could not find the room with id "+ id);
    }
}
