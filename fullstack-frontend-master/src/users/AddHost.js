import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AddUser() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({
        password: "",
        username: "",
        email: "",
        address: "",
        mobileno: 0,
        usertype: 3,
    });

    const { password, username, email, address, mobileno, usertype } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8081/user", user);
        navigate(`/welcome_admin/${id}`);
    };
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const passField = document.querySelector('.pass-key');
        const showBtn = document.querySelector('.show');

        const handleClick = () => {
            if (passField.type === 'password') {
                passField.type = 'text';
                showBtn.textContent = 'HIDE';
                showBtn.style.color = '#3498db';
            } else {
                passField.type = 'password';
                showBtn.textContent = 'SHOW';
                showBtn.style.color = 'white';
            }
        };

        showBtn.addEventListener('click', handleClick);

        return () => {
            showBtn.removeEventListener('click', handleClick);
        };
    }, []);
    return (
        <div className="bg-img">
            <div className="content">
                <header>SPARK+</header>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="field">
                        <span className="fa fa-user"></span>
                        <input style={{ color: 'white' }} type="text" required placeholder="Enter Username" name="username"
                            value={username}
                            onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className="field space">
                        <span className="fa fa-envelope"></span>
                        <input style={{ color: 'white' }} type="email" id="email" required placeholder="Enter Email" name="email"
                            value={email}
                            onChange={(e) => onInputChange(e)} />
                        <input
                            type={"hidden"}
                            className="form-control"
                            name="usertype"
                            value={usertype}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <div className="field space">
                        <span className="fa fa-lock"></span>
                        <input style={{ color: 'white' }} type="password" className="pass-key" required placeholder="Enter Password" id="password" name="password"
                            value={password}
                            onChange={(e) => onInputChange(e)} />

                        <span className="show" onClick={handlePasswordToggle}>
                            {showPassword ? "HIDE" : "SHOW"}
                        </span>
                    </div>
                    <div className="field space">
                        <span className="fa fa-map-marker"></span>
                        <input style={{ color: 'white' }} type="text" required placeholder="Enter Address" name="address"
                            value={address}
                            onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className="field space">
                        <span className="fa fa-phone"></span>
                        <input style={{ color: 'white' }} type="text" required placeholder="Enter Mobile Number" name="mobileno"
                            value={mobileno}
                            onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className="field space">
                        <input type="submit" value="Create Host" />
                    </div>
                </form>
                <div className="login"><Link to={`/welcome_admin/${id}`}>Cancel</Link></div>
            </div>
        </div>
    );
}
