import React, { useState } from 'react';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };
    addMessage(userMessage);

    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'anonymous', // In a real app, this would be the logged-in user
          message: message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const aiMessage = {
          id: Date.now() + 1,
          text: data.reply,
          sender: 'ai',
          timestamp: new Date(data.timestamp),
          emotion: data.emotion,
        };
        addMessage(aiMessage);
      } else {
        // Handle error
        const errorMessage = {
          id: Date.now() + 1,
          text: 'Sorry, I encountered an error. Please try again.',
          sender: 'ai',
          timestamp: new Date(),
        };
        addMessage(errorMessage);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
      };
      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col">
      <header className="bg-white shadow-sm border-b border-primary-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary-800 text-center">
            University Mental Health Support Chat
          </h1>
          <p className="text-sm text-gray-600 text-center mt-1">
            I'm here to listen and support you. Remember, I'm not a substitute for professional help.
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        <ChatContainer messages={messages} isLoading={isLoading} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;
