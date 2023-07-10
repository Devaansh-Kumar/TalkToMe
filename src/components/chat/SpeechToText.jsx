import React, { useState, useEffect } from 'react';
import annyang from 'annyang';

const SpeechToText = ({question, setQuestion}) => {
  const [isListening, setIsListening] = useState(false);
  // const [annyang, setAnnyang] = useState("");
  // const annyang = await import ("annyang");
  
  // useEffect(() => {
  //   async () => {
  //     const annyang = await import ("annyang");
  //     setAnnyang(annyang);
  //   }
  // }, [annyang, setAnnyang]);

  useEffect(() => {
    if (isListening) {
      annyang.start();
      annyang.addCallback('result', handleResult);
    } else {
      annyang.abort();
      annyang.removeCallback('result', handleResult);
    }

    return () => {
      annyang.abort();
      annyang.removeCallback('result', handleResult);
    };
  }, [isListening]);

  const handleResult = (phrases) => {
    const recognizedText = phrases[0];
    setQuestion((prev) => {return prev + recognizedText});
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div>
      <button
        onClick={toggleListening}
        className=""
      >
        {<img src={isListening ? '../../../mic-on.png' : '../../../mic-off.png'} className='rounded-full h-10 cursor-pointer'/> }
      </button>
    </div>
  );
};

export default SpeechToText;

// documentation is here: https://github.com/TalAter/annyang/blob/master/docs/README.md