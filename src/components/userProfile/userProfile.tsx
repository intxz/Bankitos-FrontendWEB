import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../../models/user";

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
      const response = await axios.put(apiUrl + "/users/" + _id, user_update ,{
        headers,
      });
      console.log(response.data)
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
      });
    } catch (error) {
      setError("Failed to submit the form");
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserUpdate({
      ...user_update,
      description: e.target.value, // Actualizar el estado con el nuevo valor de descripción
    });
  };

  return (
    <div>
      <div onSubmit={(e) => e.preventDefault()}>
        <p>First Name: {user_data?.first_name}</p>
        <p>Description: {user_data?.description}</p>
      </div>
      <form onSubmit={handleSubmit}>
          
          <input
            type="text"
            id="description"
            value={user_update.description}
            onChange={handleDescriptionChange}
          />
        <button type="submit">Submit</button>
        </form>
      <h1>{_id}</h1>
      <h2>{token}</h2>
    </div>
  );
}

export default UserProfile;
