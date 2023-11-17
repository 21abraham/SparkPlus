import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GooglePayButton from "@google-pay/button-react";

const HotelDetails = () => {
        const [paymentResult, setPaymentResult] = useState('');

    const initiatePayment = async () => {
        try {
            const response = await axios.post(`http://localhost:8081/pgredirect/${id.toString()}/${totalPrice.toString()}/${roomId.toString()}`);

            const paymentData = response.data;
            console.log("paymentData := "+paymentData);
            if (response.ok) {
                const { result } = await response.json();
                setPaymentResult(result);
            }
            // Redirect the user to the Paytm page or handle the data as needed
        } catch (error) {
            console.error('Error initiating payment:', error);
            setPaymentResult('Payment initiation failed.');
        }
    };
    const { roomId } = useParams();
    const { id } = useParams();
    const [room, setRoom] = useState([]);
    const [user, setUser] = useState([]);
    const [booking, setBooking] = useState({
        id: parseInt(`${id}`),
        roomId: parseInt(`${roomId}`),
        checkInDate: '',
        checkOutDate: '',
        bookingStatus: 'Pending',
    });
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const updateRoomAvailability = async () => {
        try {
            const updatedRoom = { ...room, availability: false};
            await axios.patch(`http://localhost:8081/availability/${roomId}`, updatedRoom);
            toast.success("Room availability updated successfully");
        } catch (error) {
            console.error('Error updating room availability:', error);
            toast.error("Failed to update room availability");
        }
    };
    /*const handleChange = (e) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
    };*/
    const handleLogout = () => {
        axios
            .post("http://localhost:8081/logout")
            .then((response) => {
                console.log(response.data);
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
            });
    };
    useEffect(() => {
        if (roomId) {
            axios
                .post(`http://localhost:8081/calculate-total-price/${roomId}`, booking)
                .then((response) => {
                    setTotalPrice(response.data);
                })
                .catch((error) => {
                    console.error('Error calculating total price:', error);
                    setTotalPrice(0);
                });
        }
    }, [roomId, booking]);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await updateRoomAvailability();

        const newBooking = {
            ...booking,
            room: { roomId: parseInt(roomId), availability: false },
            user: { id: parseInt(id) },
            totalPrice: totalPrice,
        };

        await axios.post("http://localhost:8081/booking", newBooking);

        setLoading(false);
        navigate(`/welcome_cust/${id}`);
    };

    const onInputChange = (e) => {
        setBooking({ ...booking, [e.target.name]: e.target.value });
    };
    const onInputChangeRoom = (e) => {
        setRoom({ ...room, [e.target.name]: e.target.value });
    };
    const onInputChangeUser = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        setBooking(prevBooking => ({
            ...prevBooking,
            id: parseInt(id),
            roomId: parseInt(roomId),
        }));
    }, [id, roomId]);

    return (
        <div>
            <div className="w3-bar w3-white w3-large w3-top">
                <Link to={`/welcome_cust/${id}`} className="w3-bar-item w3-button w3-aqua w3-mobile">
                    <i className="fa fa-bed w3-margin-right"></i>SPARK+
                </Link>
                <Link onClick={handleLogout} className="w3-bar-item w3-button w3-right w3-light-green w3-mobile">
                    Logout
                </Link>
            </div>
            <div style={{
                position: 'absolute', top: '30%', left: '50%', zIndex: '999', textAlign: 'center', padding: '60px 32px 20px 32px', width: '500px',  transform: 'translate(-50%,-50%)'
  ,background: 'rgba(255,255,255,0.04)'
                , boxShadow: '-1px 4px 28px 0px rgba(0,0,0,0.75)'
            }}>
            <h1>Booking Now</h1>
                <form onSubmit={(e) => onSubmit(e)}>
                    <input
                        type={"hidden"}
                        className="form-control"
                        name="id"
                        value={id}
                        onChange={(e) => onInputChangeUser(e)}
                    />
                    <input
                        type={"hidden"}
                        className="form-control"
                        name="roomId"
                        value={roomId}
                        onChange={(e) => onInputChangeRoom(e)}
                    />
                    <div></div>
                    <label htmlFor="checkInDate" style={{ float: 'left' }}>Check-in Date:</label>
                    <br />
            <div className="field">
                        <input
                type="date"
                id="checkInDate"
                name="checkInDate"
                value={booking.checkInDate}
                onChange={(e) => onInputChange(e)}
                required
                        />
                    </div>
                    <label htmlFor="checkOutDate" style={{ float: 'left' }}>Check-out Date:</label>
                    <br/>
                    <div className="field">
            
            <input
                type="date"
                id="checkOutDate"
                name="checkOutDate"
                value={booking.checkOutDate}
                onChange={(e) => onInputChange(e)}
                required
                    />
                    <input
                        type={"hidden"}
                        className="form-control"
                        name="totalPrice"
                        value={totalPrice}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <b>Total Price: {totalPrice}</b>
                    <div className="form space">
                        <GooglePayButton
                            environment="TEST"
                            paymentRequest={{
                                apiVersion: 2,
                                apiVersionMinor: 0,
                                allowedPaymentMethods: [
                                    {
                                        type: 'CARD',
                                        parameters: {
                                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                            allowedCardNetworks: ['VISA', 'MASTERCARD'],
                                        },
                                        tokenizationSpecification: {
                                            type: 'PAYMENT_GATEWAY',
                                            parameters: {
                                                gateway: 'example',
                                                gatewayMerchantId: 'exampleGatewayMerchantId',
                                            },
                                        },
                                    },
                                ],
                                merchantInfo: {
                                    merchantId: '12345678901234567890',
                                    merchantName: 'Demo Merchant',
                                },
                                transactionInfo: {
                                    totalPriceStatus: 'FINAL',
                                    totalPriceLabel: 'Total',
                                    totalPrice: `${ totalPrice }`,
                                    currencyCode: 'USD',
                                    countryCode: 'US',
                                },
                            }}
                            onLoadPaymentData={paymentData => {
                                console.log('load payment data', paymentData.paymentMethodData);
                                navigate(`/welcome_cust/${id}`);
                            }}

                        ></GooglePayButton></div>
                    <div className="field space" style={{ border: '3px solid black' } }>
                        <input className="w3-light-green" style={{ color: 'black' }} type="submit" value="Book" disabled={ loading} />
                    </div>
                </form>
                <div className="form space">
                    <button className="btn btn-primary" onClick={initiatePayment}>Paytm Payment</button>
                    <div>{paymentResult}</div>
                </div>
            </div>
            <footer className=" w3-black w3-center w3-margin-top" style={
                {
                    position: 'fixed', width: '100%', bottom: '0'
                }
            }>
                <div className="w3-aqua" style={{ textAlign: 'center', color: 'black', padding: '20px 0 20px 20px', fontSize: '20px' }}>
                    <div className="row">
                        <div className="col-lg-6">
                            <b style={{ fontSize: '30px' }}>About Us:</b>
                            <br />
                            <ul className="list-unstyled">
                                <li>Computer department.</li>
                                <li>Abraham Ahmed</li>
                                <li>Ajinkya Khete</li>
                                <li>Kaustubh Bhavsar</li>
                            </ul>
                        </div>
                        <div className="col-lg-6">
                            <b style={{ fontSize: '30px' }}>Instructor:</b>
                            <br />
                            <p>Mr. Suresh Pal, Instructor of Super 30 Batch.</p>
                            <br />
                        </div>
                    </div>
                </div>
                <div style={{ fontSize: '20px', textAlign: 'center', backgroundColor: 'black' }}>
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="https://mitaoe.ac.in/" ><h>@MITAOE</h></Link>
                </div>
            </footer>
        </div>
    );
};

export default HotelDetails;
