import React, { useState } from 'react';
import LoginPage from './LoginPage';
import { FaAngleLeft } from 'react-icons/fa';
import '../styles/LoginPage.css';
import { getFileContent, updateFile } from '../api/github';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [goToLogin, setGoToLogin] = useState(false);

    const generateAccountId = (users) => {
        const lastUser = users[users.length - 1];
        if (!lastUser) return 'AB0001';
        const number = parseInt(lastUser.accountId.substring(2)) + 1;
        return 'AB' + number.toString().padStart(4, '0');
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
        const { content: accountsData } = await getFileContent('accounts.json');
        const users = accountsData.users || [];

        const exists = users.find(u => u.accountName === name);
        if (exists) return setError('Username already exists.');
        if (password !== confirmPassword) return setError('Passwords do not match.');

        const accountId = generateAccountId(users);
        const newUser = {
            accountId,
            accountName: name,
            accountPassword: password,
            createdAt: new Date().toISOString()
        };

        const updatedUsers = [...users, newUser];
        await updateFile('accounts.json', { users: updatedUsers }, `Register user ${accountId}`);

        await updateFile(`storage/${accountId}/tasks.json`, { tasks: [] }, `Initialize tasks for ${accountId}`);

        alert('User registered with ID: ' + accountId);
        setGoToLogin(true);

        } catch (err) {
        console.error(err);
        setError('Registration failed.');
        }
    };

    if (goToLogin) return <LoginPage />;

    return (
        <div className="loginContainer fade-in">
        <div className="backIcon" onClick={() => setGoToLogin(true)}>
            <FaAngleLeft />
        </div>

        <div className="leftSection">
            <div className="slogan">
            <h2>Trial lang phoexzs ulits</h2>
            </div>
        </div>

        <div className="rightSection">
            <form onSubmit={handleRegister} className="loginBox">
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

            <button className="loginButton" type="submit">Sign Up</button>

            <div className="register-link">
                <p>
                Already have an account?{' '}
                <span className="register-action" onClick={() => setGoToLogin(true)}>
                    Login here
                </span>
                </p>
            </div>
            </form>
        </div>
        </div>
    );
};

export default RegisterPage;
