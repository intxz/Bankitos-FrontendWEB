import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Welcome from "./components/welcome/Welcome";
import MainPage from "./pages/MainPageOfUser/MainPage";
import CreatePlacePage from "./pages/Places/CreatePlacePage";
import ViewPlacesPage from "./pages/Places/ViewPlacesPage";
import ViewPlacesGeneralPage from "./pages/Places/ViewPlacesGeneralPage";
import ViewUsersGeneralPage from "./pages/MainPageOfUser/ViewUsersGeneralPage";
import DetailsPlacePage from "./pages/Places/DetailsPlacePage";
import EditPlacePage from "./pages/Places/EditPlacePage";
import CreateReviewPage from "./pages/Reviews/CreateReviewPage";
import XD from "./pages/MainPageOfUser/xd";
import UserProfile from "./components/userProfile/userProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FollowCursorWindow from "./utils/Inclusism/FollowCursorWindow";
import { Helmet } from "react-helmet";
import logoSVG from "./utils/Images/logo.svg";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

function RoutesApp() {
  const [isFollowCursorActive, setIsFollowCursorActive] = useState(false);
  const [token, setToken] = useState<string>("");
  const [_id, setId] = useState<string>("");

  const toggleFollowCursor = () => {
    setIsFollowCursorActive((prev) => !prev);
  };

  useEffect(() => {
    const stored_token: string | null = localStorage.getItem("token");
    const stored_id: string | null = localStorage.getItem("_id");
    if (stored_token && stored_id) {
      setToken(stored_token);
      setId(stored_id);
    }
  }, []);

  return (
    <React.StrictMode>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Bankitos</title>
        <link rel="icon" href={logoSVG} />
      </Helmet>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/main_page" element={<MainPage />} />
          <Route path="/xd" element={<XD />} />
          <Route path="/create_place" element={<CreatePlacePage />} />
          <Route path="/view_places" element={<ViewPlacesPage />} />
          <Route path="/place/:placeId" element={<DetailsPlacePage />} />
          <Route path="/place/edit/:placeId" element={<EditPlacePage />} />
          <Route path="/place/create_review/:placeId" element={<CreateReviewPage />} />
          <Route path="/view_places_general" element={<ViewPlacesGeneralPage />} />
          <Route path="/view_users_general" element={<ViewUsersGeneralPage />} />
          <Route
            path="/main_page/user_profile"
            element={<UserProfile _id={_id} token={token} />}
          />
        </Routes>
      </Router>
      <button className="btn" onClick={toggleFollowCursor}>
        {isFollowCursorActive
          ? "Deactivate Follow Cursor"
          : "Activate Follow Cursor"}
      </button>
      {isFollowCursorActive && <FollowCursorWindow />}
    </React.StrictMode>
  );
}

root.render(<RoutesApp />);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
