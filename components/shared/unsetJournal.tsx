import { useJournalContext } from "@/context/JournalContext";

const UnsetJournal = () => {
  const { setMode } = useJournalContext();
  return (
    <div className="h-[100%] p-4 border border-gray-200 rounded-lg">
      <h1 className="text-lg font-semibold">
        Navigate on the left to see your journals. Or{" "}
        <div
          className="inline border border-gray-200 p-1 ml-0 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          onClick={() => setMode(2)}>
          Create Journal
        </div>
      </h1>
    </div>
  );
};
export default UnsetJournal;
