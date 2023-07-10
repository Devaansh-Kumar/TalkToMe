import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ScrollableFeed from "react-scrollable-feed";
import { useUser } from "../../context/UserContext";
import Message from "./Message";
import { db } from "../../firebase";
import { collection, doc, getDocs, orderBy, query, serverTimestamp, setDoc } from "@firebase/firestore";
// import Speech from "./SpeechToText";

const Chat = () => {
  const {file_name} = useParams()
  const {currentUser} = useUser()
  const [question, setQuestion] = useState("");
  const [currentChat, setCurrentChat] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);


  const loadHistory = async ()=>{
    const collectionRef = collection(db,"chats",currentUser.uid,file_name)
    const q = query(collectionRef,orderBy("created_at"))
    const snapshot = await getDocs(q)
    const list = [];
    snapshot.forEach(chat=>{
      list.push({id:chat.id, ...chat.data()});
    })

    setChatHistory(list)
    
  }
  useEffect(()=>{
    loadHistory()
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question.trim() === "") {
      return;
    }
    // TODO - show question on chat
    const docRef = doc(collection(db,"chats",currentUser.uid,file_name))
    setCurrentChat(prev=> [...prev,{id:`${docRef.id}-q`,type:"question",message:question}])
    // getting answer
    const body = {
      question_content: question,
      user_id: currentUser.uid,
      file_name: file_name
    }
    setQuestion("")
    const response = await fetch("https://us-central1-talktome-e4031.cloudfunctions.net/send-question",{
      method: "POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    const data = await response.json()
    // TODO - show answer on chat
    setCurrentChat(prev=> [...prev,{id:`${docRef.id}-a`,type:"answer",message:data.answer}])
    // TODO - store answer in firestore
    const convoItem = {
      question,
      answer: data.answer,
      created_at: serverTimestamp()
    }
    await setDoc(docRef, convoItem)
    console.log(convoItem)
  };

  return (
    <div>
      <ScrollableFeed className="mb-16">
       {chatHistory.length? chatHistory.map(chat=>(
        <div key={`${chat.id}`}>
        <Message  type="question" message={chat.question} profilePic={currentUser.profile_pic}/>
        <Message type="answer" message={chat.answer} profilePic="/bot.png" />
        </div>
       )): <p>Loading...</p>}
       {currentChat && currentChat.map(item=>(
        <Message key={item.id} {...item} profilePic={`${item.type == 'question'? currentUser.profile_pic:"/bot.png"}`}/>
       ))}
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
        {/* <Speech question={question} setQuestion={setQuestion} /> */}
      </div>
      </div>
    </div>
  );
};

export default Chat;
