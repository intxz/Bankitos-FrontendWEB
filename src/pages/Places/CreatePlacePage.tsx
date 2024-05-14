import React, { useEffect, useState } from "react";
import CreatePlace from "../../components/createPlace/CreatePlace";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Create Place Page</h1>
      <CreatePlace _id={_id} token={token} />
    </div>
  );
}

export default CreatePlacePage;
