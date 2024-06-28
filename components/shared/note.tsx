import { Minimize2, Maximize2, Trash } from "lucide-react";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

import IconButton from "@/components/shared/iconButton";
import NoteEditDialog from "@/components/shared/noteEditDialog";

const Note = ({ id, number, text, fetchNotes }: { id: string; number: number; text: string; fetchNotes: () => void }) => {
  const [minimized, setMinimized] = useState(number > 3);

  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const res = await fetch("/api/note/delete", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast({ title: "Successfully deleted note 🗑️" });
        fetchNotes();
      } else {
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <div className={`p-4 rounded-lg bg-blue-200 flex flex-row gap-2 ${minimized ? "w-fit" : ""}`}>
      <div className="flex-col space-y-2">
        <h2 className="font-bold">Note {number}</h2>
        {!minimized && <p>{text}</p>}
      </div>
      <div className="flex-1" />
      <div className={`flex ${minimized ? "flex-row" : "flex-col"}`}>
        <div className="flex-1" />
        <NoteEditDialog id={id} text={text} fetchNotes={fetchNotes} />
        <IconButton icon={Trash} onClick={handleDelete} />
        <IconButton icon={minimized ? Maximize2 : Minimize2} onClick={() => setMinimized((prev) => !prev)} />
      </div>
    </div>
  );
};

export default Note;
