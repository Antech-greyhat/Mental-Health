import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

const ChatContainer = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary-100 h-96 overflow-y-auto p-4 chat-container">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <div className="text-4xl mb-4">💬</div>
            <p className="text-lg font-medium">Welcome to your mental health support chat</p>
            <p className="text-sm mt-2">I'm here to listen and support you. How are you feeling today?</p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default ChatContainer;
