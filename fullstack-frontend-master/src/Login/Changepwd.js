import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BarLoader } from 'react-spinners';
import "./style.css";
import axios from 'axios';
const Changepwd = () => {
    const [loading, setloading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [otp, setOTP] = useState('');
    const [user, setUser] = useState([]);
    const [password1, setPassword] = useState('');
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        try {
            const updatedUser = { ...user, password: password1 };
            await axios.patch(`http://localhost:8081/pwd/${id}`, updatedUser);
            setTimeout(() => {
                setloading(false);
                navigate(`/login`);
            }, 6000);
        } catch (error) {
            console.log('An error occurred:', error);
            toast.error('An error occurred. Please try again.');
            setloading(false);
        }
    };

    useEffect(() => {
        toast.success('OTP Verified');
    }, []);


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
                        <span className="fa fa-lock"></span>
                        <input style={{ color: 'white' }} type="password" className="pass-key" required placeholder="Enter New Password" id="password" value={password1} onChange={(e) => setPassword(e.target.value)} />

                        <span className="show" onClick={handlePasswordToggle}>
                            {showPassword ? "HIDE" : "SHOW"}
                        </span>
                    </div>
                    <div className="field space">
                        <input type="submit" value="Change Password" />
                    </div>
                </form>
                <div className="login"><Link to="/login">Cancel</Link></div>
                <div className="signup">Don't have an account? <Link to="/adduser">Signup Now</Link></div>
            </div>
        </div>
    );
};

export default Changepwd;
