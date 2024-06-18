import React, { useRef, useState } from "react";
import "./SignIn.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";



const apiUrl = "http://localhost:3000";
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
      const received_token: string = response.data.token;
      const received_id: string = response.data._id;
      localStorage.clear();
      localStorage.setItem("token", received_token);
      setToken(received_token);
      localStorage.setItem("_id", received_id);
      setId(received_id);

      navigate("/main_page");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  
  const handleGoogleLogin = async (credentialResponse:any) => {
    try {
      const credentialResponseDecoded:any = jwtDecode(credentialResponse.credential);
      const idToken = credentialResponse.credential;
      const email = credentialResponseDecoded.email;


      console.log("idToken: ", idToken);
      console.log("email: ", email);
      
      const response = await axios.post(apiUrl + "/googleloginreact", { idToken, email });
      const { token, _id } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("_id", _id);

      navigate("/main_page");
    } catch (error) {
      setError("Google login failed");
      console.log(error);
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
      </form> <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => setError("Google login failed")}
      />
      {error && <p>{error}</p>}
    </div>
  );
}

export default SignIn;
