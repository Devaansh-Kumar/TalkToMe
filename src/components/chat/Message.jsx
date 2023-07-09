import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";

const Message = ({ message, index }) => {
    const { currentUser } = useUser();
    const bgColor = index % 2 ? "bg-indigo-100" : "bg-blue-300";
    
  return (
    <div className={`flex flex-row  py-3 px-1 my-1 rounded border border-solid ${bgColor}`}>
      <div className="flex flex-none items-center pr-5 pl-3">{currentUser.profile_pic && <img src={currentUser.profile_pic} className="rounded w-8 h-8"/>}</div>
      <div className="text-left">{message}</div>
    </div>
  );
};

export default Message;
