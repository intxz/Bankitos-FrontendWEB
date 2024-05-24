import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const apiUrl = 'http://localhost:3000'; // Adjust the API URL as needed
//const apiUrl='//api.bankitos.duckdns.org';

function Chatbot({ _id, token }: { _id: string; token: string }) {
    const [message, setMessage] = useState('');
    const [reply, setReply] = useState('');
    const [error, setError] = useState('');

    const sendMessage = async () => {
        try {
            const response = await axios.post(apiUrl + '/chatbot', { message });
            setReply(response.data.reply);
        } catch (error) {
            console.error('Error sending message:', error);
            setError('Failed to send message');
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendMessage();
    };

    return (
        <div className="chatbot-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here"
                />
                <button type="submit">Send</button>
            </form>
            <div className="chatbox">
                <div className="chat-message">{reply}</div>
            </div>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default Chatbot;
