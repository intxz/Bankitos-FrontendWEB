import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Filter from "bad-words";
import { User } from "../../models/user";
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
        personality: "",
        photo: "",
      });
      setIsEditingDescription(false);
      setIsEditingGender(false);
      setIsEditingPersonality(false);
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
    const inputValue = e.target.value.trim();

    if (inputValue !== null) {
      setUserUpdate({
        ...user_update,
        description: filter.clean(inputValue),
      });
    }
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserUpdate({
      ...user_update,
      gender: e.target.value,
    });
  };

  const formatDate = (dateString: string) => {
    return dateString.split("T")[0];
  };

  const handleEditDescription = () => {
    setIsEditingDescription(true);
  };

  const handleCancelEdit = () => {
    setIsEditingDescription(false);
  };

  const handleEditPersonality = () => {
    setIsEditingPersonality(true);
  };

  const handleCancelPersonalityEdit = () => {
    setIsEditingPersonality(false);
  };

  const handleEditGender = () => {
    setIsEditingGender(true);
  };

  const handleCancelGenderEdit = () => {
    setIsEditingGender(false);
  };

  return (
    <div>
      <div className="header" onSubmit={(e) => e.preventDefault()}>
        <div className="user-header">
          <img src={user_data?.photo} alt="Profile" />
          <div>
            <p>
              {user_data?.first_name} {user_data?.last_name}
            </p>
          </div>
        </div>
        <div className="content">
          <div className="personality-container">
            <p>Personality</p>
            <section className="section-profile">
              {isEditingPersonality ? (
                <form onSubmit={handleSubmit}>
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
                  <div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancelPersonalityEdit}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <p>{user_data?.personality}</p>
                  <button onClick={handleEditPersonality}>Edit</button>
                </>
              )}
            </section>
          </div>
          <div className="description-container">
            <p>Description</p>
            <section className="section-profile">
              {isEditingDescription ? (
                <form onSubmit={handleSubmit}>
                  <textarea
                    value={user_update.description}
                    onChange={handleChange}
                  />
                  <div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <p>{user_data?.description}</p>
                  <button onClick={handleEditDescription}>Edit</button>
                </>
              )}
            </section>
          </div>
          <div className="gender-container">
            <p>Gender</p>
            <section className="section-profile">
              {isEditingGender ? (
                <form onSubmit={handleSubmit}>
                  <select
                    value={user_update.gender}
                    onChange={handleGenderChange}
                  >
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
                  <div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancelGenderEdit}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <p>{user_data?.gender}</p>
                  <button onClick={handleEditGender}>Edit</button>
                </>
              )}
            </section>
          </div>
          <div className="birthdate-container">
            <p>Birth Date</p>
            <section className="section-profile">
              <p>{user_data?.birth_date && formatDate(user_data.birth_date)}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
