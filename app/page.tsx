import ChatInterface from "@/components/shared/chatInterface";
import Conversation from "@/components/shared/conversation";
import { ConversationProvider } from "@/context/ConversationContext";

export default function Home() {
  return (
    <div className="space-y-4">
      <ConversationProvider>
        <h1 className="text-2xl font-bold">Chat</h1>
        <Conversation />
        <ChatInterface />
      </ConversationProvider>
    </div>
  );
}
