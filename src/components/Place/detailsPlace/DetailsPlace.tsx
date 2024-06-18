import React, { useState, useEffect } from "react";
import axios from "axios";
import { Place } from "../../../models/place";
import { Review } from "../../../models/review";
import "./DetailsPlace.css";
import { useNavigate, useParams } from "react-router-dom";

const apiUrl = "http://localhost:3000";

function DetailsPlace({ _id, token }: { _id: string; token: string }) {
  const [place, setPlace] = useState<Place | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageReviewRating, setAverageReviewRating] = useState<number>(0);
  const [combinedRating, setCombinedRating] = useState<number>(0);
  const { placeId } = useParams<{ placeId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const headers = {
          "x-access-token": token,
        };
        const response = await axios.get(apiUrl + "/place/" + placeId, {
          headers,
        });
        setPlace(response.data);
      } catch (error) {
        console.error("Error fetching place:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const headers = {
          "x-access-token": token,
        };
        const response = await axios.get(
          apiUrl + "/review/byPlace/" + placeId,
          { headers },
        );
        const reviewsData = response.data;
        setReviews(reviewsData);
        const averageRating = calculateAverageRating(reviewsData);
        setAverageReviewRating(averageRating);
        if (place) {
          const newCombinedRating = calculateCombinedRating(
            place.rating,
            averageRating,
          );
          setCombinedRating(newCombinedRating);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchPlace();
    fetchReviews();
  }, [placeId, token]);

  const calculateAverageRating = (reviews: Review[]) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.stars, 0);
    return totalRating / reviews.length;
  };

  const calculateCombinedRating = (
    initialRating: number,
    reviewRating: number,
  ) => {
    return (initialRating + reviewRating) / 2;
  };

  const renderStars = (rating: number) => {
    let stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<span key={i}>★</span>);
    }

    if (rating % 1 !== 0) {
      stars.push(<span key={Math.floor(rating)}>☆</span>);
    }
    return stars;
  };

  const handleDelete = async () => {
    try {
      const headers = {
        "x-access-token": token,
      };
      await axios.delete(apiUrl + "/place/" + placeId, { headers });
      navigate("/view_places");
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };

  if (!place) {
    return <h1>No places found</h1>;
  } else {
    const isAuthor = place.author === _id;
    return (
      <div>
        <h1 style={{ color: "#fc7a00" }}>{place.title}</h1>
        <div className="containerDetailsPlace">
          <p>Description: {place.content}</p>
          <p>
            Rating:{" "}
            {renderStars(
              calculateCombinedRating(place.rating, averageReviewRating),
            )}{" "}
            (
            {calculateCombinedRating(place.rating, averageReviewRating).toFixed(
              2,
            )}
            )
          </p>
          <p>
            Coordinates: {place.coords.coordinates[0]},{" "}
            {place.coords.coordinates[1]}
          </p>
          <p>Photo: {place.photo}</p>
          <p>Address: {place.address}</p>

          <div className="serviceContainerDetailsPlace">
            <label style={{ fontSize: "25px", color: "#fc7a00" }}>
              Services:
            </label>
            {place.typeOfPlace.bankito && <li>Bankito</li>}
            {place.typeOfPlace.public && <li>Public Place</li>}
            {place.typeOfPlace.covered && <li>Covered</li>}
          </div>
        </div>
        <div className="scheduleContainerDetailsPlace">
          <label style={{ fontSize: "25px", color: "#fc7a00" }}>
            Schedule:
          </label>
          <ul>
            <li>Monday: {place.schedule.monday}</li>
            <li>Tuesday: {place.schedule.tuesday}</li>
            <li>Wednesday: {place.schedule.wednesday}</li>
            <li>Thursday: {place.schedule.thursday}</li>
            <li>Friday: {place.schedule.friday}</li>
            <li>Saturday: {place.schedule.saturday}</li>
            <li>Sunday: {place.schedule.sunday}</li>
          </ul>
        </div>
        {isAuthor && (
          <>
            <button
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => navigate(`/place/edit/${placeId}`)}
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
              onClick={handleDelete}
              className="buttonDetailsPlace"
            >
              Delete
            </button>
          </>
        )}
        <button
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => navigate(`/place/create_review/${placeId}`)}
          className="buttonDetailsPlace"
        >
          Add Review
        </button>
        <button
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => navigate(`/view_reviews/${placeId}`)}
          className="buttonDetailsPlace"
        >
          View Reviews
        </button>
        <div>
          <h2>Reviews</h2>
          {reviews.map((review) => (
            <div key={review._id} className="reviewCard">
              <h3>{review.title}</h3>
              <p>{renderStars(review.stars)}</p>
              <p>{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default DetailsPlace;
