
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, MessageSender } from '../types';
import { PaperAirplaneIcon, SparklesIcon } from './Icons';
import ChatMessageBubble from './ChatMessageBubble';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  isLoggedIn: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading, isLoggedIn }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b border-gray-700/50 bg-gray-800/60">
        <SparklesIcon className="w-6 h-6 text-teal-400 mr-3" />
        <h2 className="text-xl font-bold text-white">AI Agent Conversation</h2>
      </div>

      <div className="flex-grow p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map(msg => (
            <ChatMessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-gray-700 rounded-lg p-3 max-w-lg animate-pulse">
                <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
         {messages.length === 0 && isLoggedIn && (
          <div className="text-center text-gray-400 mt-8">
            <p>I'm your AI Assistant. How can I help you today?</p>
            <p className="text-sm mt-2">Try asking me to do something that requires a tool, like "check my calendar for tomorrow".</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-700/50 bg-gray-900/50">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isLoggedIn ? "Ask your AI agent..." : "Please log in to start chatting"}
            disabled={!isLoggedIn || isLoading}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
          />
          <button
            type="submit"
            disabled={!isLoggedIn || isLoading || !input.trim()}
            className="bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
