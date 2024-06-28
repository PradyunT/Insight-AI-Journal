import type { NextApiRequest } from "next";
import { connectToDB } from "@/utils/database";
import Note from "@/models/note";

export const GET = async (req: NextApiRequest, { params }) => {
  try {
    await connectToDB();

    const notes = await Note.find({ owner: params.id });

    if (!notes) {
      return new Response(JSON.stringify({ message: "Notes not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ status: 200, notes }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
