import React, { useRef, useState } from "react";
import "./SigIn.css";
import axios from "axios";

const apiUrl = "http://localhost:3000";
//const apiUrl='//147.83.7.158:3000';
//const apiUrl='//api.bankitos.duckdns.org';

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiUrl + "/login", {
        email,
        password,
      });
      console.log(response.data);
      setError("fino");
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
