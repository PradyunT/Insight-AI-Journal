"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import type { Journal } from "@/types/customTypes";

interface JournalContextType {
  mode: number;
  setMode: (mode: number) => void;
  selectedJournal: Journal | undefined;
  setSelectedJournal: (journal: Journal | undefined) => void;
  journals: Journal[] | undefined;
  fetchJournals: () => void;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<number>(0); // 0 - unset, 1 - display journal, 2 - write journal
  const [selectedJournal, setSelectedJournal] = useState<Journal | undefined>(); // id of the selected journal
  const [journals, setJournals] = useState<Journal[] | undefined>();
  const { data: session } = useSession();

  const fetchJournals = async () => {
    try {
      const res = await fetch(`/api/users/${session?.user.id}/journals`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setJournals(data.journals);
      } else {
        console.error("Failed to fetch journals");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchJournals();
    }
  }, [session]);

  return (
    <JournalContext.Provider value={{ mode, setMode, selectedJournal, setSelectedJournal, journals, fetchJournals }}>
      {children}
    </JournalContext.Provider>
  );
};

export const useJournalContext = () => {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error("useJournalContext must be used within a JournalProvider");
  }
  return context;
};
