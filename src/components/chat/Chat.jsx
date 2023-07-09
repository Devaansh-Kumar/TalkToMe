import React, { useState } from "react";
import ScrollableFeed from "react-scrollable-feed";
import Message from "./Message";
import Speech from "./SpeechToText";

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
      <ScrollableFeed className="mb-20">
        {chatHistory.map((message, i) => {
          return <Message key={i} index={i} message={message.message} />;
        })}
      </ScrollableFeed>
          <div className="fixed bottom-0 w-screen">
      <div className="flex flex-row my-4 self-center px-1">
        <form onSubmit={handleSubmit} className="flex flex-row justify-between self-center flex-grow">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="rounded focus:ring-blue-500 focus:border-blue-500 flex-grow mr-1"
              placeholder="Ask me anything..."
            />
            <button
              type="submit"
              className="mx-2 rounded  px-2 my-1 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium"
            >
              Send
            </button>
        </form>
        <Speech question={question} setQuestion={setQuestion} />
      </div>
      </div>
    </div>
  );
};

export default Chat;
