import React, { useEffect, useState } from "react";
import CreateReview from "../../components/createReview/CreateReview";
import "./CreateReviewPage.css";

function CreateReviewPage() {
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
    <div className="containerCreateReviewPage">
      <h1 className="titleCreateReviewPage">Create Review Page</h1>
      <CreateReview _id={_id} token={token} />
    </div>
  );
}

export default CreateReviewPage;
