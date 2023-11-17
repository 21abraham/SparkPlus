import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BarLoader } from 'react-spinners';
import "./style.css";
import { ReactSession } from 'react-client-session';

const Forgot = () => {
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        try {
            const response = await fetch('http://localhost:8081/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email}),
            });
            setTimeout(() => {
                setloading(false)
            }, 1000)
            if (response.ok) {
                const { id, gotp } = await response.json();
                localStorage.setItem('gotp', gotp);
                navigate(`/otp/${id}`);
            } else {
                setTimeout(() => {
                    setloading(false)
                }, 1000)
                navigate(`/forgot`);
                toast.error('Email not registered');
            }
        } catch (error) {
            setTimeout(() => {
                setloading(false)
            }, 1000)
            console.log('An error occurred:', error);
            toast.error('An error occurred. Please try again.');
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
                        <input style={{ color: 'white' }} type="email" id="email" required placeholder="Enter Registered Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="field space">
                        <input type="submit" value="Send OTP" />
                    </div>
                </form>
                <div className="login"><Link to="/login">Cancel</Link></div>
                <div className="signup">Don't have an account? <Link to="/adduser">Signup Now</Link></div>
            </div>
        </div>
    );
};

export default Forgot;
