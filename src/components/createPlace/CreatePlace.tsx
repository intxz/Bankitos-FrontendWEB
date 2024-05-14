import React, { useState } from "react";
import axios from "axios";
import { Place } from "../../models/place";
import "./CreatePlace.css";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:3000";

interface FormErrors {
  [key: string]: string;
}

function CreatePlace({ _id, token }: { _id: string, token:string }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [photo, setPhoto] = useState("");
  const [bankito, setBankito] = useState(false);
  const [publicplace, setPublicPlace] = useState(false);
  const [covered, setCovered] = useState(false);
  const [monday, setMonday] = useState("");
  const [tuesday, setTuesday] = useState("");
  const [wednesday, setWednesday] = useState("");
  const [thursday, setThursday] = useState("");
  const [friday, setFriday] = useState("");
  const [saturday, setSaturday] = useState("");
  const [sunday, setSunday] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const [validFields, setValidFields] = useState({
    title: true,
    content: true,
    rating: true,
    latitude: true,
    longitude: true,
    photo: true,
    bankito: true,
    publicplace: true,
    covered: true,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
    address: true,
  });

  const validateField = (fieldName: string, value: string) => {
    let errorMessage = "";
    let isValid = true;

    switch (fieldName) {
      case "title":
      case "content":
      case "rating":
      case "latitude":
      case "longitude":
      case "photo":
      case "monday":
      case "tuesday":
      case "wednesday":
      case "thursday":
      case "friday":
      case "saturday":
      case "sunday":
      case "address":
        isValid = value.trim() !== "";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));

    setValidFields((prevValidFields) => ({
      ...prevValidFields,
      [fieldName]: isValid,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      validateField("title", title);
      validateField("content", content);
      validateField("rating", rating);
      validateField("latitude", latitude);
      validateField("longitude", longitude);
      validateField("photo", photo);
      validateField("monday", monday);
      validateField("tuesday", tuesday);
      validateField("wednesday", wednesday);
      validateField("thursday", thursday);
      validateField("friday", friday);
      validateField("saturday", saturday);
      validateField("sunday", sunday);
      validateField("address", address);

      const isFormValid = Object.values(errors).every((error) => error === "");
      if (isFormValid) {
        const newPlace: Place = {
          title,
          content,
          author: _id,
          rating: parseFloat(rating),
          coords: {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          },
          photo,
          typeOfPlace: {
            bankito,
            public: publicplace,
            covered,
          },
          schedule: {
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
          },
          address,
        };
        // Set up headers with authorization token
        const headers = {
          "x-access-token": token,
        };        
        // Make POST request with headers
        const response = await axios.post(apiUrl + "/place", newPlace, {
          headers: headers,
        });
        console.log(response.data);
        console.log(newPlace);
      } else {
        setError("Please fill in all required fields correctly");
      }
    } catch (error) {
      setError("Failed to submit the form");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      {/* Content */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      {/* Rating */}
      <input
        type="text"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        placeholder="Rating"
      />
      {/* Latitude */}
      <input
        type="text"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        placeholder="Latitude"
      />
      {/* Longitude */}
      <input
        type="text"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        placeholder="Longitude"
      />
      {/* Photo */}
      <input
        type="text"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
        placeholder="Photo URL"
      />
      {/* Bankito */}
      <label>
        Bankito:
        <input
          type="checkbox"
          checked={bankito}
          onChange={(e) => setBankito(e.target.checked)}
        />
      </label>
      {/* Public Place */}
      <label>
        Public Place:
        <input
          type="checkbox"
          checked={publicplace}
          onChange={(e) => setPublicPlace(e.target.checked)}
        />
      </label>
      {/* Covered */}
      <label>
        Covered:
        <input
          type="checkbox"
          checked={covered}
          onChange={(e) => setCovered(e.target.checked)}
        />
      </label>
      {/* Schedule */}
      {/* Monday */}
      <input
        type="text"
        value={monday}
        onChange={(e) => setMonday(e.target.value)}
        placeholder="Monday"
      />
      {/* Tuesday */}
      <input
        type="text"
        value={tuesday}
        onChange={(e) => setTuesday(e.target.value)}
        placeholder="Tuesday"
      />
      {/* Wednesday */}
      <input
        type="text"
        value={wednesday}
        onChange={(e) => setWednesday(e.target.value)}
        placeholder="Wednesday"
      />
      {/* Thursday */}
      <input
        type="text"
        value={thursday}
        onChange={(e) => setThursday(e.target.value)}
        placeholder="Thursday"
      />
      {/* Friday */}
      <input
        type="text"
        value={friday}
        onChange={(e) => setFriday(e.target.value)}
        placeholder="Friday"
      />
      {/* Saturday */}
      <input
        type="text"
        value={saturday}
        onChange={(e) => setSaturday(e.target.value)}
        placeholder="Saturday"
      />
      {/* Sunday */}
      <input
        type="text"
        value={sunday}
        onChange={(e) => setSunday(e.target.value)}
        placeholder="Sunday"
      />
      {/* Address */}
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
      />
      {/* Submit Button */}
      <button type="submit">Submit</button>
      {/* Error Message */}
      {error && <div>{error}</div>}
    </form>
  );
}

export default CreatePlace;
