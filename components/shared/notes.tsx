"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Note from "./note";
import { Skeleton } from "@/components/ui/skeleton";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  // Get the user's notes
  const fetchNotes = async () => {
    if (!session?.user?.id) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/users/${session.user.id}/posts`, {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setNotes(data.notes);
      } else {
        console.error("Failed to fetch notes");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [session]);

  return (
    <div className="flex flex-wrap gap-4">
      {loading ? (
        <Skeleton className="h-[125px] w-[100%] rounded-xl" />
      ) : (
        notes.map((note, index) => (
          <Note key={note._id} id={note._id} number={index + 1} text={note.text} fetchNotes={fetchNotes} />
        ))
      )}
    </div>
  );
};

export default Notes;
