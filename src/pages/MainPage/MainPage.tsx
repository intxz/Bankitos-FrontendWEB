import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./MainPage.css";
import DeleteUser from "../../components/User/deleteUser/Deleteuser";
import logoSVG from "../../utils/Images/logo.svg";
import axios from "axios";
import useSocketSetup from "./useSocketSetup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiUrl = "http://localhost:3000";

function MainPage() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [profileExpanded, setProfileExpanded] = useState(false);
  const [token, setToken] = useState<string>("");
  const [_id, setId] = useState<string>("");
  const [blurBody, setBlurBody] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useSocketSetup();

  useEffect(() => {
    const stored_token: string | null = localStorage.getItem("token");
    const stored_id: string | null = localStorage.getItem("_id");
    if (stored_token && stored_id) {
      setToken(stored_token);
      setId(stored_id);
    }
  }, []);

  const handleShowProfile = () => {
    navigate(`/profile/${_id}`);
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
    navigate("/map");
  };

  const CreateNewPlace = () => {
    navigate("/create_place");
  };

  const ViewMyPlaces = () => {
    navigate("/view_places");
  };

  const getHelp = () => {
    navigate("/chatbot");
  };

  const toggleHeaderExpansion = () => {
    setExpanded(!expanded);
    if (profileExpanded) {
      setProfileExpanded(false);
    }
  };

  const toggleProfileExpansion = () => {
    setProfileExpanded(!profileExpanded);
    if (expanded) {
      setExpanded(false);
    }
  };

  const logout = async () => {
    try {
      const headers = {
        "x-access-token": token,
      };
      await axios.post(apiUrl + "/logout", {}, { headers });
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
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
          <div>
            <h1>Bankitos</h1>
          </div>
          <div className="profile-menu">
            <div className="profile-icon" onClick={toggleProfileExpansion}>
              <FaUserCircle size={30} />
            </div>
          </div>
        </div>
        <nav className={`nav-user ${expanded ? "expanded" : ""}`}>
          <ul>
            <li onClick={GetAllUsersPage}>Bankiters</li>
            <li onClick={GetAllPlacesPage}>Map</li>
          </ul>
        </nav>
        <nav className={`nav-profile ${profileExpanded ? "expanded" : ""}`}>
          <ul>
            <li onClick={handleShowProfile}>View Profile</li>
            <li onClick={CreateNewPlace}>Create New Place</li>
            <li onClick={ViewMyPlaces}>My Places</li>
            <li className="delete-account" onClick={handleDelete}>
              Delete Account
            </li>
            <li onClick={getHelp}>Get Help</li>
            <li onClick={logout}>Logout</li>
          </ul>
        </nav>
      </header>
      <div className={`main-container ${blurBody ? "blur" : ""}`}>
        <main className="content-containerMainPage">
          <img className="logoSVG" src={logoSVG} alt="Bankito" />
          <h1 className="title-main" style={{ color: "#fc7a00" }}>
            Welcome to Bankitos
          </h1>
          <p className="text-main">
            Here you can create your own places and share them with the world.
          </p>
        </main>
      </div>
      <ToastContainer />
      {showDelete && (
        <>
          <div className="overlay" />
          <div className={`centered-delete ${showDelete ? "active" : ""}`}>
            <DeleteUser _id={_id} token={token} onCancel={handleCancelDelete} />
          </div>
        </>
      )}
    </div>
  );
}

export default MainPage;
