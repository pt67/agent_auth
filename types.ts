// FIX: Import React types to resolve 'JSX' namespace error.
import type React from 'react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  // FIX: Use React.ReactNode for the icon type, which is a more flexible and standard type for React components.
  icon: React.ReactNode;
  connected: boolean;
}

export interface KnowledgeSource {
  id: string;
  name: string;
  description: string;
  // FIX: Use React.ReactNode for the icon type, which is a more flexible and standard type for React components.
  icon: React.ReactNode;
  accessible: boolean;
}

export enum MessageSender {
  USER = 'user',
  AGENT = 'agent',
}

export interface ChatMessage {
  sender: MessageSender;
  text: string;
  id: number;
}