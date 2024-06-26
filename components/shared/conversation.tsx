"use client";
import { useEffect, useRef } from "react";
import Message from "./message";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConversation } from "@/context/ConversationContext";

const Conversation = () => {
  const { conversation } = useConversation();
  const viewportRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (viewportRef !== null && viewportRef.current !== null) {
      // here scroll, Ex: to the right
      viewportRef.current.scrollTop += 50;
    }
  };

  // Scroll to the bottom when the conversation changes
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  return (
    <ScrollArea viewportRef={viewportRef} className="h-[57vh] rounded-md border">
      <div className="space-y-4 py-4 flex flex-col">
        {conversation.map((message) => (
          <Message key={message.id} time={message.Time} role={message.Role} message={message.Message} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default Conversation;
