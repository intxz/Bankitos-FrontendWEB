import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../../models/user";
import "./userProfile.css";

const apiUrl = "http://localhost:3000";

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

  const handlePersonalitySubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    try {
      const response = await axios.put(apiUrl + "/users/" + _id, user_update, {
        headers,
      });
      console.log(response.data);
      setUserData(response.data);
      setUserUpdate({
        ...user_update,
        personality: "",
      });
      setIsEditingPersonality(false);
    } catch (error) {
      setError("Failed to submit the form");
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setUserUpdate({
      ...user_update,
      description: e.target.value,
    });
  };

  const handleGenderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(apiUrl + "/users/" + _id, user_update, {
        headers,
      });
      console.log(response.data);
      setUserData(response.data);
      setUserUpdate({
        ...user_update,
        gender: "",
      });
      setIsEditingGender(false);
    } catch (error) {
      setError("Failed to submit the form");
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
                <form onSubmit={handlePersonalitySubmit}>
                  <select
                    value={user_update.personality}
                    onChange={handlePersonalityChange}
                  >
                    <option value="">Select Personality</option>
                    <option value="Introverted">Introverted</option>
                    <option value="Extroverted">Extroverted</option>
                    <option value="Analytical">Analytical</option>
                    <option value="Creative">Creative</option>
                    {/* Agrega más opciones según sea necesario */}
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
                <form onSubmit={handleGenderSubmit}>
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
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Horse">Horse</option>
                    <option value="Bird">Bird</option>
                    <option value="Fish">Fish</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Hamster">Hamster</option>
                    <option value="Snake">Snake</option>
                    <option value="Turtle">Turtle</option>
                    <option value="Frog">Frog</option>
                    <option value="Lizard">Lizard</option>
                    <option value="Guinea pig">Guinea pig</option>
                    <option value="Mouse">Mouse</option>
                    <option value="Rat">Rat</option>
                    <option value="Chinchilla">Chinchilla</option>
                    <option value="Parrot">Parrot</option>
                    <option value="Goldfish">Goldfish</option>
                    <option value="Tropical fish">Tropical fish</option>
                    <option value="Iguana">Iguana</option>
                    <option value="Ferret">Ferret</option>
                    <option value="Canary">Canary</option>
                    <option value="Budgerigar">Budgerigar</option>
                    <option value="Cockatiel">Cockatiel</option>
                    <option value="Gerbil">Gerbil</option>
                    <option value="Hedgehog">Hedgehog</option>
                    <option value="Hermit crab">Hermit crab</option>
                    <option value="Axolotl">Axolotl</option>
                    <option value="Tarantula">Tarantula</option>
                    <option value="Scorpion">Scorpion</option>
                    <option value="Centipede">Centipede</option>
                    <option value="Millipede">Millipede</option>
                    <option value="Snail">Snail</option>
                    <option value="Slug">Slug</option>
                    <option value="Praying mantis">Praying mantis</option>
                    <option value="Stick insect">Stick insect</option>
                    <option value="Leaf insect">Leaf insect</option>
                    <option value="Dragonfly">Dragonfly</option>
                    <option value="Caterpillar">Caterpillar</option>
                    <option value="Butterfly">Butterfly</option>
                    <option value="Moth">Moth</option>
                    <option value="Ladybug">Ladybug</option>
                    <option value="Beetle">Beetle</option>
                    <option value="Ant">Ant</option>
                    <option value="Bee">Bee</option>
                    <option value="Wasp">Wasp</option>
                    <option value="Hornet">Hornet</option>
                    <option value="Cicada">Cicada</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Grasshopper">Grasshopper</option>
                    <option value="Earwig">Earwig</option>
                    <option value="Firefly">Firefly</option>
                    <option value="Mosquito">Mosquito</option>
                    <option value="Housefly">Housefly</option>
                    <option value="Beetle">Beetle</option>
                    <option value="Flea">Flea</option>
                    <option value="Tick">Tick</option>
                    <option value="Louse">Louse</option>
                    <option value="Tardigrade">Tardigrade</option>
                    <option value="Sea cucumber">Sea cucumber</option>
                    <option value="Sea urchin">Sea urchin</option>
                    <option value="Sea star">Sea star</option>
                    <option value="Octopus">Octopus</option>
                    <option value="Squid">Squid</option>
                    <option value="Cuttlefish">Cuttlefish</option>
                    <option value="Clam">Clam</option>
                    <option value="Mussel">Mussel</option>
                    <option value="Oyster">Oyster</option>
                    <option value="Scallop">Scallop</option>
                    <option value="Crayfish">Crayfish</option>
                    <option value="Lobster">Lobster</option>
                    <option value="Shrimp">Shrimp</option>
                    <option value="Crab">Crab</option>
                    <option value="Barnacle">Barnacle</option>
                    <option value="Corals">Corals</option>
                    <option value="Sponge">Sponge</option>
                    <option value="Jellyfish">Jellyfish</option>
                    <option value="Hydra">Hydra</option>
                    <option value="Anemone">Anemone</option>
                    <option value="Sea sponge">Sea sponge</option>
                    <option value="Sea slug">Sea slug</option>
                    <option value="Sea snail">Sea snail</option>
                    <option value="Sea urchin">Sea urchin</option>
                    <option value="Sea star">Sea star</option>
                    <option value="Sea cucumber">Sea cucumber</option>
                    <option value="Sea lily">Sea lily</option>
                    <option value="Brittle star">Brittle star</option>
                    <option value="Sea apple">Sea apple</option>
                    <option value="Sea fan">Sea fan</option>
                    <option value="Sea pen">Sea pen</option>
                    <option value="Sea whip">Sea whip</option>
                    <option value="Sea anemone">Sea anemone</option>
                    <option value="Tube worm">Tube worm</option>
                    <option value="Christmas tree worm">
                      Christmas tree worm
                    </option>
                    <option value="Sea spider">Sea spider</option>
                    <option value="King crab">King crab</option>
                    <option value="Mantis shrimp">Mantis shrimp</option>
                    <option value="Horseshoe crab">Horseshoe crab</option>
                    <option value="Blue crab">Blue crab</option>
                    <option value="Fiddler crab">Fiddler crab</option>
                    <option value="Ghost crab">Ghost crab</option>
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
