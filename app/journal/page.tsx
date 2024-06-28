import JournalInterface from "@/components/shared/journalInterface";
import Notes from "@/components/shared/notes";

const Journal = () => {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">Journal</h1>
      <Notes />
      <JournalInterface />
    </div>
  );
};
export default Journal;
