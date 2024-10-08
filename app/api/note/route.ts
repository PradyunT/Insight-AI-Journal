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

export const PATCH = async (req: Request) => {
  try {
    const data = await req.json();
    const { id, newText } = data;
    await connectToDB();

    const updateNote = await Note.findByIdAndUpdate(id, { $set: { text: newText } });

    if (!updateNote) {
      return new Response(JSON.stringify({ message: "Note not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ status: 200 }));
  } catch (err) {
    console.error("Error in API route:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const data = await req.json();
    const { id } = data;
    await connectToDB();

    const deleteNote = await Note.findByIdAndDelete(id);

    if (!deleteNote) {
      return new Response(JSON.stringify({ message: "Note not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ status: 200 }));
  } catch (err) {
    console.error("Error in API route:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
