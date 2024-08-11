import Note from "@/models/note";
import { connectToDB } from "@/utils/database";

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

    return new Response(JSON.stringify({ message: "Note deleted successfully" }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error in API route:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
