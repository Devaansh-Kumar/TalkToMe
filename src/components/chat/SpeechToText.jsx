import React, { useState, useEffect } from 'react';
import annyang from 'annyang';

const SpeechToText = ({question, setQuestion}) => {
  const [isListening, setIsListening] = useState(false);

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
        style={{ backgroundColor: isListening ? 'gray' : 'inherit' }}
      >
        {<img src='../../../microphone.png'/> }
      </button>
    </div>
  );
};

export default SpeechToText;

// documentation is here: https://github.com/TalAter/annyang/blob/master/docs/README.md