import React, { useState, useRef, useEffect } from 'react';
import useChat from '../customHooks/useChat';
import '../assets/css/dashboard.css';
import Message from './Message';
import Config from './Config';
import logo from '../assets/img/logo.png';

const Dashboard = () => {
  const { generationConfig, setGenerationConfig, setModelType, sendMessage, messages, systemPrompt, setSystemPrompt } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const [showConfig, setShowConfig] = useState(true);
  const [containerScrollDown, setContainerScrollDown] = useState('');

  const historyRef = useRef(null);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef?.current?.scrollHeight;
    }
  }, [containerScrollDown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="dashboard">
      <img src={logo} className="App-logo" alt="logo" />
      <div className='main-container'>
        <div className='input-header'>
          <h3 style={{ marginTop: 0 }}>Input</h3>
          <button
            className="config-button"
            style={{ backgroundColor: showConfig ? '#2a2b2c' : '#4545ff' }}
            onClick={() => setShowConfig(prev => !prev)}
          >
            <i className="fa-solid fa-cog"></i>
          </button>
        </div>
        <div className='input-and-config-container'>
          <form onSubmit={handleSubmit}>
            <div className="system-prompt">
              <label htmlFor="system-prompt">System Prompt</label>
              <input
                type="text"

                placeholder="Enter your system prompt"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
              />
              <p className="hint" onClick={() => setSystemPrompt('You are a poet who specializes in children\'s poetry and stories') }>Hint: try 'You are a poet who specializes in children's poetry and stories'</p>
            </div>
            <div className="message-input">
              <label>Your message</label>
              <textarea
                type="text"
                placeholder="Enter your message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <p className="hint" onClick={() => setNewMessage('write a poem about a dog that gets lost in the jungle, then has a conversation with four of the jungle animals asking them about the directions to his house giving them a colorful description of the are and the house')}>Hint: try 'write a poem about a dog that gets lost in the jungle, then has a conversation with four of the jungle animals asking them about the directions to his house giving them a colorful description of the are and the house.'</p>
            </div>
            <div className="send-button-container">
              <button className="send-button" type="submit" disabled={newMessage.trim() === ''}>Send</button>
            </div>
          </form>
          {showConfig && (
            <Config generationConfig={generationConfig} setGenerationConfig={setGenerationConfig} setModelType={setModelType} />
          )}
        </div>
      </div>

      {
        messages?.length ? (<div ref={historyRef} className="chat-history">
          <h3>Output</h3>
          {messages.map((message, index) => (
            <div key={index} className={`message message-${message.role}`}>
              <div className="message-header">
                <span className="role">{message.role}:</span>
                {message.role === 'assistant' && (<button
                  className="copy-button"
                  onClick={() => navigator.clipboard.writeText(message.content)}
                >
                  <i className="fa-solid fa-copy"></i>
                </button>)}</div>
              <span className="content"><Message text={message.content} setContainerScrollDown={setContainerScrollDown} /></span>
            </div>
          ))}
        </div>) : null
      }
    </div >
  );
};
export default Dashboard;