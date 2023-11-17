import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarLoader } from 'react-spinners';

export default function Welcome_cust() {
    const [loading, setloading] = useState(false);
    function myFunction(id) {
        var x = document.getElementById(id);
        if (x.className.indexOf("w3-show") == -1) {
            x.className += " w3-show";
        } else {
            x.className = x.className.replace(" w3-show", "");
        }
    }
    const [user, setUser] = useState({
        username: "",
        email: "",
    });
    const [bookings, setBookings] = useState([]);
    const loadBookings = async () => {
        try {
            const result = await axios.get(`http://localhost:8081/allbooking/${id}`);
            setBookings(result.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load bookings");
        }
    };
    const navigate = useNavigate();
    const { id } = useParams();

    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const deleteBooking = async (id, roomId, email) => {
        setloading(true);
        try {
            const response = await fetch(`http://localhost:8081/deny/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            setTimeout(() => {
                setloading(false)
            }, 1000)
            if (response.ok) {
                const roomResponse = await axios.get(`http://localhost:8081/room/${roomId}`);
                const roomData = roomResponse.data;


                const updatedRoom = { ...roomData, availability: true };
                await axios.patch(`http://localhost:8081/availability/${roomId}`, updatedRoom);

                await axios.delete(`http://localhost:8081/booking/${id}`);
                loadBookings();
                toast.success("Room deleted successfully");
            } else {
                toast.error('Email not registered');
            }
            
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete room");
            setTimeout(() => {
                setloading(false)
            }, 1000)
        }
    };

    useEffect(() => {
        Promise.all([loadUser(), loadBookings()])
            .then(() => {
                setIsDataLoaded(true);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to load data");
            });
    }, []);

    useEffect(() => {
        if (isDataLoaded) {
            toast.success("Login successful");
        }
    }, [isDataLoaded]);
    const loadUser = async () => {
        try {
            const result = await axios.get(`http://localhost:8081/user/${id}`);
            setUser(result.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load user");
        }
    };
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
                <div className="w3-bar w3-white w3-large w3-top">
                <a href="#home" className="w3-bar-item w3-button w3-aqua w3-mobile">
                    <i className="fa fa-bed w3-margin-right"></i>SPARK+
                </a>
                <a href="#h" className="w3-bar-item w3-button w3-mobile">
                    Locations
                </a>
                <a href="#r" to="/about" className="w3-bar-item w3-button w3-mobile">
                    About
                </a>
                    <Link onClick={handleLogout} className="w3-bar-item w3-button w3-right w3-light-green w3-mobile">
                        Logout
                    </Link>
                </div>
            <header id="home" className="w3-display-container w3-content" style={{ maxWidth: '1500px' }}>
                <img className="w3-image" src="https://wallpapercave.com/wp/wp12082329.jpg" alt="The Hotel" style={{ minWidth: '1000px' }} width="1500" height="800" />
                
                <div className="w3-display-left w3-padding w3-col l6 m8">
                    <div style={{ boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 1), 0 6px 20px 0 rgba(0, 0, 0, 1)' }}>
                        <div className="w3-container w3-aqua">
                            
                        <h2><i className="fa fa-bed w3-margin-right"></i>Welcome {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h2>
                    </div>
                        <div className="w3-container w3-white w3-padding-16">
                            
                            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                                <div className="carousel-inner" style={{ overflow: 'hidden' }} >
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
                                    <div className="card-body table-responsive p-0" id="smallbox">
                                        <table className="table table-hover text-nowrap border shadow">
                                            <thead>
                                                <tr>
                                                    <th scope="col">S.N</th>
                                                    <th scope="col">Hotel Image</th>
                                                    <th scope="col">Hotel Name</th>
                                                    <th scope="col">Room Type</th>
                                                    <th scope="col">Capacity</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Booking Status</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody id="myTable" className="searchable">
                                                {bookings.map((booking, index) => (
                                                        <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td><img
                                                            src={booking.room.hotel.hotelurl}
                                                            alt="NO URL"
                                                            style={{ width: '100%', height: 'auto', maxWidth: '300px' }}
                                                        /></td>
                                                        <td>{booking.room.hotel.hotelName}</td>
                                                        <td>{booking.room.room_type}</td>
                                                        <td>{booking.room.capacity}</td>
                                                        <td>{booking.totalPrice}</td>
                                                        <td>{booking.bookingStatus}</td>
                                                        <td><button
                                                            className="btn btn-danger mx-2"
                                                            onClick={() => deleteBooking(booking.bookId,booking.room.roomId,booking.user.email)}
                                                        >
                                                            Cancel Booking
                                                        </button></td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="w3-content" style={{ maxWidth: '1532px' }}>
                <div className="w3-container w3-margin-top" id="rooms">
                    <h3 id="r">Rooms</h3>
                    <p>Make yourself at home is our slogan. We offer the best beds in the industry. Sleep well and rest well.</p>
                </div>

                {/*<div className="w3-row-padding">
                    <div className="w3-col m3">
                        <label><i className="fa fa-calendar-o"></i> Check In</label>
                        <input className="w3-input w3-border" type="text" placeholder="DD MM YYYY" />
                    </div>
                    <div className="w3-col m3">
                        <label><i className="fa fa-calendar-o"></i> Check Out</label>
                        <input className="w3-input w3-border" type="text" placeholder="DD MM YYYY" />
                    </div>
                    <div className="w3-col m2">
                        <label><i className="fa fa-male"></i> Adults</label>
                        <input className="w3-input w3-border" type="number" placeholder="1" />
                    </div>
                    <div className="w3-col m2">
                        <label><i className="fa fa-child"></i> Kids</label>
                        <input className="w3-input w3-border" type="number" placeholder="0" />
                    </div>
                    <div className="w3-col m2">
                        <label><i className="fa fa-search"></i> Search</label>
                        <button className="w3-button w3-block w3-black">Search</button>
                    </div>
                </div>*/}

                <div className="w3-row-padding w3-padding-16">
                    <div className="w3-third w3-margin-bottom">
                        <img src="https://image-tc.galaxy.tf/wijpeg-83d7xnjo8o9sldji0rlvfxygg/single-garden_wide.jpg?crop=0%2C100%2C1920%2C1080" alt="Norway" style={{ width: '100%' }} />
                        <div className="w3-container w3-white">
                            <h3>Single Room</h3>
                            <h6 className="w3-opacity">From $99</h6>
                            <p>Single bed</p>
                            <p>15m<sup>2</sup></p>
                            <p className="w3-large">
                                <i className="fa fa-bath"></i> <i className="fa fa-phone"></i> <i className="fa fa-wifi"></i>
                            </p>
                            {/*<button className="w3-button w3-block w3-black w3-margin-bottom">Choose Room</button>*/}
                        </div>
                    </div>
                    <div className="w3-third w3-margin-bottom">
                        <img src="https://image-tc.galaxy.tf/wijpeg-aw11ddilxjf45jj1r5aaw33gr/guest-double-room-rhg-room-5-022-marked_wide.jpg?crop=0%2C38%2C1920%2C1080&width=1920" alt="Norway" style={{ width: '100%' }} />
                        <div className="w3-container w3-white">
                            <h3>Double Room</h3>
                            <h6 className="w3-opacity">From $149</h6>
                            <p>Queen-size bed</p>
                            <p>25m<sup>2</sup></p>
                            <p className="w3-large">
                                <i className="fa fa-bath"></i> <i className="fa fa-phone"></i> <i className="fa fa-wifi"></i>{' '}
                                <i className="fa fa-tv"></i>
                            </p>
                            {/*<button className="w3-button w3-block w3-black w3-margin-bottom">Choose Room</button>*/}
                        </div>
                    </div>
                    <div className="w3-third w3-margin-bottom">
                        <img src="https://wallpapers.com/images/hd/luxury-double-bed-hotel-room-nemacolin-18fapx30qeh0akn2.jpg" alt="Norway" style={{ width: '100%' }} />
                        <div className="w3-container w3-white">
                            <h3>Deluxe Room</h3>
                            <h6 className="w3-opacity">From $199</h6>
                            <p>King-size bed</p>
                            <p>40m<sup>2</sup></p>
                            <p className="w3-large">
                                <i className="fa fa-bath"></i> <i className="fa fa-phone"></i> <i className="fa fa-wifi"></i>{' '}
                                <i className="fa fa-tv"></i> <i className="fa fa-glass"></i> <i className="fa fa-cutlery"></i>
                            </p>
                            {/*<button className="w3-button w3-block w3-black w3-margin-bottom">Choose Room</button>*/}
                        </div>
                    </div>
                </div>

                <div className="w3-row-padding" id="about">
                    <div className="w3-col l4 12">
                        <h3>About</h3>
                        <h6>
                            Our hotel is one of a kind. It is truly amazing. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                        </h6>
                        <p>
                            We accept:{' '}
                            <i className="fa fa-credit-card w3-large"></i> <i className="fa fa-cc-mastercard w3-large"></i>{' '}
                            <i className="fa fa-cc-amex w3-large"></i> <i className="fa fa-cc-cc-visa w3-large"></i>
                            <i className="fa fa-cc-paypal w3-large"></i>
                        </p>
                    </div>
                    <div className="w3-col l8 12">
                        <img src="https://wallpaperaccess.com/full/1079101.jpg" className="w3-image w3-greyscale" style={{ width: '100%' }} />
                    </div>
                </div>

                <div className="w3-row-padding w3-large w3-center" style={{ margin: '32px 0' }}>
                    <div className="w3-third">
                        <i className="fa fa-map-marker w3-text-aqua"></i> Pune, Maharashtra, India
                    </div>
                    <div className="w3-third">
                        <i className="fa fa-phone w3-text-aqua"></i> Phone: +91 9022183798
                    </div>
                    <div className="w3-third">
                        <i className="fa fa-envelope w3-text-aqua"></i> Email: admin@gmail.com
                    </div>
                </div>

                <div className="w3-panel w3-purple w3-leftbar w3-padding-32">
                    <h6>
                        <i className="fa fa-info w3-aqua w3-padding w3-margin-right"></i> On demand, we can offer playstation,
                        baby and children care, dog equipment, etc.
                    </h6>
                </div>

                <div id="h" className="w3-container">
                    <h3>Our Hotels</h3>
                    <h6>You can find our hotels anywhere in the world:</h6>
                </div>

                <div className="w3-row-padding w3-padding-16 w3-text-white w3-large">
                    <div className="w3-half w3-margin-bottom">
                        <Link to={`/CinqueTerre/${user.id}`} style={{ color: 'white' }}><div className="w3-display-container w3-opacity w3-hover-opacity-off">
                            <img src="https://images6.alphacoders.com/677/677982.jpg" alt="Cinque Terre" style={{ width: '100%' }} />
                            <span className="w3-display-bottomleft w3-padding">Cinque Terre</span>
                        </div>
                        </Link>
                    </div>
                    <div className="w3-half">
                        <div className="w3-row-padding" style={{ margin: '0 -16px' }}>
                            <div className="w3-half w3-margin-bottom">
                                <Link to={`/newyork/${user.id}`} style={{color:'white'} }><div className="w3-display-container w3-opacity w3-hover-opacity-off">
                                    <img src="https://wallpaperaccess.com/full/123346.jpg" alt="New York" style={{ width: '100%' }} />
                                    <span className="w3-display-bottomleft w3-padding">New York</span>
                                </div>
                                </Link>
                            </div>
                            <div className="w3-half w3-margin-bottom">
                                <Link to={`/SanFrancisco/${user.id}`} style={{ color: 'white' }}><div className="w3-display-container w3-opacity w3-hover-opacity-off">
                                    <img src="https://images.hdqwalls.com/download/san-francisco-california-cityscape-4k-qv-1920x1080.jpg" alt="San Francisco" style={{ width: '100%' }} />
                                    <span className="w3-display-bottomleft w3-padding">San Francisco</span>
                                </div>
                                </Link>
                            </div>
                        </div>
                        <div className="w3-row-padding" style={{ margin: '0 -16px' }}>
                            <Link to={`/Pisa/${user.id}`} style={{ color: 'white' }}><div className="w3-half w3-margin-bottom">
                                
                                <div className="w3-display-container w3-opacity w3-hover-opacity-off">
                                    <img src="https://cdn.wallpapersafari.com/76/33/v0Ho56.jpg" alt="Pisa" style={{ width: '100%' }} />
                                    <span className="w3-display-bottomleft w3-padding">Pisa</span>
                                    </div>
                            </div>
                            </Link>
                            <div className="w3-half w3-margin-bottom">
                                <Link to={`/paris/${user.id}`} style={{ color: 'white' }}><div className="w3-display-container w3-opacity w3-hover-opacity-off">
                                    <img src="https://wallpapers.com/images/featured/paris-zy4x2ow5p7j5qi4a.jpg" alt="Paris" style={{ width: '100%' }} />
                                    <span className="w3-display-bottomleft w3-padding">Paris</span>
                                </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
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
