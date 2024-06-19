import React, { useState, ChangeEvent } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { Place } from "../../../models/place";
import "leaflet/dist/leaflet.css";

const apiUrl = "http://localhost:3000";
const openCageApiKey = process.env.REACT_APP_OPENCAGE_API_KEY;

interface MapProps {
  _id: string;
  token: string;
}

function Map({ _id, token }: MapProps) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [bankitoSearchTerm, setBankitoSearchTerm] = useState("");
  const [geocodedPlace, setGeocodedPlace] = useState<[number, number] | null>(null);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);

  const defaultIcon = L.icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  const mapBounds: [[number, number], [number, number]] = [
    [-85.05112878, -180], // Esquina suroeste
    [85.05112878, 180],   // Esquina noreste
  ];

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleBankitoSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBankitoSearchTerm(e.target.value);
  };

  const searchPlace = async () => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(searchTerm)}&key=${openCageApiKey}`
      );
      const result = response.data.results[0];
      if (result) {
        const { lat, lng } = result.geometry;
        setGeocodedPlace([lat, lng]);
      } else {
        setError("No se encontró la ubicación");
      }
    } catch (error) {
      console.error("Error fetching geocoded place:", error);
      setError("Error al buscar la ubicación");
    }
  };

  const searchBankitoPlace = async () => {
    setLoading(true);
    setError("");
    try {
      const headers = {
        "x-access-token": token,
      };
      const response = await axios.get(apiUrl + "/place", { headers });
      const allPlaces = response.data;
      const filtered = allPlaces.filter((place: Place) =>
        place.title.toLowerCase().includes(bankitoSearchTerm.toLowerCase())
      );
      setPlaces(allPlaces);
      setFilteredPlaces(filtered);
      setLoading(false);
      if (filtered.length > 0) {
        const [lng, lat] = filtered[0].coords.coordinates;
        setGeocodedPlace([lat, lng]);
      } else {
        setGeocodedPlace(null);
        setError("No se encontró ningún lugar en Bankito");
      }
    } catch (error) {
      console.error("Error fetching places:", error);
      setError("Error al obtener lugares");
      setLoading(false);
    }
  };

  function MapCenter({ place }: { place: [number, number] | null }) {
    const map = useMap();
    if (place) {
      map.setView(place, 15);
    }
    return null;
  }

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar ubicación real"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
        />
        <button onClick={searchPlace} style={{ marginBottom: "10px" }}>
          Buscar Ubicación
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar lugar en Bankito"
          value={bankitoSearchTerm}
          onChange={handleBankitoSearchChange}
          style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
        />
        <button onClick={searchBankitoPlace} style={{ marginBottom: "10px" }}>
          Buscar Lugar en Bankito
        </button>
      </div>

      <MapContainer
        center={[41.27555556, 1.98694444]} // EETAC de Castelldefels
        zoom={15}
        style={{ height: "500px", width: "100%" }}
        maxBounds={mapBounds}
        maxBoundsViscosity={1.0} // Restringir completamente el mapa a los límites definidos
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredPlaces.map((place) => (
          <Marker
            key={place._id?.toString()}
            position={[place.coords.coordinates[1], place.coords.coordinates[0]]}
            icon={defaultIcon}
          >
            <Popup>
              <strong>{place.title}</strong>
              <p>Rating: {place.rating}</p>
            </Popup>
          </Marker>
        ))}
        <MapCenter place={geocodedPlace} />
      </MapContainer>
    </div>
  );
}

export default Map;
