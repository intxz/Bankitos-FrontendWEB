import React, { useRef, useState } from "react";
import "./Welcome.css";
import logoSVG from "../../utils/Images/logo.svg";
import { useNavigate } from "react-router-dom";
import BCN from "../Images/xdxd.jpg";
import SignIn from "../signin/SignIn";
import SignUp from "../register/Register";

function Welcome() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [blurBody, setBlurBody] = useState(false);

  const toggleHeaderExpansion = () => {
    setExpanded(!expanded);
  };

  const handleSignInClickIn = () => {
    if (!showSignIn) {
      setShowSignIn(true);
      setBlurBody(true);
      setShowSignUp(false);
    } else {
      setShowSignIn(false);
      setBlurBody(false);
    }
  };

  const handleSignInClickUp = () => {
    if (!showSignUp) {
      setShowSignUp(true);
      setBlurBody(true);
      setShowSignIn(false);
    } else {
      setShowSignUp(false);
      setBlurBody(false);
    }
  };

  const hello = () => {
    navigate("main_page");
  };

  return (
    <div>
      <header className="header-welcome">
        <div className="container-header">
          <div className="logo-menu">
            <div className="menu-icon" onClick={toggleHeaderExpansion}>
              &#9776;
            </div>
          </div>
          <div className="center-text" onClick={hello}>
            <h1>Bankitos</h1>
          </div>
          <div className="buttons">
            <button id="sign-in-btn" onClick={handleSignInClickIn}>
              Sign In
            </button>
            <button id="sign-up-btn" onClick={handleSignInClickUp}>
              Sign Up
            </button>
          </div>
        </div>
      </header>
      <div className={`container-body ${blurBody ? "blur" : ""}`}>
        <img className="logoSVG" src={logoSVG} alt="Bankito" />
      </div>
      {showSignIn && (
        <div className={`centered-sign-in ${showSignIn ? "active" : ""}`}>
          <SignIn />
        </div>
      )}
      {showSignUp && (
        <div className={`centered-sign-in ${showSignUp ? "active" : ""} `}>
          <SignUp />
        </div>
      )}
    </div>
  );
}

export default Welcome;
