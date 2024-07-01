import Journal from "@/models/journal";
import { connectToDB } from "@/utils/database";
import { Context } from "@/types/customTypes";

export const GET = async (req: Request, { params }: Context) => {
  try {
    await connectToDB();

    const journals = await Journal.find({ owner: params.id });

    return new Response(JSON.stringify({ journals, status: 200 }));
  } catch (err) {
    console.error("Error in API route:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
