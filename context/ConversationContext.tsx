"use client";

import React, { createContext, useState, useContext } from "react";

interface ChatMessage {
  id: string;
  Time: Date;
  Role: string;
  Message: string;
}

interface ConversationContextType {
  conversation: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  resetConversation: () => void;
  updateMessage: (id: string, newContent: string) => void;
  appendToMessage: (id: string, newContent: string) => void;
}

const startMessage = {
  id: "1",
  Time: new Date(),
  Role: "AI",
  Message:
    "Welcome to the Insight AI chatbot, here to help you be more productive and manage your stress! Try asking me to generate journal prompts, or tell me about your goals and I can help you with practical advice.",
};

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const ConversationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversation, setConversation] = useState<ChatMessage[]>([startMessage]);

  const addMessage = (message: ChatMessage) => {
    setConversation((prev) => [...prev, message]);
  };

  const updateMessage = (id: string, newContent: string) => {
    setConversation((prev) => prev.map((msg) => (msg.id === id ? { ...msg, Message: newContent, Time: new Date() } : msg)));
  };

  const appendToMessage = (id: string, appendContent: string) => {
    setConversation((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, Message: msg.Message + appendContent, Time: new Date() } : msg))
    );
  };

  const resetConversation = () => {
    setConversation(() => [startMessage]);
  };

  return (
    <ConversationContext.Provider value={{ conversation, addMessage, updateMessage, appendToMessage, resetConversation }}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error("useConversation must be used within a ConversationProvider");
  }
  return context;
};
