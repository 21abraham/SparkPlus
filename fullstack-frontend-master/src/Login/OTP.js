import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BarLoader } from 'react-spinners';
import "./style.css";
import { ReactSession } from 'react-client-session';

const OTP = () => {
    const [loading, setloading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [otp, setOTP] = useState('');
    useEffect(() => {
        toast.success('OTP is send to your registered email');
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        try {
            const storedOTP = localStorage.getItem('gotp');
            console.log(storedOTP);
            console.log(otp);
            setTimeout(() => {
                setloading(false);
            if (otp === storedOTP) {
                navigate(`/changepwd/${id}`);
            } else {
                navigate(`/otp/${id}`);
                toast.error('Invalid OTP');
            }
        }, 6000);
        } catch (error) {
            console.log('An error occurred:', error);
            toast.error('An error occurred. Please try again.');
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
                        <input style={{ color: 'white' }} type="number" id="email" required placeholder="Enter OTP" value={otp} onChange={(e) => setOTP(e.target.value)} />
                    </div>
                    <div className="field space">
                        <input type="submit" value="Verify" />
                    </div>
                </form>
                <div className="login"><Link to="/login">Cancel</Link></div>
                <div className="signup">Don't have an account? <Link to="/adduser">Signup Now</Link></div>
            </div>
        </div>
    );
};

export default OTP;
