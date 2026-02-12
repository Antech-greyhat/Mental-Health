import React from 'react';

const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';

  const getEmotionColor = (emotion) => {
    switch (emotion) {
      case 'sad':
        return 'text-blue-600';
      case 'anxious':
        return 'text-orange-600';
      case 'stressed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isUser
          ? 'bg-primary-600 text-white'
          : 'bg-gray-100 text-gray-800'
      }`}>
        <p className="text-sm">{message.text}</p>
        <div className={`text-xs mt-1 ${isUser ? 'text-primary-100' : getEmotionColor(message.emotion)}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          {!isUser && message.emotion && (
            <span className="ml-2 capitalize">({message.emotion})</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
