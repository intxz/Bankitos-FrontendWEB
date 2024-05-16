import React, { useEffect, useState } from "react";
import ViewUsersGeneral from "../../components/viewUsersGeneral/ViewUsersGeneral";
import "./ViewUsersGeneralPage.css";

function ViewUsersGeneralPage() {
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
    <div className="containerViewUsersGeneralPage">
      <h1 className="titleViewUsersGeneralPage">View all Users</h1>
      <ViewUsersGeneral _id={_id} token={token} />
    </div>
  );
}

export default ViewUsersGeneralPage;
