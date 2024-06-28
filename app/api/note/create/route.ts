import { NextApiRequest } from "next";
import Note from "@/models/note";
import { connectToDB } from "@/utils/database";

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const { text, owner } = data;
    await connectToDB();

    const newNote = await new Note({
      text,
      owner,
    });

    await newNote.save();

    return new Response(JSON.stringify({ status: 200 }));
  } catch (err) {
    console.error("Error in API route:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
