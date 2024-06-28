"use client";

import formatTime from "@/utils/formatTime";
import { Bot, User, Copy, BookMarked } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import IconButton from "./iconButton";

interface MessageProps {
  id: string;
  time: Date;
  role: string;
  message: string;
}

const Message = ({ time, role, message }: MessageProps) => {
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(message).then(() => {
      toast({
        title: "Copied to Clipboard 📋",
      });
    });
  };

  const handleSaveNote = async (text: string) => {
    if (!session) {
      toast({ title: "Sign in to save notes", description: "You must be signed in to use journal features" });
    }

    try {
      const res = await fetch("/api/note/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          owner: session?.user.id,
        }),
      });

      if (res.status == 200) {
        toast({ title: "Saved note successfully 📝", description: "See your saved notes in the journal" });
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
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
          <IconButton icon={Copy} onClick={handleCopy} className={role === "USER" ? "hover:bg-blue-300" : "hover:bg-gray-200"} />
          <IconButton
            icon={BookMarked}
            onClick={() => handleSaveNote(message)}
            className={role === "USER" ? "hover:bg-blue-300" : "hover:bg-gray-200"}
          />
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
