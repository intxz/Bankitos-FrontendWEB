import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Welcome from "./Visual/Welcome";
import MainPage from "./MainPageOfUser/MainPage";
import XD from "./MainPageOfUser/xd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FollowCursorWindow from "./Inclusism/FollowCursorWindow";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

function RoutesApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/main_page" element={<MainPage />} />
        <Route path="/xd" element={<XD />} />
      </Routes>
    </Router>
  );
}

root.render(
  <React.StrictMode>
    <FollowCursorWindow />
    <RoutesApp />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
