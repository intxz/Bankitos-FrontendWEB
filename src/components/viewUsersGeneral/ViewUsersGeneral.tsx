import React, { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../../models/user";
import "./ViewUsersGeneral.css";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:3000";

function ViewUsersGeneral({ _id, token }: { _id: string; token: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const headers = {
          "x-access-token": token,
        };
        const response = await axios.get(apiUrl + "/users", {
          headers,
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error if necessary
      }
    };

    fetchUsers();
  }, [_id, token]);

  const handleUsersClick = (userId: string) => {
    // Redirect to the place details page when a place button is clicked
    navigate(`/user/${userId}`);
  };
  const renderStars = (rating: string) => {
    const ratingNumber = parseInt(rating);
    let stars = [];
    for (let i = 0; i < ratingNumber; i++) {
      stars.push(<span key={i}>★</span>);
    }
    return stars;
  };

  return (
    <div className="containerViewUsersGeneral">
      <div className="buttonContainerViewUsersGeneral">
        {/* Render buttons for each place */}
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => handleUsersClick(user._id || "")}
            className="buttonViewUsersGeneral"
          >
            {user.first_name + " "}{" "}
            {user.middle_name ? user.middle_name + " " : ""}{" "}
            {" " + user.last_name}
            <br />
            {user.description ? "Description: " + user.description : null}
            <br />
            {renderStars(user.user_rating ? user.user_rating + " " : "")}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ViewUsersGeneral;
