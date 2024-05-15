import React, { useState } from "react";
import axios from "axios";
import { Place } from "../../models/place";
import "./ViewPlace.css";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:3000";

interface FormErrors {
  [key: string]: string;
}

function ViewPlaces({ _id, token }: { _id: string; token: string }) {
}



export default ViewPlaces;
