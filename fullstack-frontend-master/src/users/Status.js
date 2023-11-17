import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";
import { BarLoader } from 'react-spinners';
const Status = () => {
    const [booking, setBooking] = useState([]);
    const { bookId } = useParams();
    const { hostId } = useParams();
    const [email, setEmail] = useState('');
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const [bookingStatus1, setBookingStatus] = useState('');
    const deleteBooking = async () => {
        try {
            const roomResponse = await axios.get(`http://localhost:8081/room/${roomId}`);
            const roomData = roomResponse.data;


            const updatedRoom = { ...roomData, availability: true };
            await axios.patch(`http://localhost:8081/availability/${roomId}`, updatedRoom);

            await axios.delete(`http://localhost:8081/booking/${bookId}`);
            toast.success("Room deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete room");
        }
    };
    const loadBooking = async () => {
        try {
            const result = await axios.get(`http://localhost:8081/booking/${bookId}`);
            setBooking(result.data);
            setEmail(result.data.user.email);
            setRoomId(result.data.room.roomId);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load user");
        }
    };
    useEffect(() => {
        loadBooking();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        try {
            const updatedBooking = { ...booking, bookingStatus: bookingStatus1 };
            await axios.patch(`http://localhost:8081/status/${bookId}`, updatedBooking);

            if (bookingStatus1 === "Approve") {
                const response = await fetch(`http://localhost:8081/approve/${bookId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                if (response.ok) {
                    navigate(`/allbooking/${hostId}`);
                } else {
                    toast.error('Email not registered');
                }
            } else if (bookingStatus1 === "Deny") {
                const response = await fetch(`http://localhost:8081/deny/${bookId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                if (response.ok) {
                    await deleteBooking();
                    navigate(`/allbooking/${hostId}`);
                } else {
                    toast.error('Email not registered');
                }
            } else{
                navigate(`/allbooking/${hostId}`);
            }
        } catch (error) {
            console.log('An error occurred:', error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setloading(false);
        }
    };


    return (
        <div className="bg-img">
            <div className="content" style={{ overflow: 'hidden' }}>
                <BarLoader
                    color={'#7b0299'}
                    loading={loading}
                    style={{ zIndex: '999' }}
                    size={10}
                    height={10}
                    width={500}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                <header style={{ paddingTop: '50px' }}>SPARK+</header>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <span className="fa fa-envelope"></span>
                        <select
                            style={{ color: 'white', backgroundColor: 'transparent' }}
                            required
                            name="bookingStatus1"
                            value={bookingStatus1}
                            onChange={(e) => setBookingStatus(e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Approve">Approve</option>
                            <option value="Deny">Deny</option>
                        </select>
                    </div>
                    <div className="field space">
                        <input type="submit" value="Update Status" />
                    </div>
                </form>
                <div className="login"><Link to={`/allbooking/${hostId}`}>Cancel</Link></div>
            </div>
        </div>
    );
};

export default Status;
