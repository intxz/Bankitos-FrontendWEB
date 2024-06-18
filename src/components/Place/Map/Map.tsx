import React, { useState, useEffect, ChangeEvent } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredPlaces = places.filter((place) =>
    place.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const foundPlace = filteredPlaces.length > 0 ? filteredPlaces[0] : null;

  function MapCenter({ place }: { place: Place | null }) {
    const map = useMap();
    useEffect(() => {
      if (place) {
        const [lng, lat] = place.coords.coordinates;
        map.setView([lat, lng], 15);
      }
    }, [place, map]);

    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a place"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />
      <MapContainer
        center={[41.27555556, 1.98694444]} // EETAC de Castelldefels
        zoom={15}
        style={{ height: "500px", width: "100%" }}
        maxBounds={mapBounds}
        maxBoundsViscosity={1.0} // Fully restrict the map to the defined bounds
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredPlaces.map((place) => (
          <Marker
            key={place._id?.toString()}
            position={[
              place.coords.coordinates[1],
              place.coords.coordinates[0],
            ]}
            icon={defaultIcon}
          >
            <Popup>
              <strong>{place.title}</strong>
              <p>Rating: {place.rating}</p>
            </Popup>
          </Marker>
        ))}
        <MapCenter place={foundPlace} />
      </MapContainer>
    </div>
  );
}

export default Map;
