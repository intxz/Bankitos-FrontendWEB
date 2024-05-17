import React, { useEffect, useState } from "react";
import EditReview from "../../components/editReview/EditReview";
import "./EditReviewPage.css";

function EditReviewPage() {
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
    <div className="containerEditReviewPage">
      <h1 className="titleEditReviewPage">Edit Review Page</h1>
      <EditReview _id={_id} token={token} />
    </div>
  );
}

export default EditReviewPage;
