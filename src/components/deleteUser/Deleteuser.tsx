import React, { useRef, useState } from "react";
import axios from "axios";
import "./DeleteUser.css";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:3000";
//const apiUrl='//147.83.7.158:3000';
//const apiUrl='//api.bankitos.duckdns.org';

function DeleteUser({
  _id,
  token,
  onCancel,
}: {
  _id: string;
  token: string;
  onCancel: () => void;
}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const headers = {
    "x-access-token": token,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.delete(apiUrl + "/users/" + _id, {
        headers,
      });
      console.log(response.data);
      setError("fino");
      navigate("/");
    } catch (error) {
      setError("no va");
    }
  };

  return (
    <div className="container">
      <h2>Delete Account</h2>
      <form className="form-delete" onSubmit={handleSubmit}>
        <h3>Are you sure to delete the account?</h3>
        <button type="submit">Delete</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default DeleteUser;
