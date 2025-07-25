import React, { useEffect, useState } from 'react';
import '../styles/LoginPage.css';
import { FaAngleLeft } from 'react-icons/fa';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import RegisterPage from './RegisterPage';
import { validateLogin } from '../components/LoginValidation';

function LoginPage() {
    const [fade, setFade] = useState(false);
    const [goToLanding, setGoToLanding] = useState(false);
    const [goToHome, setGoToHome] = useState(false);
    const [goToRegister, setGoToRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        setFade(true);
    }, []);

    const handleBack = () => setGoToLanding(true);

    const handleLogin = async () => {
        const result = await validateLogin(username, password);
        if (result.success) {
            setGoToHome(true);
        } else {
            setErrorMsg(result.message);
        }
    };

    if (goToLanding) return <LandingPage />;
    if (goToHome) return <Dashboard />;
    if (goToRegister) return <RegisterPage />;

    return (
        <div className={`loginContainer ${fade ? 'fade-in' : ''}`}>
            <div className="leftSection">
                <FaAngleLeft className="backIcon" onClick={handleBack} />
                <div className="slogan">
                    <h2>Trial lang</h2>
                    <h2><strong>Pwede pa palitan</strong></h2>
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
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                    </div>

                    <div className="inputGroup">
                        <label>Password</label>
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
                            <span onClick={() => setGoToRegister(true)} className="register-action">
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
