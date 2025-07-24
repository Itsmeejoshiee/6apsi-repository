import React, { useEffect, useState } from 'react';
import '../styles/LoginPage.css';
import { FaAngleLeft } from 'react-icons/fa';
import LandingPage from './LandingPage';
import LoginValidation from '../components/LoginValidation';
import Dashboard from './Dashboard';

function LoginPage() {
    const [fade, setFade] = useState(false);
    const [goToLanding, setGoToLanding] = useState(false);
    const [goToHome, setGoToHome] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        setFade(true);
    }, []);

    const handleBack = () => {
        setGoToLanding(true);
    };

    const handleLogin = () => {
        const result = LoginValidation.validateLogin(username, password);
        if (result.success) {
        setGoToHome(true);
        } else {
        setErrorMsg(result.message);
        }
    };

    if (goToLanding) {
        return <LandingPage />;
    }

    if (goToHome) {
        return <Dashboard />;
    }

    return (
        <div className={`loginContainer ${fade ? 'fade-in' : ''}`}>
        <div className="leftSection">
            <FaAngleLeft className="backIcon" onClick={handleBack} />
            <div className="slogan">
            <h2>Hello, World!</h2>
            <h2><strong>Be Good To Me</strong></h2>
            </div>
        </div>

        <div className="rightSection">
            <div className="loginBox">
            <h2 className="loginTitle">Login</h2>

            <div className="inputGroup">
                <label>Username</label>
                <input
                type="text"
                value={username}
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="inputGroup">
                <label>Password</label>
                <input
                type="password"
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

            <button className="loginButton" onClick={handleLogin}>
                Login
            </button>
            </div>
        </div>
        </div>
    );
}

export default LoginPage;
