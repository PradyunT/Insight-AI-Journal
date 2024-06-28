import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import IconButton from "./iconButton";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const FormSchema = z.object({
  note: z
    .string()
    .min(2, {
      message: "Note content must be at least 2 characters.",
    })
    .max(2000, {
      message: "Note content must not be longer than 2000 characters.",
    }),
});

const NoteEditDialog = ({ id, text, fetchNotes }: { id: string; text: string; fetchNotes: () => void }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { note: text },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>, closeDialog: () => void) => {
    try {
      const res = await fetch("/api/note", {
        method: "PATCH",
        body: JSON.stringify({
          id,
          newText: data.note,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast({
          title: "Note updated successfully ✅",
        });
        fetchNotes();
        closeDialog();
      } else {
        console.error("Failed to edit note");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <IconButton icon={Pencil} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => onSubmit(data, () => setOpen(false)))} className="space-y-6">
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Add your new note content here" className="h-[30vh] max-h-[80vh]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default NoteEditDialog;
