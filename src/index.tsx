import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Welcome from "./components/welcome/Welcome";
import MainPage from "./pages/MainPageOfUser/MainPage";
import XD from "./pages/MainPageOfUser/xd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FollowCursorWindow from "./utils/Inclusism/FollowCursorWindow";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);



function RoutesApp() {
  const [isFollowCursorActive, setIsFollowCursorActive] = useState(false);

  const toggleFollowCursor = () => {
    setIsFollowCursorActive((prev) => !prev);
  }

  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/main_page" element={<MainPage />} />
          <Route path="/xd" element={<XD />} />
        </Routes>
      </Router>
      <button className="btn" onClick={toggleFollowCursor}>
        {isFollowCursorActive ? "Deactivate Follow Cursor" : "Activate Follow Cursor"}
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
