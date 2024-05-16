import React, { useEffect, useState } from "react";
import ViewReviews from "../../components/viewReviews/ViewReviews";
import "./ViewReviewsPage.css";

function ViewReviewsPage() {
  const [token, setToken] = useState<string>("");
  const [_id, setId] = useState<string>("");

  useEffect(() => {
    const storedToken: string | null = localStorage.getItem("token");
    const storedId: string | null = localStorage.getItem("_id");
    if (storedToken && storedId) {
      setToken(storedToken);
      setId(storedId);
    }
  }, []);

  return (
    <div className="containerViewReviewsPage">
      <h1 className="titleViewReviewsPage">Reviews</h1>
      <ViewReviews _id={_id} token={token} />
    </div>
  );
}

export default ViewReviewsPage;
