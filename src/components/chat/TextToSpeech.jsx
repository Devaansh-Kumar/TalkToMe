import React, { useState } from 'react'
import Speech from "react-speech";

const TextToSpeech = ({message}) => {
  const [isTalking, setIsTalking] = useState(false);
  

  const toggleIsTalking = () => {
    setIsTalking(!isTalking);
  }
  const style = {
    play: {
      button: {
        width: '28',
        height: '28',
        cursor: 'pointer',
        pointerEvents: 'none',
        outline: 'none',
        backgroundColor: 'yellow',
        border: 'solid 1px rgba(255,255,255,1)',
        borderRadius: 6
      },
    }
  };
    return (
    // <button onClick={toggleIsTalking}>audio</button>
    <Speech text={message} voice="Google UK English Female" style={style} />
  )
}

export default TextToSpeech