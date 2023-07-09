import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";

const Message = ({ message, index }) => {
  const [photoURL, setPhotoURL] = useState("");
  const [user, setUser] = useState(null);
  const bgColor = index % 2 ? "red" : "blue";

  useEffect(() => {
    // Listen for changes in user authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
        setPhotoURL(user.photoURL);
      } else {
        // User is signed out
        setUser(null);
        setPhotoURL("");
      }
    });

    // Unsubscribe from the listener when component unmounts
    return () => unsubscribe();
  }, []);

  // console.log(uid);
  return (
    <div
      className={`grid grid-cols-12 py-3 px-4 border border-solid bg-${bgColor}-500`}
    >
      <div className="flex items-center ">
        {photoURL && <img src={photoURL} className="rounded-full w-8" />}
      </div>
      <div className="text-left">{message}</div>
    </div>
  );
};

export default Message;
