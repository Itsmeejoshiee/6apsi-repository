import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';  // adjust if needed
import '../styles/LoginPage.css';
import { getFileContent, updateFile } from '../api/github';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [fadeSlide, setFadeSlide] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => setFadeSlide(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => navigate('/');

  const generateAccountId = (users) => {
    if (users.length === 0) return 'AB0001';

    const maxNumber = users.reduce((max, user) => {
      const num = parseInt(user.accountId.substring(2), 10);
      return num > max ? num : max;
    }, 0);

    const nextNumber = maxNumber + 1;
    return 'AB' + nextNumber.toString().padStart(4, '0');
  };
  const handleRegister = async () => {
    setErrorMsg('');

    if (!username.trim() || !password || !confirmPassword) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    try {
      const { content: accountsData } = await getFileContent('data/users.json');
      const users = accountsData.users || [];

      console.log('Existing users:', users);

      const exists = users.find(u => u.accountName === username);
      if (exists) {
        setErrorMsg('Username already exists.');
        return;
      }

      const accountId = generateAccountId(users);
      console.log('Generated accountId:', accountId);

      const newUser = {
        accountId,
        accountName: username,
        accountPassword: password,
        createdAt: new Date().toISOString(),
      };

      const updatedUsers = [...users, newUser];
      await updateFile('data/users.json', { users: updatedUsers }, `Register user ${accountId}`);

      await updateFile(`storage/${accountId}/tasks.json`, { tasks: [] }, `Initialize tasks for ${accountId}`);

      alert(`User registered with ID: ${accountId}`);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setErrorMsg('Registration failed. Please try again.');
    }
  };



  const goToLogin = () => navigate('/login');

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
          <h2 className="loginTitle">Create Account</h2>
          {errorMsg && <p style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</p>}

          <div className="inputGroup">
            <label className="label-one">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="inputGroup">
            <label className="label-two">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>


          <div className="inputGroup">
            <label className="label-two">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button className="loginButton" onClick={handleRegister}>
            Sign Up
          </button>

          <div className="register-link">
            <p>
              Already have an account?{' '}
              <span className="register-action" onClick={goToLogin}>
                Login here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
