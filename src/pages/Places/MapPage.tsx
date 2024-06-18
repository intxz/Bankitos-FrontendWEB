import React, { useState, useEffect } from "react";
import Map from "../../components/Place/Map/Map";
//import './MapPage.css';

function MapPage() {
  const [token, setToken] = useState<string>("");
  const [_id, setId] = useState<string>("");

  useEffect(() => {
    const storedToken: string | null = localStorage.getItem("token");
    const storedId: string | null = localStorage.getItem("_id");
    if (storedToken && storedId) {
      setToken(storedToken);
      setId(storedId);
    }
  }, []);

  return (
    <div className="map-page">
      <h1>Map Page</h1>
      {token && _id ? <Map _id={_id} token={token} /> : <p>Loading...</p>}
    </div>
  );
}

export default MapPage;
