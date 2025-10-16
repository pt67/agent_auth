
import React from 'react';
import { ChatMessage, MessageSender } from '../types';
import { SparklesIcon } from './Icons';

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === MessageSender.USER;

  const bubbleClasses = isUser
    ? 'bg-indigo-600 text-white rounded-br-none self-end'
    : 'bg-gray-700 text-gray-200 rounded-bl-none self-start';
    
  const containerClasses = isUser ? 'flex justify-end' : 'flex justify-start';

  return (
    <div className={`${containerClasses} animate-fade-in`}>
      <div className={`p-4 rounded-xl max-w-xl shadow-md ${bubbleClasses}`}>
        {!isUser && (
             <div className="flex items-center mb-2">
                 <SparklesIcon className="w-5 h-5 text-teal-400 mr-2" />
                 <span className="font-bold text-teal-400">AI Agent</span>
             </div>
        )}
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessageBubble;
