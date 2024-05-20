import React, { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../../models/user";
import "./ViewUsersGeneral.css";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:3000";

function ViewUsersGeneral({ _id, token }: { _id: string; token: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState<string>("");
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
    // Redirect to the user details page when a user button is clicked
    navigate(`/user/${userId}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.middle_name ? user.middle_name + " " : ""} ${user.last_name}`
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );

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
      <div className="searchContainer">
        <div className="searchInput">
          <input
            type="text"
            placeholder="Search users..."
            value={searchText}
            onChange={handleSearchChange}
            className="searchInput"
          />
        </div>
      </div>
      <div className="buttonContainerViewUsersGeneral">
        {filteredUsers.length === 0 ? (
          <p>No users with this name</p>
        ) : (
          // Render buttons for each user
          filteredUsers.map((user) => (
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
          ))
        )}
      </div>
    </div>
  );
}

export default ViewUsersGeneral;
