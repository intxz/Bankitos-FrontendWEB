import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./MainPage.css";

function MainPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>("");
  const [_id, setId] = useState<string>("");

  useEffect(() => {
    const stored_token: string | null = localStorage.getItem("token");
    const stored_id: string | null = localStorage.getItem("_id");
    if (stored_token && stored_id) {
      setToken(stored_token);
      setId(stored_id);
    }
  }, []);

  const hello = () => {
    navigate("user_profile");
  };

  return (
    <div className="main-container">
      <nav className="nav-user">
        <li onClick={hello}>Enlace</li>
      </nav>
      <nav className="nav-place">
        <a href="1" className="nav-link">
          1
        </a>
        <a href="2" className="nav-link">
          2
        </a>
        <a href="3" className="nav-link">
          3
        </a>
        <a href="4" className="nav-link">
          4
        </a>
        <a href="5" className="nav-link">
          5
        </a>
      </nav>
      <main className="content-container">
        <h1>{token}</h1>
        <h1>{_id}</h1>
      </main>
    </div>
  );
}

export default MainPage;
