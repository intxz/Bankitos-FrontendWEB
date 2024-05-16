import React, { useState, useEffect } from "react";
import axios from "axios";
import { Review } from "../../models/review";
import { User } from "../../models/user";
import "./ViewReviews.css";
import { useNavigate, useParams } from "react-router-dom";

const apiUrl = "http://localhost:3000";

function ViewReviews({ _id, token }: { _id: string; token: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const { placeId } = useParams<{ placeId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const headers = {
          "x-access-token": token,
        };
        const response = await axios.get(apiUrl + "/review/byPlace/" + placeId, {
          headers,
        });
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        // Handle error if necessary
      }
    };

    fetchReviews();
  }, [token]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const headers = {
  //         "x-access-token": token,
  //       };
  //       const response = await axios.get(apiUrl + "/users/" + reviews.author, {
  //         headers,
  //       });
  //       setUser(response.data);
  //     } catch (error) {
  //       console.error("Error fetching reviews:", error);
  //       // Handle error if necessary
  //     }
  //   };

  //   fetchUser();
  // }, [token]);

  const handleReviewClick = (reviewId: string) => {
    // Redirect to the place details page when a place button is clicked
    navigate(`/review/${reviewId}`);
  };

  return (
    <div className="containerViewReviews">
      <div className="buttonContainerViewReviews">
        {/* Render buttons for each place */}
        {reviews.map((review) => (
          <div className="reviewIndividualContainer">
          <h1>{review.title}</h1>
          <p>{review.content}</p>
          <p>{review.stars}</p>
          {/* <p>{user?.first_name}{user?.last_name}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewReviews;
