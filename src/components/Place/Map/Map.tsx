import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { Place } from "../../../models/place";
import "leaflet/dist/leaflet.css";

const apiUrl = "http://localhost:3000";

interface MapProps {
  _id: string;
  token: string;
}

function Map({ _id, token }: MapProps) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching places:", error);
        setError("Failed to fetch places");
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [_id, token]);

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

  const mapBounds: [[number, number], [number, number]] = [
    [-85.05112878, -180], // Southwest corner
    [85.05112878, 180], // Northeast corner
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <MapContainer
      center={[41.2755, 1.986]} // EETAC de Castelldefels
      zoom={15}
      style={{ height: "500px", width: "100%" }}
      maxBounds={mapBounds}
      maxBoundsViscosity={1.0} // Fully restrict the map to the defined bounds
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {places.map((place) => (
        <Marker
          key={place._id?.toString()}
          position={place.coords.coordinates}
          icon={defaultIcon}
        >
          <Popup>
            <strong>{place.title}</strong>
            <p>Rating: {place.rating}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
