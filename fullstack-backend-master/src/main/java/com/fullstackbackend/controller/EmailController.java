package com.fullstackbackend.controller;

import org.springframework.web.bind.annotation.*;

import com.fullstackbackend.model.*;
import com.fullstackbackend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.fullstackbackend.services.*;
import org.springframework.ui.Model;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;
import javax.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class EmailController {

	@Autowired
	private EmailService emailService;

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private BookingRepository bookingRepository;

	@PostMapping("/forgot-password")
	public ResponseEntity<Map<String, Object>> sendOtpToEmail(@RequestBody LoginRequest loginRequest) {
		User user = userRepository.findByEmail(loginRequest.getEmail());

		if (user == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(Collections.singletonMap("error", "Invalid email or password"));
		}

		int gotp = ThreadLocalRandom.current().nextInt(100000, 999999);
		String subject = "OTP SENDING";
		String message = "<div style='background-image: url(https://wallpapersmug.com/download/1920x1080/4d7d03/light-colors-geometric-pattern-abstract.jpg);\n"
				+ "                background-repeat: no-repeat;\n" + "                max-width: 100%;\n"
				+ "                background-size: cover;margin-bottom: 50px;'>"
				+ "<img style='height: 50%;width: 100%;' src=\"https://www.victoriahotels.asia/wp-content/uploads/revslider/video-media/VHR_TV_NOLOGO_1_layer1.jpeg\" class=\"card-img-top\" alt=\"...\">"
				+ "<div style='padding: 50px 0 50px 0;text-align: center;'>" + "<div>" + "<b style='font-size: 50px;'>"
				+ "Spark+" + "</b>" + "</div>" + "<div>" + "<b style='font-size: 50px;'>" + "OTP IS: " + gotp + "</b>"
				+ "</div>" + "</div>"
				+ "<div style='text-align: center;color: black;padding: 20px 0 20px 20px;font-size: 20px;background-color: white;'>"
				+ "<div class='row' >" + "<div class='col-lg-6'>" + "<b style='font-size: 30px'>About Us:</b>" + "<br>"
				+ "<ul class='list-unstyled'>" + "<li>Abraham Ahmed, student from Computer department.</li>"
				+ "<li>Ajinkya Khete, student from Computer department.</li>"
				+ "<li>Kaustubh Bhavsar, student from Computer department.</li>" + "</ul>" + "</div>"
				+ "<div class='col-lg-6'>" + "<b style='font-size: 30px'>Instructor:</b>" + "<br>"
				+ "<p>Mr. Suresh Pal, Instructor of Super 30 Batch.</p>" + "<br>" + "</div>" + "</div>" + "</div>"
				+ "<div style='color: white;font-size: 20px;text-align: center;background-color: black;'>" + "<h>"
				+ "@MITAOE" + "</h>" + "</div>" + "</div>";
		String to = user.getEmail();
		boolean flag1 = emailService.sendEmail(subject, message, to);
		Map<String, Object> response = new HashMap<>();
		response.put("id", user.getId());
		response.put("gotp", gotp);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/approve/{bookId}")
	public ResponseEntity<Map<String, Object>> sendEmail(@RequestBody LoginRequest loginRequest,@PathVariable Long bookId) {
		Optional<Booking> bookingOptional = bookingRepository.findById(bookId);
		if (!bookingOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(Collections.singletonMap("error", "Invalid email or password"));
		}
		Booking booking = bookingOptional.get();
		String Username = booking.getUser().getUsername();
		String Hotelurl= booking.getRoom().getHotel().getHotelurl();
		String Hotelname= booking.getRoom().getHotel().getHotelName();
		String Hoteladdress= booking.getRoom().getHotel().getAddress();
		String subject = "Congratulations";
		String message = "<div style='background-image: url(https://wallpapersmug.com/download/1920x1080/4d7d03/light-colors-geometric-pattern-abstract.jpg);\n"
				+ "                background-repeat: no-repeat;\n" + "                max-width: 100%;\n"
				+ "                background-size: cover;margin-bottom: 50px;'>"
				+ "<img style='height: 50%;width: 100%;' src=\""+Hotelurl+"\" class=\"card-img-top\" alt=\"...\">"
				+ "<div style='padding: 50px 0 50px 0;text-align: center;'>" + "<div>" + "<b style='font-size: 50px;'>"
				+ "Spark+" + "</b>" + "</div>" + "<div>" + "<b style='font-size: 30px;'>" + "Dear " + Username
				+ " your booking is confirmed at "+Hotelname+".</b>" + "</div>" + "<div>" + "<b style='font-size: 30px;'>" + "Address: " + Hoteladdress
				+ "</b>" + "</div>" +"<div>" + "<b style='font-size: 30px;'>Enjoy your vacations!</b>" + "</div>" + "</div>"
				+ "<div style='text-align: center;color: black;padding: 20px 0 20px 20px;font-size: 20px;background-color: white;'>"
				+ "<div class='row' >" + "<div class='col-lg-6'>" + "<b style='font-size: 30px'>About Us:</b>" + "<br>"
				+ "<ul class='list-unstyled'>" + "<li>Abraham Ahmed, student from Computer department.</li>"
				+ "<li>Ajinkya Khete, student from Computer department.</li>"
				+ "<li>Kaustubh Bhavsar, student from Computer department.</li>" + "</ul>" + "</div>"
				+ "<div class='col-lg-6'>" + "<b style='font-size: 30px'>Instructor:</b>" + "<br>"
				+ "<p>Mr. Suresh Pal, Instructor of Super 30 Batch.</p>" + "<br>" + "</div>" + "</div>" + "</div>"
				+ "<div style='color: white;font-size: 20px;text-align: center;background-color: black;'>" + "<h>"
				+ "@MITAOE" + "</h>" + "</div>" + "</div>";
		
		 String to=booking.getUser().getEmail(); 
		 boolean flag1 = emailService.sendEmail(subject,message, to);
		 Map<String, Object> response = new HashMap<>();
		return ResponseEntity.ok(response);
	}
	@PostMapping("/deny/{bookId}")
	public ResponseEntity<Map<String, Object>> senddenyEmail(@RequestBody LoginRequest loginRequest,@PathVariable Long bookId) {
		Optional<Booking> bookingOptional = bookingRepository.findById(bookId);
		if (!bookingOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(Collections.singletonMap("error", "Invalid email or password"));
		}
		Booking booking = bookingOptional.get();
		String Username = booking.getUser().getUsername();
		String Hotelurl= booking.getRoom().getHotel().getHotelurl();
		String Hotelname= booking.getRoom().getHotel().getHotelName();
		String subject = "Cancel Booking";
		String message = "<div style='background-image: url(https://wallpapersmug.com/download/1920x1080/4d7d03/light-colors-geometric-pattern-abstract.jpg);\n"
				+ "                background-repeat: no-repeat;\n" + "                max-width: 100%;\n"
				+ "                background-size: cover;margin-bottom: 50px;'>"
				+ "<img style='height: 50%;width: 100%;' src=\""+Hotelurl+"\" class=\"card-img-top\" alt=\"...\">"
				+ "<div style='padding: 50px 0 50px 0;text-align: center;'>" + "<div>" + "<b style='font-size: 50px;'>"
				+ "Spark+" + "</b>" + "</div>" + "<div>" + "<b style='font-size: 30px;'>" + "Dear " + Username
				+ " your booking is cancelled at "+Hotelname+".</b>" + "</div>" + "<div>" + "<b style='font-size: 30px;'>" + "Please contact us for more information"
				+ "</b>" + "</div>"
				+ "<div style='text-align: center;color: black;padding: 20px 0 20px 20px;font-size: 20px;background-color: white;'>"
				+ "<div class='row' >" + "<div class='col-lg-6'>" + "<b style='font-size: 30px'>About Us:</b>" + "<br>"
				+ "<ul class='list-unstyled'>" + "<li>Abraham Ahmed, student from Computer department.</li>"
				+ "<li>Ajinkya Khete, student from Computer department.</li>"
				+ "<li>Kaustubh Bhavsar, student from Computer department.</li>" + "</ul>" + "</div>"
				+ "<div class='col-lg-6'>" + "<b style='font-size: 30px'>Instructor:</b>" + "<br>"
				+ "<p>Mr. Suresh Pal, Instructor of Super 30 Batch.</p>" + "<br>" + "</div>" + "</div>" + "</div>"
				+ "<div style='color: white;font-size: 20px;text-align: center;background-color: black;'>" + "<h>"
				+ "@MITAOE" + "</h>" + "</div>" + "</div>";
		
		 String to=booking.getUser().getEmail(); 
		 boolean flag1 = emailService.sendEmail(subject,message, to);
		 Map<String, Object> response = new HashMap<>();
		return ResponseEntity.ok(response);
	}
}
