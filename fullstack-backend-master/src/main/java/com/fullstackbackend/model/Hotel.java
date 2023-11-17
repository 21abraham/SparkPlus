package com.fullstackbackend.model;
import javax.persistence.*;
@Entity
@Table(name = "hotels")
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hotelId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
	public Long getHotelId() {
		return hotelId;
	}
	public void setHotelId(Long hotelId) {
		this.hotelId = hotelId;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getHotelName() {
		return hotelName;
	}
	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}
	public String getHotelurl() {
		return hotelurl;
	}
	public void setHotelurl(String hotelurl) {
		this.hotelurl = hotelurl;
	}
	public String getImage1url() {
		return image1url;
	}
	public void setImage1url(String image1url) {
		this.image1url = image1url;
	}
	public String getImage2url() {
		return image2url;
	}
	public void setImage2url(String image2url) {
		this.image2url = image2url;
	}
	public String getImage3url() {
		return image3url;
	}
	public void setImage3url(String image3url) {
		this.image3url = image3url;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	private String hotelName;
    private String address;
    private String city;
    private String country;
    private String contactNumber;
    private String email;
    private String hotelurl;
    private String image1url;
    private String image2url;
    private String image3url;



}

