import React, { useEffect, useState } from 'react';
import '../styles/LoginPage.css';
import { FaAngleLeft } from 'react-icons/fa';
import { validateLogin } from '../components/LoginValidation';
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [fadeSlide, setFadeSlide] = useState(false);

    useEffect(() => {
        setTimeout(() => {
        setFadeSlide(true);
        }, 100);
    }, []);

    const handleBack = () => navigate('/');

    const handleLogin = async () => {
        const result = await validateLogin(username, password);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setErrorMsg(result.message);
        }
    };

    const goToRegister = () => navigate('/register');

    return (
        <div className={`loginContainer ${fadeSlide ? 'fade-slide-in' : ''}`}>
            <div className="leftSection">
                <FaAngleLeft className="backIcon" onClick={handleBack} />
                <div className="logo">
                    <img src={logo} alt="Commit Logo" className="login-logo" />
                    <h1 className="login-logo-text">Commit Task</h1>
                </div>
            </div>
            <div className="rightSection">
                <div className="loginBox">
                    <div className="inputGroup">
                        <label className="label-one">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                    </div>

                    <div className="inputGroup">
                        <label className="label-two">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

                    <button className="loginButton" onClick={handleLogin}>
                        Login
                    </button>

                    <div className="register-link">
                        <p>
                            Don't have an account?{' '}
                            <span onClick={goToRegister} className="register-action">
                                Register
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
