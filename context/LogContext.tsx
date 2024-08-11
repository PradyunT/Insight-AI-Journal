"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";

interface LogsContextType {
  logType: string;
}

const LogsContext = createContext<LogsContextType | undefined>(undefined);

export const LogsProvider = ({ children }: { children: ReactNode }) => {
  const [logType, setMode] = useState<number>(0);
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
