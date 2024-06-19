import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Filter from "bad-words";
import { User } from "../../../models/user";
import "./userProfile.css";

const apiUrl = "http://localhost:3000";

const filter = new Filter();

interface FormErrors {
  [key: string]: string;
}

function UserProfile({ _id, token }: { _id: string; token: string }) {
  const [user_data, setUserData] = useState<User>();
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingPersonality, setIsEditingPersonality] = useState(false);
  const [isEditingGender, setIsEditingGender] = useState(false);
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingMiddleName, setIsEditingMiddleName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);

  const [user_update, setUserUpdate] = useState<User>({
    first_name: "",
    middle_name: "",
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
        middle_name: "",
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
      setIsEditingDescription(false);
      setIsEditingGender(false);
      setIsEditingPersonality(false);
      setIsEditingFirstName(false);
      setIsEditingMiddleName(false);
      setIsEditingLastName(false);
      setIsEditingEmail(false);
      setIsEditingPhoto(false);
    } catch (error) {
      setError("Failed to submit the form");
    }
  };

  const handlePersonalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserUpdate({
      ...user_update,
      personality: e.target.value,
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setUserUpdate({
      ...user_update,
      [name]: filter.clean(value),
    });
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserUpdate({
      ...user_update,
      gender: e.target.value,
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(apiUrl + "/upload", formData, {
        headers: {
          "x-access-token": token,
          "Content-Type": "multipart/form-data",
        },
      });

      setUserUpdate({ ...user_update, photo: response.data.url }); // Update the user_update state with the returned URL
      console.log("Uploaded image:", response.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image");
    }
  };

  const formatDate = (dateString: string) => {
    return dateString.split("T")[0];
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-photo">
          <img src={user_data?.photo} alt="Profile" />
          <div className="edit-icon" onClick={() => setIsEditingPhoto(true)}>
            ✏️
          </div>
          {isEditingPhoto && (
            <form onSubmit={handleSubmit}>
              <input type="file" onChange={handleFileUpload} />
              <div>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setIsEditingPhoto(false)}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
        <h1>
          {user_data?.first_name}{" "}
          {user_data?.middle_name && `${user_data.middle_name} `}
          {user_data?.last_name}
        </h1>
      </div>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-field">
          <label>First Name</label>
          {isEditingFirstName ? (
            <>
              <input
                type="text"
                name="first_name"
                value={user_update.first_name}
                onChange={handleChange}
              />
              <div className="button-group">
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => setIsEditingFirstName(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p>{user_data?.first_name}</p>
              <button onClick={() => setIsEditingFirstName(true)}>Edit</button>
            </>
          )}
        </div>
        <div className="profile-field">
          <label>Middle Name</label>
          {isEditingMiddleName ? (
            <>
              <input
                type="text"
                name="middle_name"
                value={user_update.middle_name}
                onChange={handleChange}
              />
              <div className="button-group">
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => setIsEditingMiddleName(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p>{user_data?.middle_name}</p>
              <button onClick={() => setIsEditingMiddleName(true)}>Edit</button>
            </>
          )}
        </div>
        <div className="profile-field">
          <label>Last Name</label>
          {isEditingLastName ? (
            <>
              <input
                type="text"
                name="last_name"
                value={user_update.last_name}
                onChange={handleChange}
              />
              <div className="button-group">
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => setIsEditingLastName(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p>{user_data?.last_name}</p>
              <button onClick={() => setIsEditingLastName(true)}>Edit</button>
            </>
          )}
        </div>
        <div className="profile-field">
          <label>Email</label>
          {isEditingEmail ? (
            <>
              <input
                type="email"
                name="email"
                value={user_update.email}
                onChange={handleChange}
              />
              <div className="button-group">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setIsEditingEmail(false)}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p>{user_data?.email}</p>
              <button onClick={() => setIsEditingEmail(true)}>Edit</button>
            </>
          )}
        </div>
        <div className="profile-field">
          <label>Personality</label>
          {isEditingPersonality ? (
            <>
              <select
                value={user_update.personality}
                onChange={handlePersonalityChange}
              >
                <option value="">Select Personality</option>
                <option value="Introverted">Introverted</option>
                <option value="Extroverted">Extroverted</option>
                <option value="Analytical">Analytical</option>
                <option value="Creative">Creative</option>
              </select>
              <div className="button-group">
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => setIsEditingPersonality(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p>{user_data?.personality}</p>
              <button onClick={() => setIsEditingPersonality(true)}>
                Edit
              </button>
            </>
          )}
        </div>
        <div className="profile-field">
          <label>Description</label>
          {isEditingDescription ? (
            <>
              <textarea
                name="description"
                value={user_update.description}
                onChange={handleChange}
              />
              <div className="button-group">
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => setIsEditingDescription(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p>{user_data?.description}</p>
              <button onClick={() => setIsEditingDescription(true)}>
                Edit
              </button>
            </>
          )}
        </div>
        <div className="profile-field">
          <label>Gender</label>
          {isEditingGender ? (
            <>
              <select value={user_update.gender} onChange={handleGenderChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Bankito">Bankito</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Genderqueer">Genderqueer</option>
                <option value="Transgender">Transgender</option>
                <option value="Agender">Agender</option>
                <option value="Bigender">Bigender</option>
                <option value="Genderfluid">Genderfluid</option>
                <option value="Two-spirit">Two-spirit</option>
                <option value="Other">Other</option>
              </select>
              <div className="button-group">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setIsEditingGender(false)}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p>{user_data?.gender}</p>
              <button onClick={() => setIsEditingGender(true)}>Edit</button>
            </>
          )}
        </div>
        <div className="profile-field">
          <label>Birth Date</label>
          <p>{user_data?.birth_date && formatDate(user_data.birth_date)}</p>
        </div>
        <div className="profile-field">
          <label>Phone</label>
          <p>{user_data?.phone_number}</p>
        </div>
        <div className="profile-field">
          <label>Address</label>
          <p>{user_data?.address}</p>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default UserProfile;
