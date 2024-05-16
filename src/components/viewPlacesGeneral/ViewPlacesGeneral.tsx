import React, { useState, useEffect } from "react";
import axios from "axios";
import { Place } from "../../models/place";
import "./ViewPlacesGeneral.css";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:3000";

function ViewPlacesGeneral({ _id, token }: { _id: string; token: string }) {
  const [places, setPlaces] = useState<Place[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const headers = {
          "x-access-token": token,
        };
        const response = await axios.get(apiUrl + "/place", {
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
    <div className="containerViewPlacesGeneral">
      <div className="buttonContainerViewPlacesGeneral">
        {/* Render buttons for each place */}
        {places.map((place) => (
          <button
            key={place._id}
            onClick={() => handlePlaceClick(place._id || "")}
            className="buttonViewPlacesGeneral"
          >
            {place.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ViewPlacesGeneral;
