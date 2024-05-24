import React, { useEffect, useState } from "react";
import Chatbot from "../../components/Chatbot/chatbot/Chatbot";
import "./ChatbotPage.css";

function ChatbotPage() {
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
    <div className="containerChatbotPage">
      <h1 className="titleChatbotPage">How can we assist you?</h1>
      <Chatbot _id={_id} token={token} />
    </div>
  );
}

export default ChatbotPage;
