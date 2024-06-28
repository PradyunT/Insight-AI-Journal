"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRightLeft } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "../ui/textarea";

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

const JournalInterface = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Journal</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your journal entry here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex">
          <Button type="submit">Save Journal</Button>
          <div className="flex-1" />
          <Link href="/">
            <Button variant={"outline"} type="button">
              Switch to Chat
              <ArrowRightLeft className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default JournalInterface;
