import React, { useEffect, useState } from "react";
import ViewPlaces from "../../components/viewPlaces/ViewPlaces";
import "./ViewPlacesPage.css";

function ViewPlacesPage() {
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
    <div className="containerViewPlacesPage">
      <h1 className="titleViewPlacesPage">View your places</h1>
      <ViewPlaces _id={_id} token={token} />
    </div>
  );
}

export default ViewPlacesPage;
