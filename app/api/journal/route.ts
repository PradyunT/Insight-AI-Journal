import Journal from "@/models/journal";
import { connectToDB } from "@/utils/database";

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const { text, owner } = data;
    await connectToDB();

    const newJournal = await new Journal({
      text,
      owner,
    });

    await newJournal.save();

    return new Response(JSON.stringify({ status: 200 }));
  } catch (err) {
    console.error("Error in API route:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};

export const PATCH = async (req: Request) => {
  try {
    const data = await req.json();
    const { id, text } = data;
    await connectToDB();

    const editJournal = await Journal.findById(id);

    if (!editJournal) {
      return new Response(JSON.stringify({ body: "Journal not found", status: 404 }));
    }

    editJournal.text = text;
    await editJournal.save();

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

    const deleteJournal = await Journal.findByIdAndDelete(id);

    if (!deleteJournal) {
      return new Response(JSON.stringify({ body: "Journal not found", status: 404 }));
    }

    return new Response(JSON.stringify({ status: 200 }));
  } catch (err) {
    console.error("Error in API route:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
