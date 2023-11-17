import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import "./styles.css";
import "./style.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaStar } from 'react-icons/fa';

const HotelCard = ({ hotel, id, google }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleReviewTextChange = (event) => {
        setReviewText(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8081/review', {
                user: {
                    id: id,
                },
                hotel: {
                    hotelId: hotel.hotelId,
                },
                reviewText: reviewText,
                rating: rating,
            });

            console.log('Review submitted:', response.data);

            // You can also trigger a refresh of the reviews after successful submission
            // by calling a function from the parent component that fetches reviews.

            // Clear form inputs
            setRating(0);
            setReviewText('');
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };
    /*const specificLocation = {
        lat: location.latitude,
        lng: location.longitude,
    };*/
    const {
        hotelName,
        address,
        city,
        country,
        contactNumber,
        email,
        hotelurl,
        image1url,
        image2url,
        image3url,
    } = hotel;
    const [rooms, setRooms] = useState([]);
    const loadRooms = async () => {
        try {
            const result = await axios.get(`http://localhost:8081/hotelroom/${hotel.hotelId}`);
            setRooms(result.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load rooms");
        }
    };
    const [location, setLocation] = useState({});
    const loadLocation = async () => {
        try {
            const result = await axios.get(`http://localhost:8081/hotellocation/${hotel.hotelId}`);
            setLocation(result.data);
            console.log("result:", result.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load location");
        }
    };
    const [filteredRooms, setFilteredRooms] = useState([]);
    const filterRooms = (room, search1, search2, search3) => {
        const roomTypeMatch = room.room_type.toUpperCase().includes(search1.toUpperCase());
        const capacityMatch = room.capacity.toString().includes(search2);
        const priceMatch = room.price.toString().includes(search3);
        return roomTypeMatch && capacityMatch && priceMatch;
    };

    const [searchCriteria, setSearchCriteria] = useState({
        search1: "",
        search2: "",
        search3: "",
    });

    const handleSearch = (event) => {
        const { name, value } = event.target;
        setSearchCriteria((prevSearchCriteria) => ({
            ...prevSearchCriteria,
            [name]: value,
        }));
    };

    useEffect(() => {
        loadRooms();
        loadLocation();
    }, []);
    /*console.log("Hotelid:", hotel.hotelId);
    console.log("id:", location[0]?.locationId);
    console.log("Lat:", location[0]?.latitude);
    console.log("Lng:", location[0]?.longitude);*/
    return (
        <>
            <div className="hotel-card">
                <div className="w3-row" style={{ boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 1), 0 6px 20px 0 rgba(0, 0, 0, 1)' }}>
                <div className="w3-col m9 l9">
            <div className="w3-container w3-white w3-padding-16">
            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                <div className="carousel-inner" >
                                <div className="w3-row-padding w3-padding-16 w3-text-white w3-large">
                                    <div className="w3-half">
                                            <div className="w3-row-padding" style={{ margin: '0 -16px' }}>
                                                <div className="w3-half w3-margin-bottom">
                                                    <div className="w3-display-container">
                                                        <img src={hotelurl} alt="Pisa" style={{ width: '550px', maxWidth: '100%', height: '150px' }} />

                                                    </div>
                                                </div>
                                                <div className="w3-half w3-margin-bottom">
                                                    <div className="w3-display-container">
                                                        <img src={image1url} alt="Paris" style={{ width: '550px', maxWidth: '100%', height: '150px' }} />

                                                    </div>
                                                </div>
                                            </div>
                                        <div className="w3-row-padding" style={{ margin: '0 -16px' }}>
                                            <div className="w3-half w3-margin-bottom">
                                                <div className="w3-display-container">
                                                        <img src={image2url} alt="Pisa" style={{ width: '550px', maxWidth: '100%', height: '150px' }} />
                                                    
                                                </div>
                                            </div>
                                            <div className="w3-half w3-margin-bottom">
                                                <div className="w3-display-container">
                                                        <img src={image3url} alt="Paris" style={{ width: '550px', maxWidth: '100%', height: '150px' }} />
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="w3-half w3-margin-bottom">
                                            <div className="w3-display-container">
                                                <Map
                                                    google={google}
                                                    zoom={14}
                                                    style={{
                                                        maxWidth: '100%',
                                                        width: '100%',
                                                        height: '400px',
                                                    }}
                                                    initialCenter={{
                                                        lat: location[0]?.latitude,
                                                        lng: location[0]?.longitude,
                                                    }}
                                                    center={{
                                                        lat: location[0]?.latitude,
                                                        lng: location[0]?.longitude,
                                                    }}
                                                >
                                                    <Marker position={{
                                                        lat: location[0]?.latitude,
                                                        lng: location[0]?.longitude,
                                                    }} />
                                                </Map>
                                            </div>
                                        </div>
                                </div>
                    </div>
                </div>
                    </div>
                    </div>
                <div className="w3-col m3 l3">
            <div className="hotel-info">
                <h2>{hotelName}</h2>
                <p>{city}, {country}</p>
                <p>Contact: {contactNumber}</p>
                            <p>Email: {email}</p>                            
                        </div>
                        <div className="container" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', width: '70%', margin: ' 10px 10px 20px 50px' }}>
                            <div id="searchspace">
                                <input value={searchCriteria.search1} name="search1" className="w3-button w3-block w3-white" type="text" placeholder="Search Room Type" onChange={handleSearch} aria-label="Search" />
                            </div>
                            <div id="searchspace">
                                <input value={searchCriteria.search2} name="search2" className="w3-button w3-block w3-white" type="text" placeholder="Search Capacity" onChange={handleSearch} aria-label="Search" />
                            </div>
                            <div id="searchspace">
                                <input value={searchCriteria.search3} name="search3" className="w3-button w3-block w3-white" type="text" placeholder="Search Price" onChange={handleSearch} aria-label="Search" />
                            </div>

                        </div>
                    </div>
                    <div className="container">
                        <div className="py-4">
                            <div className="card-body table-responsive p-0" id="smallbox">
                                <table className="table table-hover text-nowrap border shadow">
                                    <thead>
                                        <tr>
                                            <th scope="col">S.N</th>
                                            <th scope="col">Room Type</th>
                                            <th scope="col">Capacity</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Availability</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="myTable" className="searchable">
                                        {rooms
                                            .filter((room) =>
                                                filterRooms(
                                                    room,
                                                    searchCriteria.search1,
                                                    searchCriteria.search2,
                                                    searchCriteria.search3
                                                )
                                            ).map((room, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{room.room_type}</td>
                                                    <td>{room.capacity}</td>
                                                    <td>{room.price}</td>
                                                    <td>{room.availability ? "Available" : "Not Available"}</td>
                                                    <td>
                                                        {room.availability ? <Link
                                                            className="btn btn-success mx-2"
                                                            to={`/hotels/${room.roomId}/${id}`}
                                                        >
                                                            Book
                                                        </Link> : <h1 style={{ color: 'red', fontSize: '15px' } }>Booked</h1>}
                                                                        
                                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                                
                            </div>
                            <div className="space">
                                <h2>Submit a Review</h2>
                                <div>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <div key={star} style={{ display: 'inline-block', marginRight: '5px', cursor: 'pointer' }}>
                                            {star <= Math.floor(hoverRating || rating) ? (
                                                <FaStar
                                                    size={24}
                                                    onMouseEnter={() => setHoverRating(star)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                    onClick={() => handleRatingChange(star)}
                                                    color="#ffc107"
                                                />
                                            ) : (
                                                <FaStar
                                                    size={24}
                                                    onMouseEnter={() => setHoverRating(star)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                    onClick={() => handleRatingChange(star)}
                                                    color="#e4e5e9"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <textarea
                                    value={reviewText}
                                    onChange={handleReviewTextChange}
                                    placeholder="Write your review here..."
                                    style={{ marginTop: '10px', width: '100%', height: '100px' }}
                                />
                                <button onClick={handleSubmit} style={{ marginTop: '10px' }} className="btn btn-warning">
                                    Submit Review
                                </button>
                            </div>
                        </div>

                    </div>
            </div>
        
        </div>
        <hr/>
        </>
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBKhRsPC-WWi2efkBi3Kl6al_Ir9C1SVX4', // Replace with your actual API key
})(HotelCard);