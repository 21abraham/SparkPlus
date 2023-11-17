import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (location.pathname === "/welcome_admin") {
            setIsLoggedIn(true);
        }
    }, [location]);

    const handleLogin = () => {
        navigate("/login");
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        axios
            .post("http://localhost:8081/logout")
            .then((response) => {
                console.log(response.data);
                setIsLoggedIn(false);
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="w3-bar w3-white w3-large w3-top">
            <Link to="/" className="w3-bar-item w3-button w3-aqua w3-mobile">
                <i className="fa fa-bed w3-margin-right"></i>Logo
            </Link>
            <Link to="/rooms" className="w3-bar-item w3-button w3-mobile">
                Rooms
            </Link>
            <Link to="/about" className="w3-bar-item w3-button w3-mobile">
                About
            </Link>
            <Link to="/adduser" className="w3-bar-item w3-button w3-mobile">
                Register
            </Link>
            {isLoggedIn ? (
                <button
                    onClick={handleLogout}
                    className="w3-bar-item w3-button w3-right w3-light-green w3-mobile"
                >
                    Logout
                </button>
            ) : (
                <button
                    onClick={handleLogin}
                    className="w3-bar-item w3-button w3-right w3-light-green w3-mobile"
                >
                    Login
                </button>
            )}
        </div>
    );
}
