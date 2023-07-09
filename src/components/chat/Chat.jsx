import React, { useState } from "react";
import ScrollableFeed from "react-scrollable-feed";
import Message from "./Message";

const Chat = () => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (question.trim() === "") {
      return;
    }

    const newMessage = {
      id: chatHistory.length,
      message: question,
      senderName: "User",
    };

    setChatHistory([...chatHistory, newMessage]);
    setQuestion("");
  };

  return (
    <div>
      <ScrollableFeed>
        {chatHistory.map((message, i) => {
          return <Message key={i} index={i} message={message.message} />;
        })}
      </ScrollableFeed>
      <form onSubmit={handleSubmit} className="border border-solid my-4">
        <div className="flex flex-row justify-between">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="rounded focus:ring-blue-500 focus:border-blue-500 flex-grow mr-2"
          />
          <button type="submit" className="mx-2">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
