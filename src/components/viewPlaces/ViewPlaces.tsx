import React, { useState, useEffect } from "react";
import axios from "axios";
import { Place } from "../../models/place";
import "./ViewPlaces.css";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:3000";

function ViewPlaces({ _id, token }: { _id: string; token: string }) {
  const [places, setPlaces] = useState<Place[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const headers = {
          "x-access-token": token,
        };
        const response = await axios.get(apiUrl + "/placebyuser/" + _id, {
          headers,
        });
        setPlaces(response.data);
      } catch (error) {
        console.error("Error fetching places:", error);
        // Handle error if necessary
      }
    };

    fetchPlaces();
  }, [_id, token]);

  const handlePlaceClick = (placeId: string) => {
    // Redirect to the place details page when a place button is clicked
    navigate(`/place/${placeId}`);
  };

  return (
    <div className="containerViewPlaces">
      <div className="buttonContainerViewPlaces">
        {/* Render buttons for each place */}
        {places.map((place) => (
          <button
            key={place._id}
            onClick={() => handlePlaceClick(place._id || "")}
            className="buttonViewPlaces"
          >
            {place.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ViewPlaces;
