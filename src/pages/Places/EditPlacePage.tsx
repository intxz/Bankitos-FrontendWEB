import React, { useEffect, useState } from "react";
import EditPlace from "../../components/editPlace/EditPlace";
import "./EditPlacePage.css";

function EditPlacePage() {
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
    <div className="containerEditPlacePage">
      <h1 className="titleEditPlacePage">Edit Place Page</h1>
      <EditPlace _id={_id} token={token} />
    </div>
  );
}

export default EditPlacePage;
