"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, ArrowRightLeft, RotateCcw } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useConversation } from "@/context/ConversationContext";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import InspirationDialog from "./inspirationDialog";
import { useSession } from "next-auth/react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const formSchema = z.object({
  text: z.string().min(2).max(999),
});

const ChatInterface = () => {
  const { addMessage, resetConversation, updateMessage, appendToMessage } = useConversation();
  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Generate a unique ID for the user's message
    const userMessageId = uuidv4();

    // Add the user's message
    addMessage({
      id: userMessageId,
      Time: new Date(),
      Role: "USER",
      Message: values.text,
    });
    form.reset();

    // Generate a unique ID for the initial AI message
    const aiMessageId = uuidv4();

    // Create an initial chatbot message
    addMessage({
      id: aiMessageId,
      Time: new Date(),
      Role: "AI",
      Message: "Generating response...",
    });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.body) {
        throw new Error("Failed to get message stream body");
      }

      // Prepare stream for reading
      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();

      updateMessage(aiMessageId, "");

      // Read the stream until it's finished
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        if (value) {
          appendToMessage(aiMessageId, value);
        }
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // For use to handle copying inspiration dialog prompts
  const handlePromptSelect = (prompt: string) => {
    form.setValue("text", prompt);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Chat with AI here"
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      form.handleSubmit(onSubmit)();
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-2">
          <Button variant="destructive" onClick={resetConversation} type="button">
            Reset
            <RotateCcw className="ml-2" size={20} />
          </Button>
          <div className="flex-1" />
          <InspirationDialog onSelectPrompt={handlePromptSelect} />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className="hidden sm:flex">
                <Button variant={"outline"} type="button" disabled={!session}>
                  <Link href="/journals" className="flex">
                    Switch to Journals
                    <ArrowRightLeft className="ml-2" size={20} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Switch to journal. You must be signed in.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button type="submit">
            Send
            <Send className="ml-2" size={20} />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChatInterface;
