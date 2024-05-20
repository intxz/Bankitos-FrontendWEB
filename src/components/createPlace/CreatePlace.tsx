import React, { useState } from "react";
import axios from "axios";
import { Place } from "../../models/place";
import "./CreatePlace.css";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:3000";

interface FormErrors {
  [key: string]: string;
}

function CreatePlace({ _id, token }: { _id: string; token: string }) {
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
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const [schedule, setSchedule] = useState({
    monday: { opening: "", closing: "" },
    tuesday: { opening: "", closing: "" },
    wednesday: { opening: "", closing: "" },
    thursday: { opening: "", closing: "" },
    friday: { opening: "", closing: "" },
    saturday: { opening: "", closing: "" },
    sunday: { opening: "", closing: "" },
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

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const isTitleValid = validateField("title", title);
      const isContentValid = validateField("content", content);
      const isRatingValid = validateField("rating", rating);
      const isLatitudeValid = validateField("latitude", latitude);
      const isLongitudeValid = validateField("longitude", longitude);
      const isPhotoValid = validateField("photo", photo);
      const isAddressValid = validateField("address", address);

      const isFormValid =
        isTitleValid &&
        isContentValid &&
        isRatingValid &&
        isLatitudeValid &&
        isLongitudeValid &&
        isPhotoValid &&
        isAddressValid;

      if (isFormValid) {
        const formattedSchedule = {
          monday: `${schedule.monday.opening} - ${schedule.monday.closing}`,
          tuesday: `${schedule.tuesday.opening} - ${schedule.tuesday.closing}`,
          wednesday: `${schedule.wednesday.opening} - ${schedule.wednesday.closing}`,
          thursday: `${schedule.thursday.opening} - ${schedule.thursday.closing}`,
          friday: `${schedule.friday.opening} - ${schedule.friday.closing}`,
          saturday: `${schedule.saturday.opening} - ${schedule.saturday.closing}`,
          sunday: `${schedule.sunday.opening} - ${schedule.sunday.closing}`,
        };

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
          schedule: formattedSchedule,
          address,
        };

        // Set up headers with authorization token
        const headers = {
          "x-access-token": token,
        };

        // Make POST request with headers
        const response = await axios.post(apiUrl + "/place", newPlace, {
          headers,
        });
        console.log(response.data);
        console.log(newPlace);
        // clear error
        setError("");
        alert("Place created successfully");
        navigate("/view_places");
      } else {
        setError("Please fill in all required fields correctly");
      }
    } catch (error) {
      setError("Failed to submit the form");
    }
  };

  return (
    <div className="containerCreatePlace">
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <input
          className="inputCreatePlace"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        {/* Content */}

        <input
          className="inputCreatePlace"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Description"
        />
        {/* Rating */}
        <input
          className="inputCreatePlace"
          type="text"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rating"
        />
        {/* Latitude */}
        <input
          className="inputCreatePlace"
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Latitude"
        />
        {/* Longitude */}
        <input
          className="inputCreatePlace"
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Longitude"
        />
        {/* Photo */}
        <input
          className="inputCreatePlace"
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="Photo URL"
        />
        {/* Address */}
        <input
          className="inputCreatePlace"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <div className="containerCreatePlaceCheckbox">
          {/* Bankito */}
          <label className="labelCreatePlaceCheckbox">
            Bankito:
            <input
              type="checkbox"
              checked={bankito}
              onChange={(e) => setBankito(e.target.checked)}
            />
          </label>
          {/* Public Place */}
          <label className="labelCreatePlaceCheckbox">
            Public Place:
            <input
              type="checkbox"
              checked={publicplace}
              onChange={(e) => setPublicPlace(e.target.checked)}
            />
          </label>
          {/* Covered */}
          <label className="labelCreatePlaceCheckbox">
            Covered:
            <input
              type="checkbox"
              checked={covered}
              onChange={(e) => setCovered(e.target.checked)}
            />
          </label>
        </div>
        {/* Schedule */}
        {/* Monday */}

        <label className="labelCreatePlace">
          Monday:
          <input
            className="inputCreatePlaceTime"
            type="time"
            value={schedule.monday.opening}
            onChange={(e) =>
              setSchedule({
                ...schedule,
                monday: { ...schedule.monday, opening: e.target.value },
              })
            }
          />
          -
          <input
            className="inputCreatePlaceTime"
            type="time"
            value={schedule.monday.closing}
            onChange={(e) =>
              setSchedule({
                ...schedule,
                monday: { ...schedule.monday, closing: e.target.value },
              })
            }
          />
        </label>
        {/* Schedule */}
        {/* Tuesday */}

        <label className="labelCreatePlace">
          Tuesday:
          <input
            className="inputCreatePlaceTime"
            type="time"
            value={schedule.tuesday.opening}
            onChange={(e) =>
              setSchedule({
                ...schedule,
                tuesday: { ...schedule.tuesday, opening: e.target.value },
              })
            }
          />
          -
          <input
            className="inputCreatePlaceTime"
            type="time"
            value={schedule.tuesday.closing}
            onChange={(e) =>
              setSchedule({
                ...schedule,
                tuesday: { ...schedule.tuesday, closing: e.target.value },
              })
            }
          />
        </label>
        {/* Schedule */}
        {/* Wednesday */}
        <label className="labelCreatePlace">
          Wednesday:
          <input
            className="inputCreatePlaceTime"
            type="time"
            value={schedule.wednesday.opening}
            onChange={(e) =>
              setSchedule({
                ...schedule,
                wednesday: { ...schedule.wednesday, opening: e.target.value },
              })
            }
          />
          -
          <input
            className="inputCreatePlaceTime"
            type="time"
            value={schedule.wednesday.closing}
            onChange={(e) =>
              setSchedule({
                ...schedule,
                wednesday: { ...schedule.wednesday, closing: e.target.value },
              })
            }
          />
        </label>
        {/* Schedule */}
        {/* Thursday */}
        <label className="labelCreatePlace">
          Thursday:
          <input
            className="inputCreatePlaceTime"
            type="time"
            value={schedule.thursday.opening}
            onChange={(e) =>
              setSchedule({
                ...schedule,
                thursday: { ...schedule.thursday, opening: e.target.value },
              })
            }
          />
          -
          <input
            className="inputCreatePlaceTime"
            type="time"
            value={schedule.thursday.closing}
            onChange={(e) =>
              setSchedule({
                ...schedule,
                thursday: { ...schedule.thursday, closing: e.target.value },
              })
            }
          />
        </label>
        {/* Schedule */}
        {/* Friday */}
        <label className="labelCreatePlace">
          Friday:
          <input
            className="inputCreatePlaceTime"
            type="time"
            value={schedule.friday.opening}
            onChange={(e) =>
              setSchedule({
                ...schedule,
                friday: { ...schedule.friday, opening: e.target.value },
              })
            }
          />
          -
          <input
            className="inputCreatePlaceTime"
            type="time"
            value={schedule.friday.closing}
            onChange={(e) =>
              setSchedule({
                ...schedule,
                friday: { ...schedule.friday, closing: e.target.value },
              })
            }
          />
        </label>
        {/* Schedule */}
        {/* Saturday */}
        <label className="labelCreatePlace">
          Saturday:
          <input
            className="inputCreatePlaceTime"
            type="time"
            value={schedule.saturday.opening}
            onChange={(e) =>
              setSchedule({
                ...schedule,
                saturday: { ...schedule.saturday, opening: e.target.value },
              })
            }
          />
          -
          <input
            className="inputCreatePlaceTime"
            type="time"
            value={schedule.saturday.closing}
            onChange={(e) =>
              setSchedule({
                ...schedule,
                saturday: { ...schedule.saturday, closing: e.target.value },
              })
            }
          />
        </label>
        {/* Schedule */}
        {/* Sunday */}
        <label className="labelCreatePlace">
          Sunday:
          <input
            className="inputCreatePlaceTime"
            type="time"
            value={schedule.sunday.opening}
            onChange={(e) =>
              setSchedule({
                ...schedule,
                sunday: { ...schedule.sunday, opening: e.target.value },
              })
            }
          />
          -
          <input
            className="inputCreatePlaceTime"
            type="time"
            value={schedule.sunday.closing}
            onChange={(e) =>
              setSchedule({
                ...schedule,
                sunday: { ...schedule.sunday, closing: e.target.value },
              })
            }
          />
        </label>

        {/* Submit Button */}
        <button className="buttonCreatePlace" type="submit">
          Submit
        </button>
        {/* Error Message */}
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default CreatePlace;
