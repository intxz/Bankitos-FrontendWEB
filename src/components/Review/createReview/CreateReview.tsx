import React, { useState } from "react";
import axios from "axios";
import { Review } from "../../models/review";
import "./CreateReview.css";
import { useNavigate, useParams } from "react-router-dom";

const apiUrl = "http://localhost:3000";

interface FormErrors {
  [key: string]: string;
}

function CreateReview({ _id, token }: { _id: string; token: string }) {
  const { placeId } = useParams<{ placeId: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [stars, setStars] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

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
          place_id: placeId,
        };

        // Set up headers with authorization token
        const headers = {
          "x-access-token": token,
        };

        // Make POST request with headers
        const response = await axios.post(apiUrl + "/review", newReview, {
          headers,
        });
        // clear error
        setError("");
        alert("Review created successfully");
        navigate(`/place/${placeId}`);
      } else {
        setError("Please fill in all required fields correctly");
      }
    } catch (error) {
      setError("Failed to submit the form");
    }
  };

  return (
    <div className="containerCreateReview">
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <input
          className="inputCreateReview"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        {/* Content */}

        <input
          className="inputCreateReview"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Description"
        />
        {/* Rating */}
        <input
          className="inputCreateReview"
          type="text"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          placeholder="Rating"
        />
        {/* Submit Button */}
        <button className="buttonCreatePlace" type="submit">
          Submit
        </button>
        {/* Error Message */}
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default CreateReview;
