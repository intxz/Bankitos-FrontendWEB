import React, { useState, useEffect } from "react";
import axios from "axios";
import { Place } from "../../../models/place";
import "./CreatePlace.css";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const apiUrl = "http://localhost:3000";
const openCageApiKey = process.env.REACT_APP_OPENCAGE_API_KEY;

interface FormErrors {
  [key: string]: string;
}

const defaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

function CreatePlace({ _id, token }: { _id: string; token: string }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [photo, setPhoto] = useState("");
  const [bankito, setBankito] = useState(false);
  const [publicplace, setPublicPlace] = useState(false);
  const [covered, setCovered] = useState(false);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [searchTerm, setSearchTerm] = useState("");

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
      case "photo":
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

      setPhoto(response.data.url); // Update the photo state with the returned URL
      console.log("Uploaded image:", response.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const isTitleValid = validateField("title", title);
      const isContentValid = validateField("content", content);
      const isRatingValid = validateField("rating", rating);
      const isPhotoValid = validateField("photo", photo);
      const isAddressValid = validateField("address", address);

      const isFormValid =
        isTitleValid &&
        isContentValid &&
        isRatingValid &&
        isPhotoValid &&
        isAddressValid &&
        latitude !== null &&
        longitude !== null;

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
            type: "Point",
            coordinates: [longitude, latitude],
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

        console.log("Sending new place data:", newPlace);

        const headers = {
          "x-access-token": token,
        };

        const response = await axios.post(apiUrl + "/place", newPlace, {
          headers,
        });
        console.log(response.data);

        setError("");
        alert("Place created successfully");
        navigate("/view_places");
      } else {
        setError("Please fill in all required fields correctly");
      }
    } catch (error) {
      console.error("Error creating place:", error);
      setError("Failed to submit the form");
    }
  };

  const handleMapClick = async (e: any) => {
    const { lat, lng } = e.latlng;
    setLatitude(lat);
    setLongitude(lng);

    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${openCageApiKey}`,
      );
      const result = response.data.results[0];
      if (result) {
        setAddress(result.formatted);
      } else {
        setError("No se encontró la dirección");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setError("Error al buscar la dirección");
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(searchTerm)}&key=${openCageApiKey}`,
      );
      const result = response.data.results[0];
      if (result) {
        const { lat, lng } = result.geometry;
        setLatitude(lat);
        setLongitude(lng);
        setAddress(result.formatted);
        //map.setView([lat, lng], 15);
      } else {
        setError("No se encontró la ubicación");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      setError("Error al buscar la ubicación");
    }
  };

  function LocationMarker() {
    useMapEvents({
      click: handleMapClick,
    });

    return latitude !== null && longitude !== null ? (
      <Marker position={[latitude, longitude]} icon={defaultIcon} />
    ) : null;
  }

  function CenterMap({ center }: { center: [number, number] | null }) {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.setView(center, 15);
      }
    }, [center]);
    return null;
  }

  return (
    <div className="containerCreatePlace">
      <div className="mapContainer">
        <input
          type="text"
          placeholder="Buscar ubicación"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
        />
        <button onClick={handleSearch} style={{ marginBottom: "10px" }}>
          Buscar
        </button>
        <MapContainer
          center={[41.27555556, 1.98694444]} // EETAC de Castelldefels
          zoom={15}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
          <CenterMap
            center={
              latitude !== null && longitude !== null
                ? [latitude, longitude]
                : null
            }
          />
          {latitude !== null && longitude !== null && (
            <Marker position={[latitude, longitude]} icon={defaultIcon} />
          )}
        </MapContainer>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Mostrar Latitud y Longitud */}
        <p>Latitud: {latitude}</p>
        <p>Longitud: {longitude}</p>
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
        {/* Photo Upload */}
        <input
          className="inputCreatePlace"
          type="file"
          onChange={handleFileUpload}
          placeholder="Upload Photo"
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
