import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style.css";

export default function EditHotel() {
    let navigate = useNavigate();
    const { id } = useParams();
    const { hotelId } = useParams();
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [hotel, setHotel] = useState({ 
        hotelName: "",
        address: "",
        city: "",
        country: "",
        contactNumber: 0,
        email: "",
        hotelurl: "",
        image1url: "",
        image2url: "",
        image3url: "",
    });
    /*const fetchLocationData = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/onelocation/${hotelId}`);
            const fetchedLocation = response.data;
            setLocation({
                locationId: fetchedLocation.locationId,
                latitude: fetchedLocation.latitude,
                longitude: fetchedLocation.longitude,
            });
        } catch (error) {
            console.error("Error fetching location data:", error);
        }
    };
    const fetchHotelData = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/hotel/${hotelId}`);
            const fetchedHotel = response.data;
            setHotel({
                hotelName: fetchedHotel.hotelName,
                address: fetchedHotel.address,
                city: fetchedHotel.city,
                country: fetchedHotel.country,
                contactNumber: fetchedHotel.contactNumber,
                email: fetchedHotel.email,
                hotelurl: fetchedHotel.hotelurl,
                image1url: fetchedHotel.image1url,
                image2url: fetchedHotel.image2url,
                image3url: fetchedHotel.image3url,
            });
        } catch (error) {
            console.error("Error fetching hotel data:", error);
        }
    };
    useEffect(() => {
        fetchLocationData();
        fetchHotelData();
    }, [location.locationId, hotelId]);*/

    const onInputChange = (e) => {
        setLocation({ ...location, [e.target.name]: e.target.value });
    };

    const onInputChangeHotel = (e) => {
        setHotel({ ...hotel, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8081/hotel/${hotelId}`, hotel);
        await axios.put(`http://localhost:8081/onelocation/${location.locationId}`, location);
        navigate(`/welcome_host/${id}`);
    };
    const fetchLocationData = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8081/onelocation/${hotelId}`);
            const fetchedLocation = response.data;
            setLocation((prevLocation) => ({
                ...prevLocation,
                latitude: fetchedLocation.latitude,
                longitude: fetchedLocation.longitude,
            }));
        } catch (error) {
            console.error("Error fetching location data:", error);
        }
    }, [location.locationId]);

    const fetchHotelData = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8081/hotel/${hotelId}`);
            const fetchedHotel = response.data;
            setHotel((prevHotel) => ({
                ...prevHotel,
                ...fetchedHotel,
            }));
        } catch (error) {
            console.error("Error fetching hotel data:", error);
        }
    }, [hotel.hotelId]);

    useEffect(() => {
        fetchLocationData();
        fetchHotelData();
    }, [fetchLocationData, fetchHotelData]);
    return (
        <div className="bg-img">
            <div className="content" style={{ padding: '60px 32px', width: '500px' }}>
                <header>SPARK+</header>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="w3-row">
                        <div className="w3-col m6 l6">
                            <div className="field">
                                <span className="fa fa-user"></span>
                                <input
                                    style={{ color: 'white' }}
                                    type="text"
                                    required
                                    placeholder="Enter Hotel Name"
                                    name="hotelName"
                                    value={hotel.hotelName}
                                    onChange={(e) => onInputChangeHotel(e)}
                                />
                            </div>
                        </div>
                        <div className="w3-col m6 l6">
                            <div className="field">
                                <span className="fa fa-phone"></span>
                                <input
                                    style={{ color: 'white' }}
                                    type="text"
                                    required
                                    placeholder="Enter Hotel Address"
                                    name="address"
                                    value={hotel.address}
                                    onChange={(e) => onInputChangeHotel(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w3-row">
                        <div className="w3-col m6 l6">
                            <div className="field">
                                <span className="fa fa-user"></span>
                                <input
                                    style={{ color: 'white' }}
                                    type="text"
                                    required
                                    placeholder="Enter Hotel Country"
                                    name="country"
                                    value={hotel.country}
                                    onChange={(e) => onInputChangeHotel(e)}
                                />
                            </div>
                        </div>
                        <div className="w3-col m6 l6">
                            <div className="field">
                                <span className="fa fa-user"></span>
                                <select
                                    style={{ color: 'white', backgroundColor: 'transparent' }}
                                    required
                                    name="city"
                                    value={hotel.city}
                                    onChange={(e) => onInputChangeHotel(e)}
                                >
                                    <option value="">Select City</option>
                                    <option value="NewYork">New York</option>
                                    <option value="CinqueTerre">Cinque Terre</option>
                                    <option value="Paris">Paris</option>
                                    <option value="Pisa">Pisa</option>
                                    <option value="SanFrancisco">San Francisco</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="w3-row">
                        <div className="w3-col m6 l6">
                            <div className="field">
                                <span className="fa fa-user"></span>
                                <input
                                    style={{ color: 'white' }}
                                    type="text"
                                    required
                                    placeholder="Enter Latitude"
                                    name="latitude"
                                    value={location.latitude}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                        </div>
                        <div className="w3-col m6 l6">
                            <div className="field">
                                <span className="fa fa-phone"></span>
                                <input
                                    style={{ color: 'white' }}
                                    type="text"
                                    required
                                    placeholder="Enter Longitude"
                                    name="longitude"
                                    value={location.longitude}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w3-row">
                        <div className="w3-col m6 l6">
                            <div className="field">
                                <span className="fa fa-user"></span>
                                <input
                                    style={{ color: 'white' }}
                                    type="text"
                                    required
                                    placeholder="Enter Hotel Email"
                                    name="email"
                                    value={hotel.email}
                                    onChange={(e) => onInputChangeHotel(e)}
                                />
                            </div>
                        </div>
                        <div className="w3-col m6 l6">
                            <div className="field">
                                <span className="fa fa-phone"></span>
                                <input
                                    style={{ color: 'white' }}
                                    type="text"
                                    required
                                    placeholder="Enter Hotel URL"
                                    name="hotelurl"
                                    value={hotel.hotelurl}
                                    onChange={(e) => onInputChangeHotel(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w3-row">
                        <div className="w3-col m6 l6">
                            <div className="field">
                                <span className="fa fa-user"></span>
                                <input
                                    style={{ color: 'white' }}
                                    type="text"
                                    required
                                    placeholder="Enter Image1 URL"
                                    name="image1url"
                                    value={hotel.image1url}
                                    onChange={(e) => onInputChangeHotel(e)}
                                />
                            </div>
                        </div>
                        <div className="w3-col m6 l6">
                            <div className="field">
                                <span className="fa fa-user"></span>
                                <input
                                    style={{ color: 'white' }}
                                    type="text"
                                    required
                                    placeholder="Enter Image2 URL"
                                    name="image2url"
                                    value={hotel.image2url}
                                    onChange={(e) => onInputChangeHotel(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w3-row">
                        <div className="w3-col m12 l12" style={{padding: '0 100px' } }>
                            <div className="field">
                                <span className="fa fa-user"></span>
                                <input
                                    style={{ color: 'white' }}
                                    type="text"
                                    required
                                    placeholder="Enter Image3 URL"
                                    name="image3url"
                                    value={hotel.image3url}
                                    onChange={(e) => onInputChangeHotel(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="field space">
                        <input type="submit" value="Update Hotel" />
                    </div>
                </form>
                <div className="login"><Link to={`/welcome_host/${id}`}>Cancel</Link></div>
            </div>
        </div>
    );

}