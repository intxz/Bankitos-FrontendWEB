import React, { useState } from "react";
import axios from "axios";
import { Place } from "../../models/place";
import "./ViewPlaces.css";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:3000";

interface FormErrors {
  [key: string]: string;
}

function ViewPlaces({ _id, token }: { _id: string; token: string }) {
  return (
    <div className="containerViewPlaces">
      <h1 className="titleViewPlaces">Your places</h1>
      <p>{token}</p>
      <p>{_id}</p>
    </div>
  );
}

export default ViewPlaces;
