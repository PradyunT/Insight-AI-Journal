"use client";

import { Journal } from "@/types/customTypes";
import UnsetJournal from "./unsetJournal";
import ViewJournal from "./viewJournal";
import CreateJournal from "./createJournal";
import { useJournalContext } from "@/context/JournalContext";

const JournalInterface = () => {
  const { mode } = useJournalContext();
  return (
    <>
      {/* Unset Mode */}
      {mode === 0 && <UnsetJournal />}
      {/* View Journal Mode */}
      {mode === 1 && <ViewJournal />}
      {/* Create Journal Mode */}
      {mode === 2 && <CreateJournal />}
    </>
  );
};

export default JournalInterface;
