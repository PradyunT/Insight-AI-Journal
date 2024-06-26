"use client";

import formatTime from "@/utils/formatTime";
import { Bot, User, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface MessageProps {
  time: Date;
  role: string;
  message: string;
}

const Message = ({ time, role, message }: MessageProps) => {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(message).then(() => {
      toast({
        title: "Copied to Clipboard 📋",
      });
    });
  };

  return (
    <div className="flex flex-row">
      {role === "AI" && (
        <div className="flex items-center h-10 w-10 text-center justify-center align-middle rounded-full mr-4 ml-4 bg-gray-100">
          <Bot />
        </div>
      )}
      {role === "USER" && <div className="flex-1" />}
      <div className={`p-4 rounded-lg w-[75%] ${role === "USER" ? "bg-blue-200 self-end" : "bg-gray-100"}`}>
        <p>
          <strong>{role}:</strong> {message}
        </p>
        <div className="flex items-center">
          <small>{formatTime(time)}</small>
          <div className="flex-1" />
          <div
            className={`p-1.5 rounded-full ${
              role === "USER" ? "hover:bg-blue-300" : "hover:bg-gray-200"
            } transition-colors cursor-pointer`}
            onClick={handleCopy}>
            <Copy size={16} />
          </div>
        </div>
      </div>
      {role === "USER" && (
        <div className="flex items-center h-10 w-10 text-center justify-center align-middle rounded-full ml-4 mr-4 bg-blue-100">
          <User />
        </div>
      )}
    </div>
  );
};

export default Message;
