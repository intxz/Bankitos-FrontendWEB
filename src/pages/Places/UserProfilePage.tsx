import React, { useEffect, useState } from "react";
import UserProfile from "../../components/User/userProfile/userProfile";

function UserProfilePage() {
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
    <div className="containerUserProfilePage">
      <h1 className="titleUserProfilePage">User Profile Page</h1>
      <UserProfile _id={_id} token={token} />
    </div>
  );
}

export default UserProfilePage;
