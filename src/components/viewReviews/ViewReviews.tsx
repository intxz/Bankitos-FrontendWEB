import React, { useState, useEffect } from "react";
import axios from "axios";
import { Review } from "../../models/review";
import { User } from "../../models/user";
import "./ViewReviews.css";
import { useNavigate, useParams } from "react-router-dom";

const apiUrl = "http://localhost:3000";

function ViewReviews({ _id, token }: { _id: string; token: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [user, setUser] = useState<{ [key: string]: User }>({});
  const { placeId } = useParams<{ placeId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const headers = {
          "x-access-token": token,
        };
        const response = await axios.get(
          apiUrl + "/review/byPlace/" + placeId,
          {
            headers,
          },
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        // Handle error if necessary
      }
    };

    fetchReviews();
  }, [placeId, token]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const headers = {
          "x-access-token": token,
        };
        // Create an array to store promises for each user fetch operation
        const userPromises = reviews.map(async (review) => {
          const response = await axios.get(apiUrl + "/users/" + review.author, {
            headers,
          });
          return response.data;
        });
        // Wait for all promises to resolve
        const userData = await Promise.all(userPromises);
        // Map user data to object using user IDs as keys
        const userMap: { [key: string]: User } = {};
        userData.forEach((user) => {
          userMap[user._id] = user;
        });
        setUser(userMap);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error if necessary
      }
    };

    fetchUsers();
  }, [reviews, token]);

  const renderStars = (rating: number) => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i}>★</span>);
    }
    return stars;
  };
  const handleEditReview = (reviewId: string) => {
    // Redirect to the review details page when a review is clicked
    navigate(`/review/${reviewId}`);
  };

  return (
    <div className="parentContainer">
      {/* Render details for each review */}
      {reviews.map((review) => (
        <div key={review._id} className="reviewCardContainer">
          {/* Display user information */}
          <div className="reviewIndividualContainer">
            <aside className="titleReview">{review.title}</aside>
            {user && user[review.author] && (
              <aside className="aside-1Review">
                {user[review.author].first_name} {user[review.author].last_name}
              </aside>
            )}
            <aside className="aside-2Review">{renderStars(review.stars)}</aside>
            <article className="reviewContent">
              <p>{review.content}</p>
            </article>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewReviews;
