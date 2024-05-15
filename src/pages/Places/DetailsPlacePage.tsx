import React, { useEffect, useState } from "react";
import DetailsPlace from "../../components/detailsPlace/DetailsPlace";
import "./DetailsPlacePage.css";

function DetailsPlacePage() {
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
      <DetailsPlace _id={_id} token={token} />
    </div>
  );
}

export default DetailsPlacePage;
