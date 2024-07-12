import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown'

const Message = ({ text, speed = 20, setContainerScrollDown }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let intervalId;
    const writeText = () => {
      if (displayedText.length < text.length) {
        setDisplayedText(text.substring(0, displayedText.length + 1));
        setContainerScrollDown(Date.now())
      } else {
        clearInterval(intervalId);
      }
    };

    intervalId = setInterval(writeText, speed);

    return () => clearInterval(intervalId);
  }, [displayedText]);

 

  return (<Markdown>{displayedText}</Markdown>
  );
};

export default Message;
