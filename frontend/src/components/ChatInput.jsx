import React, { useState } from 'react';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message here..."
        className="flex-1 px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={!message.trim() || isLoading}
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
          message.trim() && !isLoading
            ? 'bg-primary-600 hover:bg-primary-700 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

export default ChatInput;
