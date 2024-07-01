import { useToast } from "../ui/use-toast";
import { formatJournalDate } from "@/utils/formatTime";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Pencil, Trash } from "lucide-react";
import IconButton from "./iconButton";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useJournalContext } from "@/context/JournalContext";

const formSchema = z.object({
  text: z
    .string()
    .min(10, {
      message: "Journal entry must be at least 10 characters.",
    })
    .max(10000, {
      message: "Journal entry must not be longer than 10000 characters.",
    }),
});

const ViewJournal = () => {
  const { setMode, setSelectedJournal, selectedJournal, fetchJournals } = useJournalContext();
  const { toast } = useToast();
  const [editJournal, setEditJournal] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: selectedJournal!.text,
    },
  });

  const handleEditJournal = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("/api/journal", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedJournal!._id,
          text: values.text,
        }),
      });

      if (res.ok) {
        toast({ title: "Edited journal successfully 📝" });
        // Fetch the updated journal data
        const updatedJournalRes = await fetch(`/api/journal/${selectedJournal!._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (updatedJournalRes.ok) {
          const data = await updatedJournalRes.json();
          const updatedJournal = data.journal;
          fetchJournals();
          // Update the selectedJournal state
          setSelectedJournal(updatedJournal);
        }
        setEditJournal(false);
        fetchJournals();
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const handleDeleteJournal = async () => {
    try {
      const res = await fetch("/api/journal", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedJournal!._id,
        }),
      });

      if (res.ok) {
        toast({ title: "Deleted journal successfully 🗑️" });
        setMode(0);
        fetchJournals();
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <div className="h-[100%] p-4 border border-gray-200 rounded-lg flex flex-col gap-2">
      {!editJournal ? (
        <>
          <h1 className="font-semibold">Journal {formatJournalDate(selectedJournal!.createdAt)}</h1>
          <p>{selectedJournal!.text}</p>
          <div className="flex-1" />
          <div className="flex gap-1">
            <IconButton
              icon={Pencil}
              onClick={() => {
                setEditJournal(true);
                form.reset({ text: selectedJournal!.text });
              }}
            />
            <IconButton icon={Trash} onClick={handleDeleteJournal} />
          </div>
        </>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleEditJournal)} className="space-y-4">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Edit Journal {formatJournalDate(selectedJournal!.createdAt)}</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write your journal entry here" {...field} className="h-[200px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button type="submit">Save Journal</Button>
              <Button type="button" variant="outline" onClick={() => setEditJournal(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
export default ViewJournal;
