import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../../models/user";
import './userProfile.css'

const apiUrl = "http://localhost:3000";

interface FormErrors {
  [key: string]: string;
}

function UserProfile({ _id, token }: { _id: string; token: string }) {
  const [user_data, setUserData] = useState<User>();
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const [user_update, setUserUpdate] = useState<User>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    gender: "",
    description: "",
    birth_date: "",
    personality: "",
    photo: "",
  });

  const headers = {
    "x-access-token": token,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + "/users/" + _id, {
          headers,
        });
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        setError("Failed to fetch user data");
      }
    };

    fetchData();
  }, [_id, token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(apiUrl + "/users/" + _id, user_update, {
        headers,
      });
      console.log(response.data);
      setUserData(response.data);
      setUserUpdate({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone_number: "",
        gender: "",
        description: "",
        birth_date: "",
        personality: '',
        photo: "", 
      });
    } catch (error) {
      setError("Failed to submit the form");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserUpdate({
      ...user_update,
      description: e.target.value,
    });
  };

  return (
    <div>
      <div onSubmit={(e) => e.preventDefault()}>
        <header className="header">
          <div className="user-header">
          <img src={user_data?.photo} alt="Profile" />
          <div>
            <p>{user_data?.first_name} {user_data?.last_name}</p>
          </div>
          </div>
        </header>
        <div className="content">
          <div className="personality-container">
            <p>Personality</p>
            <p>{user_data?.personality}</p>
          </div>
          <div className="description-container">
            <p>Description</p>
            <section className="description-section">
              <p>{user_data?.description}</p>
            </section>
          </div>
          <div className="gender-container">
            <p>Gender</p>
            <p>{user_data?.gender}</p>
          </div>
          <div className="birthdate-container">
            <p>Birth Date</p>
            <p>{user_data?.birth_date}</p>
          </div>
        </div>
      </div>
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="description"
          value={user_update.description}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
}

export default UserProfile;
