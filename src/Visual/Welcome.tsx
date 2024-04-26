import React, { useRef, useState } from 'react';
import './Welcome.css';
import logoSVG from '../Images/logo.svg';
import BCN from '../Images/xdxd.jpg';
import SignIn from './SignIn';

function Welcome() {
    const [expanded, setExpanded] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [blurBody, setBlurBody] = useState(false);

    const toggleHeaderExpansion = () => {
        setExpanded(!expanded);
    };

    const handleSignInClick = () => {
        if (!showSignIn) {
            setShowSignIn(true); 
            setBlurBody(true); 
        } else {
            setShowSignIn(false); 
            setBlurBody(false); 
        }
    };

    return (
        <div>
            <header>
                <div className='container-header'>
                    <div className="logo-menu">
                        <div className="menu-icon" onClick={toggleHeaderExpansion}>
                            &#9776;
                        </div>
                    </div>
                    <div className="center-text">
                        <h1>Bankitos</h1>
                    </div>
                    <div className="buttons">
                        <button id="sign-in-btn" onClick={handleSignInClick}>Sign In</button>
                        <button id="sign-up-btn">Sign Up</button>
                    </div>
                </div>
            </header>
            <div className={`container-body ${blurBody ? 'blur' : ''}`}>
                <img className="logoSVG" src={logoSVG} alt="Bankito"/>
            </div>
            {showSignIn && (
                <div className="centered-sign-in">
                    <SignIn />
                </div>
            )}

        </div>
        
    );
}

export default Welcome;