"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatJournalDate } from "@/utils/formatTime";
import { Button } from "../ui/button";
import { ArrowRightLeft, FilePlus } from "lucide-react";
import { useJournalContext } from "@/context/JournalContext";
import Link from "next/link";

const JournalsList = () => {
  const { setMode, setSelectedJournal, journals } = useJournalContext();
  return (
    <ScrollArea className="sm:h-72 sm:w-48 rounded-md border">
      <div className="p-4 flex flex-row gap-2 sm:flex-col">
        <Link href="/">
          <Button variant={"outline"} type="button">
            Switch to Chat
            <ArrowRightLeft className="ml-2" size={20} />
          </Button>
        </Link>
        <Button
          variant="outline"
          className="text-sm px-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          onClick={() => {
            setMode(2);
          }}>
          Create Journal <FilePlus size={18} className="ml-2" />
        </Button>
        <Separator orientation="horizontal" className="my-2 hidden sm:block" />
        {journals ? (
          journals.map((journal) => (
            <div
              key={journal._id}
              className="text-sm p-2 border border-gray-200 sm:border-none sm:p-1.5 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
              onClick={() => {
                const selectedJournal = journals.find((currentJournal) => currentJournal._id === journal._id);
                if (selectedJournal) {
                  setSelectedJournal(selectedJournal);
                  setMode(1);
                }
              }}>
              Journal {formatJournalDate(journal.createdAt)}
            </div>
          ))
        ) : (
          <>
            <Separator className="hidden sm:block sm:my-2" />
            <div className="text-sm">Your journals will appear here</div>
          </>
        )}
      </div>
      <ScrollBar orientation="horizontal" className="sm:hidden" />
    </ScrollArea>
  );
};

export default JournalsList;
