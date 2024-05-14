import React, { useRef, useState } from "react";
import "./SigIn.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:3000";
//const apiUrl='//147.83.7.158:3000';
//const apiUrl='//api.bankitos.duckdns.org';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState<string>("");
  const [_id, setId] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiUrl + "/login", {
        email,
        password,
      });
      console.log(response.data);
      setError("fino");
      const recive_token: string = response.data.token;
      const recive_id: string = response.data._id;
      navigate("/main_page");
      localStorage.setItem('token', recive_token);
      setToken(recive_token);
      localStorage.setItem('_id', recive_id);
      setId(recive_id);
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default SignIn;
