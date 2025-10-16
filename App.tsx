import React, { useState, useCallback, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Tool, KnowledgeSource, ChatMessage, MessageSender } from './types';
import { getAgentResponse } from './services/geminiService';
import { INITIAL_TOOLS, INITIAL_KNOWLEDGE_SOURCES } from './constants';
import LoginPanel from './components/LoginPanel';
import ToolsPanel from './components/ToolsPanel';
import KnowledgePanel from './components/KnowledgePanel';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import { ShieldCheckIcon } from './components/Icons';

export default function App() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth0();
  const [tools, setTools] = useState<Tool[]>(INITIAL_TOOLS);
  const [knowledgeSources, setKnowledgeSources] = useState<KnowledgeSource[]>(INITIAL_KNOWLEDGE_SOURCES);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setTools(INITIAL_TOOLS);
      setKnowledgeSources(INITIAL_KNOWLEDGE_SOURCES);
      setMessages([]);
    }
  }, [isAuthenticated]);

  const toggleTool = useCallback((toolId: string) => {
    setTools(prevTools =>
      prevTools.map(tool =>
        tool.id === toolId ? { ...tool, connected: !tool.connected } : tool
      )
    );
  }, []);

  const toggleKnowledge = useCallback((sourceId: string) => {
    setKnowledgeSources(prevSources =>
      prevSources.map(source =>
        source.id === sourceId ? { ...source, accessible: !source.accessible } : source
      )
    );
  }, []);

  const handleSendMessage = useCallback(async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: MessageSender.USER,
      text: message,
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const connectedTools = tools.filter(t => t.connected);
      const accessibleKnowledge = knowledgeSources.filter(k => k.accessible);

      const agentResponseText = await getAgentResponse(message, connectedTools, accessibleKnowledge);
      
      const agentMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: MessageSender.AGENT,
        text: agentResponseText,
      };
      setMessages(prev => [...prev, agentMessage]);

    } catch (error) {
      console.error("Error getting agent response:", error);
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: MessageSender.AGENT,
        text: "Sorry, I encountered an error. Please try again.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, tools, knowledgeSources]);

  if (isAuthLoading) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <div className="text-xl">Authenticating...</div>
        </div>
    )
  }

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-900 text-gray-200">
      <Header />
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 overflow-hidden">
        {/* Left Panel */}
        <div className="flex flex-col gap-6 overflow-y-auto pr-2">
          <LoginPanel />
          {isAuthenticated && (
            <>
              <ToolsPanel tools={tools} onToggleTool={toggleTool} />
              <KnowledgePanel sources={knowledgeSources} onToggleKnowledge={toggleKnowledge} />
            </>
          )}
           {!isAuthenticated && (
            <div className="bg-gray-800/50 border border-teal-500/30 rounded-lg p-6 flex flex-col items-center text-center mt-8 animate-fade-in">
              <ShieldCheckIcon className="w-16 h-16 text-teal-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Secure Your AI Agent</h3>
              <p className="text-gray-400">
                Log in to grant your AI assistant secure access to tools and knowledge, powered by Auth0 for AI Agents.
              </p>
            </div>
           )}
        </div>

        {/* Center Panel - Chat */}
        <div className="lg:col-span-3 flex flex-col bg-gray-800/50 border border-gray-700/50 rounded-lg shadow-2xl overflow-hidden">
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            isLoggedIn={isAuthenticated}
          />
        </div>
      </main>
    </div>
  );
}