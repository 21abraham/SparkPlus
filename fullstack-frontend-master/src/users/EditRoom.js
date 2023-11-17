import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style.css";

export default function EditRoom() {
    let navigate = useNavigate();
    const { id } = useParams();
    const { hotelId } = useParams();
    const [room, setRoom] = useState({
        room_type: "",
        price: "",
        capacity: "",
        availability: false
    });
    const [isAvailable, setIsAvailable] = useState(false);

    const fetchRoomData = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/room/${id}`);
            const fetchedRoom = response.data;
            setRoom({
                room_type: fetchedRoom.room_type,
                price: fetchedRoom.price,
                capacity: fetchedRoom.capacity,
                availability: fetchedRoom.availability
            });
            setIsAvailable(fetchedRoom.availability);
        } catch (error) {
            console.error("Error fetching room data:", error);
        }
    };

    useEffect(() => {
        fetchRoomData();
    }, []);

    const onAvailabilityChange = (e) => {
        setIsAvailable(e.target.checked);
        setRoom({ ...room, availability: e.target.checked });
    };

    const onInputChange = (e) => {
        setRoom({ ...room, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const updatedRoom = { ...room };
        await axios.put(`http://localhost:8081/room/${id}`, updatedRoom);
        navigate(`/showroom/${hotelId}`);
    };
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
                                    placeholder="Enter Room Capacity"
                                    name="capacity"
                                    value={room.capacity}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="field space">
                                <span className="fa fa-user"></span>
                                <select
                                    style={{ color: 'white', backgroundColor: 'transparent' }}
                                    required
                                    name="room_type"
                                    value={room.room_type}
                                    onChange={(e) => onInputChange(e)}
                                >
                                    <option value="">Select Room Type</option>
                                    <option value="Single">Single</option>
                                    <option value="Double">Double</option>
                                    <option value="Deluxe">Deluxe</option>
                                </select>
                            </div>
                        </div>
                        <div className="w3-col m6 l6">
                            <div className="field">
                                <span className="fa fa-phone"></span>
                                <input
                                    style={{ color: 'white' }}
                                    type="text"
                                    required
                                    placeholder="Enter Price"
                                    name="price"
                                    value={room.price}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="field space">
                                <div className="w3-row">
                                    <div className="w3-col m10 l10">
                                        <label htmlFor="availability" id="present" >Availability:</label>
                                    </div>
                                    <div className="w3-col m2 l2">
                                        <input
                                            style={{ position: 'absolute' }}
                                            type="checkbox"
                                            id="availability"
                                            name="availability"
                                            checked={isAvailable}
                                            onChange={(e) => onAvailabilityChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field space">
                        <input type="submit" value="Update Room" />
                    </div>
                </form>
                <div className="login"><Link to={`/showroom/${hotelId}`}>Cancel</Link></div>
            </div>
        </div>
    );

}