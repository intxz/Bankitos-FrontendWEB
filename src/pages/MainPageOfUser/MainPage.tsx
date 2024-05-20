import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";
import DeleteUser from "../../components/deleteUser/Deleteuser";
import UserProfile from "../../components/userProfile/userProfile";
import logoSVG from "../../utils/Images/logo.svg";

function MainPage() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [profileExpanded, setProfileExpanded] = useState(false);
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
    setProfileExpanded(false);
  };

  const handleDelete = () => {
    setShowDelete(true);
    setBlurBody(true);
    setProfileExpanded(false);
  };

  const handleCancelDelete = () => {
    setShowDelete(false);
    setBlurBody(false);
  };

  const GetAllUsersPage = () => {
    navigate("view_users_general");
  };

  const GetAllPlacesPage = () => {
    navigate("view_places_general");
  };

  const CreateNewPlace = () => {
    navigate("/create_place");
  };

  const ViewMyPlaces = () => {
    navigate("/view_places");
  };

  const toggleHeaderExpansion = () => {
    setExpanded(!expanded);
  };

  const toggleProfileExpansion = () => {
    setProfileExpanded(!profileExpanded);
  };

  return (
    <div>
      <header className="header-welcomeMainPage">
        <div className="container-headerMainPage">
          <div className="logo-menu">
            <div className="menu-iconMainPage" onClick={toggleHeaderExpansion}>
              &#9776;
            </div>
          </div>
          <div >
            <h1>Bankitos</h1>
          </div>
          <div className="profile-menu">
            <div className="profile-icon" onClick={toggleProfileExpansion}>
              Profile
            </div>
          </div>
        </div>
        {expanded && (
          <nav className="nav-user">
            <ul>
              <li onClick={GetAllUsersPage}>Get All Users</li>
              <li onClick={GetAllPlacesPage}>Get All Places</li>
            </ul>
          </nav>
        )}
        {profileExpanded && (
          <nav className="nav-profile">
            <ul>
              <li onClick={handleShowProfile}>View Profile</li>
              <li onClick={CreateNewPlace}>Create New Place</li>
              <li onClick={ViewMyPlaces}>My Places</li>
              <li className="delete-account" onClick={handleDelete}>
                Delete Account
              </li>
            </ul>
          </nav>
        )}
      </header>
      <div className={`main-container ${blurBody ? "blur" : ""}`}>
        <main className="content-containerMainPage">
          <h1 className="title-main" style={{ color: "#fc7a00" }}>Welcome to Bankitos</h1>
          <p className="text-main">
            Here you can create your own places and share them with the world.
          </p>
        </main>
      </div>
      {showDelete && (
        <div className={`centered-delete ${showDelete ? "active" : ""}`}>
          <DeleteUser _id={_id} token={token} onCancel={handleCancelDelete} />
        </div>
      )}
      {showProfile && (
        <div className="profile">
          <UserProfile _id={_id} token={token} />
        </div>
      )}
      <div className={`container-bodyMainPage ${blurBody ? "blur" : ""}`}>
        <img className="logoSVG" src={logoSVG} alt="Bankito" />
      </div>
    </div>
  );
}

export default MainPage;
