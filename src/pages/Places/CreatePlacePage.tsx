import React, { useEffect, useState } from "react";
import CreatePlace from "../../components/createPlace/CreatePlace";
import "./CreatePlacePage.css";

function CreatePlacePage() {
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
    <div className="containerCreatePlacePage">
      <h1 className="titleCreatePlacePage">Create Place Page</h1>
      <CreatePlace _id={_id} token={token} />
    </div>
  );
}

export default CreatePlacePage;
