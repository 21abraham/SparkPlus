import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style.css";

export default function AddRoom() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [room, setRoom] = useState([]);
    const [hotel, setHotel] = useState({
        hotelId: parseInt(`${id}`)
    });
    const { room_type,price,capacity} = room;
    const [isAvailable, setIsAvailable] = useState(false);
    const onAvailabilityChange = (e) => {
        setIsAvailable(e.target.checked);
        setRoom({ ...room, availability: e.target.checked });
    };
    const onInputChange = (e) => {
        setHotel({ ...hotel, [e.target.name]: e.target.value });
    };
    const onInputChangeHotel = (e) => {
        setRoom({ ...room, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const newRoom = { ...room, hotel: { hotelId: parseInt(id) } };
        await axios.post("http://localhost:8081/room", newRoom);
        navigate(`/showroom/${id}`);
    };
    useEffect(() => {
    }, []);
    return (
        <div className="bg-img">
            <div className="content" style={{ padding: '60px 32px', width: '500px' }}>
                <header>SPARK+</header>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="w3-row">
                        <div className="w3-col m6 l6">
                            <div className="field">
                                <span className="fa fa-user"></span>
                                <input style={{ color: 'white' }} type="text" required placeholder="Enter Room Capacity" name="capacity"
                                    value={capacity}
                                    onChange={(e) => onInputChangeHotel(e)} />
                            </div>
                            <div className="field space">
                                <span className="fa fa-user"></span>
                                <input
                                    type={"hidden"}
                                    className="form-control"
                                    name="id"
                                    value={id}
                                    onChange={(e) => onInputChange(e)}
                                />
                                <select
                                    style={{ color: 'white', backgroundColor: 'transparent' }}
                                    required
                                    name="room_type"
                                    value={room_type}
                                    onChange={(e) => onInputChangeHotel(e)}
                                >
                                    <option value="">Select Room Type</option>
                                    <option value="Single">Single</option>
                                    <option value="Double">Double</option>
                                    <option value="Deluxe">Deluxe</option>
                                    {/* Add more options as needed */}
                                </select>
                            </div>
                        </div>
                        <div className="w3-col m6 l6">
                            <div className="field">
                                <span className="fa fa-phone"></span>
                                <input style={{ color: 'white' }} type="text" required placeholder="Enter Price" name="price"
                                    value={price}
                                    onChange={(e) => onInputChangeHotel(e)} />
                            </div>
                            <div className="field space">
                                <div className="w3-row">
                                    <div className="w3-col m10 l10">
                                <label htmlFor="availability" id="present" >Availability:</label>
                                    </div>
                                    <div className="w3-col m2 l2">
                                        <input
                                            style={{ position: 'absolute'}}
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
                        <input type="submit" value="Create Room" />
                    </div>
                </form>
                <div className="login"><Link to={`/showroom/${id}`}>Cancel</Link></div>
            </div>
        </div>
    );
}
