import React, { useState, useEffect } from "react";
import axios from "axios";
import { Review } from "../../models/review";
import "./EditReview.css";
import { useNavigate, useParams } from "react-router-dom";

const apiUrl = "http://localhost:3000";

interface FormErrors {
  [key: string]: string;
}

function EditReview({ _id, token }: { _id: string; token: string }) {
  const { reviewId } = useParams<{ reviewId: string }>();
  const [review, setReview] = useState<Review>();

  const navigate = useNavigate();
  const [title, setTitle] = useState(review?.title || "");
  const [content, setContent] = useState(review?.content || "");
  const [stars, setStars] = useState(review?.stars.toString() || "");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const headers = {
          "x-access-token": token,
        };
        const response = await axios.get(apiUrl + "/review/" + reviewId, {
          headers,
        });
        console.log(response.data);
        setReview(response.data);
      } catch (error) {
        console.error("Error fetching review:", error);
        // Handle error if necessary
      }
    };

    fetchReview();
  }, [reviewId, _id, token]);
  useEffect(() => {
    // Check if place has been fetched and it contains typeOfPlace
    if (review) {
      setTitle(review.title);
      setContent(review.content);
      setStars(review.stars.toString());
    }
  }, [review]);

  const validateField = (fieldName: string, value: string) => {
    let errorMessage = "";
    let isValid = true;

    switch (fieldName) {
      case "title":
      case "content":
      case "stars":
        isValid = value.trim() !== "";
        errorMessage = isValid ? "" : `${fieldName} is required`;
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const isTitleValid = validateField("title", title);
      const isContentValid = validateField("content", content);
      const isStarsValid = validateField("stars", stars);

      const isFormValid = isTitleValid && isContentValid && isStarsValid;

      if (isFormValid) {
        const newReview: Review = {
          title,
          content,
          stars: parseFloat(stars),
          author: _id,
        };

        // Set up headers with authorization token
        const headers = {
          "x-access-token": token,
        };

        // Make POST request with headers
        const response = await axios.put(
          apiUrl + "/review/" + reviewId,
          newReview,
          {
            headers,
          },
        );
        // clear error
        setError("");
        alert("Review edited successfully");
        if (response.status === 200) {
          navigate(-1);
        }
      } else {
        setError("Please fill in all required fields correctly");
      }
    } catch (error) {
      setError("Failed to submit the form");
    }
  };

  return (
    <div className="containerEditReview">
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <input
          className="inputEditReview"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        {/* Content */}

        <input
          className="inputEditReview"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Description"
        />
        {/* Rating */}
        <input
          className="inputEditReview"
          type="text"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          placeholder="Rating"
        />
        {/* Submit Button */}
        <button className="buttonEditReview" type="submit">
          Submit
        </button>
        {/* Error Message */}
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default EditReview;
