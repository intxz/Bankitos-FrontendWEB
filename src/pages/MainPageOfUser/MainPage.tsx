import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./MainPage.css";
import DeleteUser from "../../components/deleteUser/Deleteuser";
import UserProfile from "../../components/userProfile/userProfile";
import GetUsersGeneral from "../MainPageOfUser/ViewUsersGeneralPage";
import GetPlacesGeneral from "../Places/ViewPlacesGeneralPage";


function MainPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>("");
  const [_id, setId] = useState<string>("");
  const [blurBody, setBlurBody] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const stored_token: string | null = localStorage.getItem("token");
    const stored_id: string | null = localStorage.getItem("_id");
    if (stored_token && stored_id) {
      setToken(stored_token);
      setId(stored_id);
    }
  }, []);

  const handleShowProfile = () => {
    setShowProfile(true);
    setBlurBody(true);
  };

  const handleDelete = () => {
    setShowDelete(true);
    setBlurBody(true);
  };

  const handleCancelDelete = () => {
    setShowDelete(false);
    setBlurBody(false);
  };

  if (showProfile) {
    return (
      <div className="profile">
        <UserProfile _id={_id} token={token} />
      </div>
    );
  }

  const GetAllUsersPage = () => {
    navigate("view_users_general");
  };

  const GetAllPlacesPage = () => {
    navigate("view_places_general");
  };


  return (
    <div>
      <div className={`main-container ${blurBody ? "blur" : ""}`}>
        <nav className="nav-user">
          <li onClick={handleShowProfile}>Profile</li>
          <li className="delete-account" onClick={handleDelete}>
            Delete account
          </li>
          <li className="getusersall" onClick={GetAllUsersPage}>
            Get All Users
          </li>
          <li className="getplacesall" onClick={GetAllPlacesPage}>
            Get All Places
          </li>
        </nav>
        <nav className="nav-place">
          <a href="1" className="nav-link">
            1
          </a>
          <a href="2" className="nav-link">
            2
          </a>
          <a href="3" className="nav-link">
            3
          </a>
          <a href="4" className="nav-link">
            4
          </a>
          <a href="5" className="nav-link">
            9
          </a>
        </nav>
        <main className="content-container">
          <h1>{token}</h1>
          <h1>{_id}</h1>
        </main>
      </div>
      {showDelete && (
        <div className={`centered-delete ${showDelete ? "active" : ""}`}>
          <DeleteUser _id={_id} token={token} onCancel={handleCancelDelete} />
        </div>
      )}
    </div>
  );
}

export default MainPage;
