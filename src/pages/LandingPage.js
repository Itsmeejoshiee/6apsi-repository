import React, { useState } from 'react';
import '../styles/LandingPage.css';
import LoginPage from './LoginPage.js';

function LandingPage() {
    const [goTo, setGoTo] = useState(false);
    const GoToLogin = (val) => {
        setGoTo(true)
    };

    if (goTo){
        return <LoginPage/>;
    };

    return (
        <div className="landingContainer">
            <div className="content">
                <div className="slogan">
                    <h2>Trial lang po</h2>
                    <h2><strong>pwede pa palitan</strong></h2>
                </div>
            </div>
            <button onClick={GoToLogin}>Get Started</button>
        </div>
    );
}

export default LandingPage;
