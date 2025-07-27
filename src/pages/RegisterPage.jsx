import React, { useState, useEffect } from 'react';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import logo from "../assets/logo.png";

/* teka inaayos ko pa to. yung nagloload niyan yung code sa baba
function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (error) console.error('Page Error:', error);
    }, [error]);

    return (
        <div className="loginContainer">
        <div className="leftSection">
            <div className="slogan">
            <h2>Trial lang phoexzs ulits</h2>
            </div>
        </div>

        <div className="rightSection">
            <form className="loginBox" onSubmit={(e) => e.preventDefault()}>
            <h2 className="loginTitle">Create Account</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <div className="inputGroup">
                <label>Username</label>
                <input
                placeholder="Enter username"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                />
            </div>

            <div className="inputGroup">
                <label>Password</label>
                <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                />
            </div>

            <div className="inputGroup">
                <label>Confirm Password</label>
                <input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                />
            </div>

            <button className="loginButton" type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Sign Up'}
            </button>

            <div className="register-link">
                <p>
                Already have an account?{' '}
                <span className="register-action" onClick={() => navigate('/')}>
                    Login here
                </span>
                </p>
            </div>
            </form>
        </div>
        </div>
    );
}

export default RegisterPage;

*/

function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="loginContainer fade-slide-in">
            <div className="leftSection">
                <div className="slogan">
                <h2>Trial lang phoexzs ulits</h2>
                </div>
            </div>

            <div className="rightSection">
                <form className="loginBox" onSubmit={(e) => e.preventDefault()}>
                    <h2 className="loginTitle">Create Account</h2>

                    <div className="inputGroup">
                        <span className="label-one">Username</span>
                        <input
                        placeholder="Enter username"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        />
                    </div>

                    <div className="inputGroup">
                        <span className="label-two">Password</span>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                marginLeft: '8px',
                                background: 'none',
                                border: 'none',
                                color: '#3c7fd2',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                        }}
                        >
                        {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    <div className="inputGroup">
                        <span className="label-two">Confirm</span>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Re-enter password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="loginButton" type="submit">
                        Sign Up
                    </button>

                    <div className="register-link">
                        <p>
                            Already have an account?{' '}
                            <span className="register-action" onClick={() => navigate('/login')}>
                                Login here
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
