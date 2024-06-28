import Note from "@/models/note";
import { connectToDB } from "@/utils/database";

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

    return new Response(JSON.stringify({ message: "Note updated successfully" }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error in API route:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
