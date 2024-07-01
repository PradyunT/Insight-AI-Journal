import Journal from "@/models/journal";
import { Context } from "@/types/customTypes";
import { connectToDB } from "@/utils/database";

export const GET = async (req: Request, { params }: Context) => {
  try {
    await connectToDB();

    const foundJournal = await Journal.findById(params.id);

    return new Response(JSON.stringify({ journal: foundJournal, status: 200 }));
  } catch (err) {
    console.error("Error in API route:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
