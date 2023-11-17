import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";
import { BarLoader } from 'react-spinners';
const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setloading] = useState(false);
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
        setloading(true)
        try {
            const response = await fetch('http://localhost:8081/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const { id, usertype } = await response.json();
                setTimeout(() => {
                    setloading(false);
                    if (usertype === 1) {
                        navigate(`/welcome_admin/${id}`);
                    } else if (usertype === 2) {
                        navigate(`/welcome_cust/${id}`);
                    } else {
                        navigate(`/welcome_host/${id}`);
                    }
                }, 6000);
            } else {
                const error = await response.text();
                toast.error('Invalid Credentials');
                setloading(false);
            }
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
                        <input style={{color: 'white'}} type="email" id="email" required placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field space">
            <span className="fa fa-lock"></span>
                        <input style={{ color: 'white' }} type="password" className="pass-key" required placeholder="Enter Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        
                        <span className="show" onClick={handlePasswordToggle}>
                            {showPassword ? "HIDE" : "SHOW"}
                        </span>
                    </div>
          <div className="pass">
            <Link to="/forgot">Forgot Password?</Link>
                    </div>
                    <div className="field">
                        <input type="submit" value="LOGIN" />
          </div>
        </form>
                <div className="login"><Link to="/">Cancel</Link></div>
        <div className="signup">Don't have an account? <Link to="/adduser">Signup Now</Link></div>
      </div>
    </div>
    );
};

export default LoginForm;
