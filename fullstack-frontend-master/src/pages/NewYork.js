import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Map, GoogleApiWrapper } from 'google-maps-react'; // Import GoogleApiWrapper
import HotelCard from './HotelCard';
import { BarLoader } from 'react-spinners';
const NewYork = (props) => {
    const [hotels, setHotels] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setloading] = useState(false);
    useEffect(() => {
        setloading(true);
        axios
            .get("http://localhost:8081/city/NewYork")
            .then((response) => {
                setHotels(response.data);
                setTimeout(() => {
                    setloading(false)
                }, 1000)
            })
            .catch((error) => {
                console.error(error);
                setTimeout(() => {
                    setloading(false)
                }, 1000)
            });

    }, []);

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

    return (
        <div>
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
            <div className="w3-bar w3-white w3-large w3-top">
                <Link to={`/welcome_cust/${id}`} className="w3-bar-item w3-button w3-aqua w3-mobile">
                    <i className="fa fa-bed w3-margin-right"></i>SPARK+
                </Link>
                <Link onClick={handleLogout} className="w3-bar-item w3-button w3-right w3-light-green w3-mobile">
                    Logout
                </Link>
            </div>
            <div style={{ padding: '50px 0 20px 0' }}>
                <h1>HOTELS LIST IN NEW YORK</h1>
            </div>
            <div className="hotel-list">
                {hotels.map((hotel) => (
                    <HotelCard key={hotel.hotel_id} hotel={hotel} id={id} google={props.google} />
                ))}
            </div>
            <footer className=" w3-black w3-center w3-margin-top">
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
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBKhRsPC-WWi2efkBi3Kl6al_Ir9C1SVX4', // Replace with your actual API key
})(NewYork);
