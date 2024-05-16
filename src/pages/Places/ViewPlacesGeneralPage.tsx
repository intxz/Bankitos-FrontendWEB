import React, { useEffect, useState } from "react";
import ViewPlacesGeneral from "../../components/viewPlacesGeneral/ViewPlacesGeneral";
import "./ViewPlacesGeneralPage.css";

function ViewPlacesGeneralPage() {
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
    <div className="containerViewPlacesGeneralPage">
      <h1 className="titleViewPlacesGeneralPage">View all places</h1>
      <ViewPlacesGeneral _id={_id} token={token} />
    </div>
  );
}

export default ViewPlacesGeneralPage;
