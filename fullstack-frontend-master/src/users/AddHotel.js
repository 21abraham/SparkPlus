import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AddUser() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({
        id: parseInt(`${ id }`),
        password: "",
        username: "",
        email: "",
        address: "",
        mobileno: 0,
        usertype: 3,
    });
    const [hotel, setHotel] = useState({
        country: "",
        city: "",
        hotelName: "",
        email: "",
        address: "",
        hotelurl: "",
        image1url: "",
        image2url: "",
        image3url: "",
        contactNumber: 0,
    });
    const { country, city, hotelName, contactNumber, email, address,hotelurl,image1url,image2url,image3url} = hotel;
    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const onInputChangeHotel = (e) => {
        setHotel({ ...hotel, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const newHotel = { ...hotel, user: { id: parseInt(id) } };
            const hotelResponse = await axios.post("http://localhost:8081/hotel", newHotel);
            const generatedHotelId = hotelResponse.data.hotelId;
            const newLocation = {
                hotel: { hotelId: generatedHotelId },
                latitude: 0,
                longitude: 0
            };
            await axios.post("http://localhost:8081/location", newLocation);

            navigate(`/welcome_host/${id}`);
        } catch (error) {
            console.error("Error submitting hotel:", error);
        }
    };


    useEffect(() => {
    }, []);
    return (
        <div className="bg-img">
            <div className="content" style={{padding: '60px 32px',width: '500px'} }>
                <header>SPARK+</header>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="w3-row">
                        <div className="w3-col m6 l6">
                    <div className="field">
                        <span className="fa fa-user"></span>
                        <input style={{ color: 'white' }} type="text" required placeholder="Enter Hotel Name" name="hotelName"
                            value={hotelName}
                            onChange={(e) => onInputChangeHotel(e)} />
                    </div>
                    <div className="field space">
                        <span className="fa fa-user"></span>
                        <input style={{ color: 'white' }} type="text" required placeholder="Enter Country" name="country"
                            value={country}
                            onChange={(e) => onInputChangeHotel(e)} />
                    </div>
                    <div className="field space">
                        <span className="fa fa-user"></span>
                    <select
                            style={{ color: 'white', backgroundColor: 'transparent' }}
                        required
                        name="city"
                        value={city}
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
                    <div className="field space">
                        <span className="fa fa-envelope"></span>
                        <input style={{ color: 'white' }} type="email" id="email" required placeholder="Enter Email" name="email"
                            value={email}
                            onChange={(e) => onInputChangeHotel(e)} />
                        <input
                            type={"hidden"}
                            className="form-control"
                            name="id"
                            value={id}
                            onChange={(e) => onInputChange(e)}
                                />
                    </div>
                    <div className="field space">
                        <span className="fa fa-map-marker"></span>
                        <input style={{ color: 'white' }} type="text" required placeholder="Enter Address" name="address"
                            value={address}
                            onChange={(e) => onInputChangeHotel(e)} />
                            </div>
                        </div>
                        <div className="w3-col m6 l6">
                    <div className="field">
                        <span className="fa fa-phone"></span>
                        <input style={{ color: 'white' }} type="text" required placeholder="Enter Contact Number" name="contactNumber"
                            value={contactNumber}
                            onChange={(e) => onInputChangeHotel(e)} />
                    </div>
                    <div className="field space">
                        <span className="fa fa-phone"></span>
                        <input style={{ color: 'white' }} type="text" required placeholder="Enter Hotel Image URL" name="hotelurl"
                            value={hotelurl}
                            onChange={(e) => onInputChangeHotel(e)} />
                    </div>
                    <div className="field space">
                        <span className="fa fa-phone"></span>
                        <input style={{ color: 'white' }} type="text" required placeholder="Enter Image1 URL" name="image1url"
                            value={image1url}
                            onChange={(e) => onInputChangeHotel(e)} />
                    </div>
                    <div className="field space">
                        <span className="fa fa-phone"></span>
                        <input style={{ color: 'white' }} type="text" required placeholder="Enter Image2 URL" name="image2url"
                            value={image2url}
                            onChange={(e) => onInputChangeHotel(e)} />
                    </div>
                    <div className="field space">
                        <span className="fa fa-phone"></span>
                        <input style={{ color: 'white' }} type="text" required placeholder="Enter Image3 URL" name="image3url"
                            value={image3url}
                            onChange={(e) => onInputChangeHotel(e)} />
                    </div>
                        </div>
                    </div>
                    <div className="field space">
                        <input type="submit" value="Create Hotel" />
                    </div>
                </form>
                <div className="login"><Link to={`/welcome_host/${id}`}>Cancel</Link></div>
            </div>
        </div>
    );
}
