import JournalsList from "@/components/shared/journalsList";
import Notes from "@/components/shared/notes";
import JournalInterface from "@/components/shared/journalInterface";
import { JournalProvider } from "@/context/JournalContext";

const JournalsPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="h1">Journals</h1>
      {/* Mobile layout */}
      <div className="space-y-4 flex-col sm:hidden">
        <JournalProvider>
          <JournalsList />
          <Notes />
          <JournalInterface />
        </JournalProvider>
      </div>
      {/* Desktop Layout */}
      <div className="gap-4 hidden sm:flex">
        <JournalProvider>
          <JournalsList />
          <div className="w-2/3">
            <JournalInterface />
          </div>
          <div className="max-w-[20%]">
            <Notes />
          </div>
        </JournalProvider>
      </div>
    </div>
  );
};
export default JournalsPage;
