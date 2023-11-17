import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style.css";

export default function EditUser() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({
        username: "",
        email: "",
    });

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/user/${id}`);
            const fetchedUser = response.data;
            setUser({
                username: fetchedUser.username,
                email: fetchedUser.email,
                mobileno: fetchedUser.mobileno,
                address: fetchedUser.address,
                password: fetchedUser.password,
                usertype: fetchedUser.usertype,
            });
        } catch (error) {
            console.error("Error fetching room data:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const updateduser = { ...user };
        await axios.put(`http://localhost:8081/user/${id}`, updateduser);
        navigate(`/welcome_admin/${id}`);
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
                                    placeholder="Enter Username"
                                    name="username"
                                    value={user.username}
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
                                    placeholder="Enter Email"
                                    name="email"
                                    value={user.email}
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
                                    placeholder="Enter Mobile Number"
                                    name="mobileno"
                                    value={user.mobileno}
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
                                    placeholder="Enter Address"
                                    name="address"
                                    value={user.address}
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
                                    placeholder="Enter Password"
                                    name="password"
                                    value={user.password}
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
                                    placeholder="Enter User Type"
                                    name="address"
                                    value={user.usertype}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="field space">
                        <input type="submit" value="Update User" />
                    </div>
                </form>
                <div className="login"><Link to={`/welcome_admin/${id}`}>Cancel</Link></div>
            </div>
        </div>
    );

}