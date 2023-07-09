import React, { useState } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import Message from './Message';
import Speech from './SpeechToText';


const Chat = () => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit =  (e) => {
    e.preventDefault();

    if (question.trim() === '') {
      return;
    }

      const newMessage = {
        id: chatHistory.length,
        message: question,
        senderName: 'User',
      };

      setChatHistory([...chatHistory, newMessage]);
      setQuestion('');
    
  };

  return (
    <div>
      <ScrollableFeed>
        {chatHistory.map((message, i) => {
            return <Message key={i} index={i} message={message.message}/>;
        })}
      </ScrollableFeed>
      <form onSubmit={handleSubmit} className='border border-solid my-4'>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          />
          <button type="submit" className="">Send</button>
      </form>
      <Speech question={question} setQuestion={setQuestion}/>
    </div>
  );
};

export default Chat;