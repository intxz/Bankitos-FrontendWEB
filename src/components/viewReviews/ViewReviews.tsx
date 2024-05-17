import React, { useState, useEffect, useCallback } from "react";
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

  const fetchReviews = useCallback(async () => {
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
  }, [placeId, token]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const headers = {
          "x-access-token": token,
        };
        const userPromises = reviews.map(async (review) => {
          const response = await axios.get(apiUrl + "/users/" + review.author, {
            headers,
          });
          return response.data;
        });
        const userData = await Promise.all(userPromises);
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
    navigate(`/review/${reviewId}`);
  };

  const handleDelete = async (reviewId: string) => {
    try {
      const headers = {
        "x-access-token": token,
      };
      await axios.delete(apiUrl + "/review/" + reviewId, {
        headers,
      });
      await fetchReviews(); // Re-fetch reviews after deletion
    } catch (error) {
      console.error("Error deleting review:", error);
      // Handle error if necessary
    }
  };

  return (
    <div className="parentContainer">
      {reviews.map((review) => {
        const isAuthor = review.author === _id;
        return (
          <div key={review._id} className="reviewCardContainer">
            <div className="reviewIndividualContainer">
              <aside className="titleReview">{review.title}</aside>
              {user && user[review.author] && (
                <aside className="aside-1Review">
                  {user[review.author].first_name}{" "}
                  {user[review.author].last_name}
                </aside>
              )}
              <aside className="aside-2Review">
                {renderStars(review.stars)}
              </aside>
              <article className="reviewContent">
                <p>{review.content}</p>
              </article>
            </div>
            {isAuthor && review._id && (
              <>
                <button
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => handleEditReview(review._id || "")}
                  className="buttonDetailsPlace"
                >
                  Edit
                </button>
                <button
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => handleDelete(review._id || "")}
                  className="buttonDetailsPlace"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ViewReviews;
