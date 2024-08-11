import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
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

const CreateJournal = () => {
  const { setMode, fetchJournals } = useJournalContext();
  const { data: session } = useSession();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const handleSaveJournal = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: values.text,
          owner: session?.user.id,
        }),
      });

      if (res.ok) {
        toast({ title: "Saved journal successfully 📝" });
        fetchJournals();
        setMode(0); // Go back to default mode after saving
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSaveJournal)} className="space-y-4">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Journal</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your journal entry here" {...field} className="h-[200px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex">
          <Button type="submit">Save Journal</Button>
        </div>
      </form>
    </Form>
  );
};
export default CreateJournal;
